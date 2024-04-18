import React from "react";
import AboutComponent from "../components/main/AboutComponent";
import { Slika } from "../components/main/Slika";

const About = () => {
  return (
    <div className="about-page">
      <AboutComponent />
      <Slika/>
    </div>
  );
};

export default About;
