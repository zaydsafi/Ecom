import React from "react";
import Layout from "./common/Layout";
import HeroSection from "./common/HeroSection";
import LatestProducts from "./common/LatestProducts";
import FeaturedProducts from "./common/FeaturedProducts";

const Home = () => {
  return (
    <>
      <Layout>
        <HeroSection />

        <LatestProducts />

        <FeaturedProducts />
      </Layout>
    </>
  );
};

export default Home;
