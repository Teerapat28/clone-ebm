import React from "react";
import {
  CarylSection,
  RoadMap,
  Promotion,
  NewsSection,
  Article,
  Elibrary,
  Contact,
} from "../components";
import Warpper from "../assets/warppers/Landing";
import newsData from "../data/News";

export const loader = () => {
  const newData = newsData;
  return { newData };
};

const Landing = () => {
  return (
    <Warpper>
      <CarylSection />
      <RoadMap />
      <Promotion />
      <NewsSection />
      <Article />
      <Elibrary />
      <Contact />
    </Warpper>
  );
};

export default Landing;
