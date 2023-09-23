import React, { useState, useEffect, useCallback } from "react";
import "./carousel.css";

function CustomCarousel({ data }) {
  const [stopEffect, setStopEffect] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [gameDataSectionOne, setGameDataSectionOne] = useState(data);

  function rollUpArray(array) {
    const rolledArray = [...array];
    const lastIndex = rolledArray.pop();
    rolledArray.unshift(lastIndex);
    return rolledArray;
  }

  const continuousFunction = useCallback(() => {
    setGameDataSectionOne((prevData) => rollUpArray(prevData));
  }, []);

  useEffect(() => {
    if (!stopEffect) {
      const intervalId = setInterval(continuousFunction, 100);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [continuousFunction, stopEffect]);

  const handleNext = () => {
    setStopEffect(true);
    setGameDataSectionOne((prevData) => rollUpArray(prevData));
    setStopEffect(false);
  };

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  // Check if data is updated to see if the slider should move
  useEffect(() => {
    if (gameDataSectionOne !== data) {
      setGameDataSectionOne(data);
    }
  }, [data, gameDataSectionOne]);

  return (
    <div className="custom-carousel w-full max-w-screen-lg mx-auto p-4 pt-[100px]">
      <div className="carousel-images relative overflow-hidden">
        <div className="flex space-x-3">
          {gameDataSectionOne.slice(activeIndex, activeIndex + 3).map((item, i) => (
            <div
              key={i}
              className={`w-full h-72 md:w-1/3 lg:w-1/4 xl:w-1/6 relative transition-transform transform duration-300 ease-in-out sliders${i}`}
            >
              {item.image ? (
                <img
                  src={`${item.image.key}`}
                  alt={item.slug}
                  className="w-full h-full object-cover"
                />
              ) : (
                "fallback"
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="carousel-controls mt-2 text-center">
        <button
          onClick={handleNext}
          className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 ease-in-out"
        >
          Next
        </button>
        {/* Implement your dot navigation here */}
      </div>
    </div>
  );
}

export default CustomCarousel;
