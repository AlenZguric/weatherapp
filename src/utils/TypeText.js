import React, { useEffect, useState, useRef } from "react";

const TypeText = ({ text, delay, initialDelay, element }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingCompleted, setIsTypingCompleted] = useState(false);
  const intervalRef = useRef(null); // useRef za interval

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        setIsTypingCompleted(true);
        clearInterval(intervalRef.current);
      }
    }, delay);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [text, delay, currentIndex, initialDelay]);

  // Ako je tipkanje završeno, zaustavljamo tipkanje
  if (isTypingCompleted) {
    clearInterval(intervalRef.current);
  }

  return React.createElement(element, null, displayedText);
};

export default TypeText;
