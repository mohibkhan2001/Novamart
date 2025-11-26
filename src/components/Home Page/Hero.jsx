import React, { useRef, useEffect } from "react";
import {
  womensClothing,
  mensClothing,
  electronics,
  furniture,
  gamingItem,
} from "/src/data/HeroImages";
import { NavLink } from "react-router-dom";

const Hero = () => {
  const sectionRef = useRef(null);
  const imageRefs = useRef([]);
  const enabledRef = useRef(true);

  useEffect(() => {
    // disable parallax on small screens
    const minWidth = 768;
    if (typeof window !== "undefined" && window.innerWidth < minWidth) {
      enabledRef.current = false;
    }

    // speeds per layer
    const speed = [0.12, 0.06, -0.06, 0.08, 0.04];

    // cached centers and current translation values
    let centers = [];
    const current = [];
    let rafId = null;

    const lerp = (a, b, t) => a + (b - a) * t;

    const recalcCenters = () => {
      centers = [];
      const imgs = imageRefs.current;
      for (let i = 0; i < imgs.length; i++) {
        const el = imgs[i];
        if (!el) {
          centers.push(0);
          continue;
        }
        const rect = el.getBoundingClientRect();
        const scrollY = window.scrollY || window.pageYOffset;
        centers.push(scrollY + rect.top + rect.height / 2);
      }
      // init current values
      while (current.length < imgs.length) current.push(0);
    };

    const updateParallax = () => {
      if (!enabledRef.current) return;
      const imgs = imageRefs.current;
      const scrollY = window.scrollY || window.pageYOffset;
      const viewportCenter = scrollY + window.innerHeight / 2;
      for (let i = 0; i < imgs.length; i++) {
        const el = imgs[i];
        if (!el) continue;
        const center = centers[i] ?? (scrollY + el.getBoundingClientRect().top + el.offsetHeight / 2);
        const distanceFromCenter = center - viewportCenter;
        const target = -distanceFromCenter * (speed[i] ?? 0.06);
        // smaller lerp factor -> smoother, less jumpy
        current[i] = lerp(current[i], target, 0.08);
        // use translate3d for GPU acceleration
      }
    };

    const onScroll = () => {
      if (!enabledRef.current) return;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateParallax);
    };

    // IntersectionObserver: only enable parallax when hero visible
    let io = null;
    const sectionEl = sectionRef.current;
    if (sectionEl && typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            enabledRef.current = entry.isIntersecting && window.innerWidth >= minWidth;
            if (enabledRef.current) {
              // recalc centers when entering
              recalcCenters();
              onScroll();
            } else if (rafId) {
              cancelAnimationFrame(rafId);
            }
          });
        },
        { threshold: 0.05 }
      );
      io.observe(sectionEl);
    }

    // initial calc and listeners
    recalcCenters();
    updateParallax();
    window.addEventListener("scroll", onScroll, { passive: true });
    const onResize = () => {
      // disable on small screens
      enabledRef.current = window.innerWidth >= minWidth;
      recalcCenters();
      onScroll();
    };
    window.addEventListener("resize", onResize);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (io && sectionEl) io.unobserve(sectionEl);
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full h-screen grid grid-cols-6 grid-rows-5 gap-0 relative overflow-hidden">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none z-10 select-none"></div>

      {/* Center Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 select-none">
        <span className="text-emerald-300 text-sm tracking-widest uppercase">Welcome to Our Store</span>

        <h1 className="mt-2 text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
          Discover Your Style
        </h1>

        <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-xl">
          Shop the latest collections in fashion, electronics, furniture & more.
        </p>

        <NavLink
          to="/shop"
          className="mt-6 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer"
        >
          Shop Now
        </NavLink>
      </div>

      {/* Grid Images */}
      <img
        ref={(el) => (imageRefs.current[0] = el)}
        src={gamingItem}
        alt="Gaming Console"
        className="object-cover w-full h-full col-start-1 col-end-3 row-start-1 row-end-4"
        draggable={false}
        decoding="async"
      />

      <img
        ref={(el) => (imageRefs.current[1] = el)}
        src={mensClothing}
        alt="Men's Clothing"
        className="object-cover w-full h-full col-start-1 col-end-3 row-start-4 row-end-6 will-change-transform"
        draggable={false}
        decoding="async"
      />

      <img
        ref={(el) => (imageRefs.current[2] = el)}
        src={electronics}
        alt="Electronics"
        className="object-cover w-full h-full col-start-3 col-end-5 row-start-1 row-end-3 will-change-transform"
        draggable={false}
        decoding="async"
      />

      <img
        ref={(el) => (imageRefs.current[3] = el)}
        src={furniture}
        alt="Furniture"
        className="object-cover w-full h-full col-start-3 col-end-5 row-start-3 row-end-6 will-change-transform"
        draggable={false}
        decoding="async"
      />

      <img
        ref={(el) => (imageRefs.current[4] = el)}
        src={womensClothing}
        alt="Women's Clothing"
        className="object-cover w-full h-full col-start-5 col-end-7 row-start-1 row-end-6 will-change-transform"
        draggable={false}
        decoding="async"
      />
    </section>
  );
};

export default Hero;
