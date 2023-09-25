'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import '../carousel.css'

const Slider = ({ images, speed, slidesToShow }: any) => {
  const [showSlides, setSlides] = useState(slidesToShow)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const controls = useAnimation()


  const continousFunction = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % showSlides);
  }, [showSlides]);

  useEffect(() => {
    const interval = setInterval(continousFunction, speed);
    return () => clearInterval(interval);
  }, [speed, continousFunction]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % showSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + showSlides) % showSlides);
  };

  const handleMouseEnter = (index: number) => {
    setIsHovered(true);
    controls.start({ marginRight: "0px", });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    controls.start({ marginRight: "100px", });
  };

  const handleViewPortSize = () => {
    const viewportWidth = window.innerWidth;
    if (viewportWidth >= 2500) {
      setSlides(Math.min(4, images.length));
    } else if (viewportWidth >= 1800) {
      setSlides(Math.min(3, images.length));
    } else if (viewportWidth >= 1000) {
      setSlides(Math.min(3, images.length));
    } else if (viewportWidth >= 800) {
      setSlides(Math.min(2, images.length));
    } else if (viewportWidth >= 700) {
      setSlides(1);
    } else if (viewportWidth >= 600) {
      setSlides(1);
    } else if (viewportWidth >= 500) {
      setSlides(1);
    } else if (viewportWidth >= 480) {
      setSlides(Math.min(1, images.length));
    }
  }

  useEffect(() => {
    // Add an event listener to update the breakpoint on window resize
    window.addEventListener('resize', handleViewPortSize);
    handleViewPortSize(); // Initial check

    return () => {
      // Remove the event listener when the component unmounts
      window.removeEventListener('resize', handleViewPortSize);
    };
  }, [handleViewPortSize]);

  return (
    <div className="relative w-full">
      <div className={`flex overflow-hidden justify-center  sm:justify-between`}>
        <AnimatePresence initial={false} custom={currentIndex}>
          {images.slice(currentIndex, currentIndex + showSlides).map((image: any, index: number) => (
            <motion.div
              key={index}
              className={`h-[465px]  w-[293px] hover:w-[400px] transition-all duration-500`}
              animate={controls}
              exit={{ x: -300 }}
              transition={{ duration: 0.01, repeatType: "mirror", }}
              custom={index}
              onMouseOver={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <img src={image.image.key} alt={`Slide ${index}`} className="w-full h-full object-cover  border-2 border-yellow-500 game-detail-carousel " />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <button onClick={prevSlide} className="absolute left-0 top-1/2 transform -translate-y-1/2 text-2xl">{"< Prev"}</button>
      <button onClick={nextSlide} className="absolute right-0 top-1/2 transform -translate-y-1/2 text-2xl">{"Next >"}</button>
    </div>
  );
};

export default Slider;
