import React from "react";
import Hero from "../components/Home Page/Hero";
import Home_Category from "../components/Home Page/Home_Category";
import Footer from "../components/Home Page/Footer";

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

  return (
    <div className="overflow-x-hidden">
      <Hero />

      {sections.map((sec, i) => (
        <React.Fragment key={i}>
          <Home_Category SectionTitle={sec.title} ids={sec.ids} />

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
