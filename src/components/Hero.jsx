import React from "react";
import {
  womensClothing,
  mensClothing,
  electronics,
  furniture,
  gamingItem
} from "../data/HeroImages";

const Hero = () => {
  return (
    <section className="w-full h-screen grid grid-cols-6 grid-rows-5 gap-0 relative">
      <div className="absolute inset-0 bg-black/60 pointer-events-none z-10  select-none"></div>

      {/* div1: grid-area 1 / 1 / 4 / 3 */}
      <img
        src={gamingItem}
        alt="Women's Clothing"
        className="object-cover w-full h-full col-start-1 col-end-3 row-start-1 row-end-4"
        draggable={false}
      />

      {/* div2: grid-area 4 / 1 / 6 / 3 */}
      <img
        src={mensClothing}
        alt="Men's Clothing"
        className="object-cover w-full h-full col-start-1 col-end-3 row-start-4 row-end-6"
        draggable={false}
      />

      {/* div3: grid-area 1 / 3 / 3 / 5 */}
      <img
        src={electronics}
        alt="Electronics"
        className="object-cover w-full h-full col-start-3 col-end-5 row-start-1 row-end-3"
        draggable={false}
      />

      {/* div4: grid-area 3 / 3 / 6 / 5 */}
      <img
        src={furniture}
        alt="Furniture"
        className="object-cover w-full h-full col-start-3 col-end-5 row-start-3 row-end-6"
        draggable={false}
      />

      {/* div5: grid-area 1 / 5 / 6 / 7 */}
      {/* Assuming you have a 5th image, otherwise use one of the above or add a placeholder */}
      <img
        src={womensClothing} // Replace with your actual 5th image
        alt="Additional Image"
        className="object-cover w-full h-full col-start-5 col-end-7 row-start-1 row-end-6"
        draggable={false}
      />
    </section>
  );
};

export default Hero;
