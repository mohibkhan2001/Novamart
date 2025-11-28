import React, { useState, useRef, useCallback, useEffect } from "react";
import Hero from "../components/Home Page/Hero";
import Home_Category from "../components/Home Page/Home_Category";
import Footer from "../components/Home Page/Footer";
import { logCacheStats } from "../utils/cacheManager";
import { fetchAllCategories } from "../api/products";

const Home = () => {
  const sections = [
    { title: "Top Sellers", ids: [95, 91, 99, 180, 173] },
    { title: "Men's Collection", ids: [95, 97, 86, 84, 88] },
    { title: "Women's Collection", ids: [184, 187, 186, 177, 179] },
    { title: "Home & Lifestyle", ids: [44, 12, 47, 56, 66] },
    { title: "Beauty & Care", ids: [3, 4, 119, 7, 9] },
    { title: "Trending Electronics", ids: [123, 133, 160, 80, 78] },
    { title: "Sports", ids: [149, 153, 147, 140, 150] },
  ];

  const [visibleSections, setVisibleSections] = useState(new Set([0])); // Load first section by default
  const sectionRefs = useRef([]);

  const handleIntersection = useCallback((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = parseInt(entry.target.dataset.sectionIndex);
        setVisibleSections((prev) => new Set([...prev, index]));
      }
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: "200px", // Start loading 200px before section enters viewport
      threshold: 0.01,
    });

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    // Log cache stats on page load
    setTimeout(() => logCacheStats(), 1000);

    // Fetch categories on page load
    fetchAllCategories();

    return () => observer.disconnect();
  }, [handleIntersection]);

  return (
    <div className="overflow-x-hidden">
      <Hero />

      {sections.map((sec, i) => (
        <React.Fragment key={i}>
          <div
            ref={(el) => (sectionRefs.current[i] = el)}
            data-section-index={i}
          >
            {visibleSections.has(i) ? (
              <Home_Category SectionTitle={sec.title} ids={sec.ids} />
            ) : (
              <div className="w-full select-none py-20 px-20 bg-gray-200 min-h-96 flex items-center justify-center">
                <p className="text-gray-600">Loading section...</p>
              </div>
            )}
          </div>

          {i !== sections.length - 1 && (
            <div className="w-full bg-emerald-900 h-2"></div>
          )}
        </React.Fragment>
      ))}

      <Footer />
    </div>
  );
};

export default Home;
