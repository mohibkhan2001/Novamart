import React from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Hero />
    </div>
  );
};

export default Home;
