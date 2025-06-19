// src/pages/HomePage.jsx
import React from "react";
import Layout from "../components/common/Layout";
import HomeHero from "../components/Home/HomeHero";

export default function HomePage() {
  return (
    <Layout>
      <div className="h-full w-full">
        <HomeHero />
      </div>
    </Layout>
  );
}
