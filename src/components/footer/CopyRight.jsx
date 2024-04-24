import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "../../assets/styles/components/footer/CopyRigh.css";

const CopyRight = () => {
  const [currentYear, setCurrentYear] = useState(0);
  const [copyrightText, setCopyrightText] = useState("");

  useEffect(() => {
    const getCurrentYear = () => {
      const date = new Date();
      return date.getFullYear();
    };

    setCurrentYear(getCurrentYear());

    const yearDifference =
      currentYear > 2024 ? `2024 - ${currentYear}` : "2024";
    setCopyrightText(` Copyright ® ${yearDifference}. WheatherApp `);
  }, [currentYear]);

  return (
    <div className="copyright">
      <hr />
      <Link to="/about">
        <p>{copyrightText}</p>
      </Link>
    </div>
  );
};

export default CopyRight;
