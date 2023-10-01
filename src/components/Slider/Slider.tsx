'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

const Slider = ({ images, speed }: any) => {
  const [slidesToShow, setSlidesToShow] = useState<number>(4)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const controls = useAnimation();

  const handleMouseEnter = (index: number) => {
    setIsHovered(true);
    controls.start({ marginRight: "0px" });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    controls.start({ marginRight: "100px" });
  };

  const rearrangeImages = (currentIndex, slidesToShow) => {
    const visibleImages = images.slice(currentIndex, currentIndex + slidesToShow);
    const additionalImages = images.slice(0, slidesToShow - visibleImages.length);
    return [...visibleImages, ...additionalImages];
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const displayedImages = rearrangeImages(currentIndex, slidesToShow);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, speed);

    return () => clearInterval(interval);
  }, [speed]);

  const handleViewPortSize = () => {
    const viewportWidth = window.innerWidth;
    if (viewportWidth >= 2500) {
      setSlidesToShow(Math.min(4, images.length));
    } else if (viewportWidth >= 1800) {
      setSlidesToShow(Math.min(3, images.length));
    } else if (viewportWidth >= 1000) {
      setSlidesToShow(Math.min(3, images.length));
    } else if (viewportWidth >= 800) {
      setSlidesToShow(Math.min(2, images.length));
    } else if (viewportWidth >= 700) {
      setSlidesToShow(1);
    } else if (viewportWidth >= 600) {
      setSlidesToShow(1);
    } else if (viewportWidth >= 500) {
      setSlidesToShow(1);
    } else if (viewportWidth >= 480) {
      setSlidesToShow(Math.min(1, images.length));
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
    <>
      <div className="relative w-full">
        <motion.div drag="x" dragConstraints={{ right: 0}} className={`flex overflow-hidden justify-center sm:justify-between`}
        
        >
          <AnimatePresence initial={false} custom={currentIndex}>
            {displayedImages.map((image: any, index: number) => (
              <motion.div
                key={index}
                className={`h-[465px] w-[293px] hover:w-[400px] transition-all duration-500`}
                initial={{ x: 0 }}
                animate={controls}
                exit={{ x: -400 }}
                transition={{ duration: 0.0001, ease: 'easeInOut' }}
                custom={index}
                onMouseOver={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <motion.img
                  src={image.image.key} alt={`Slide ${index}`} className="w-full h-full object-cover border-2 border-yellow-500 game-detail-carousel" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        <button onClick={prevSlide} className="absolute left-0 top-1/2 transform -translate-y-1/2 text-2xl">{"< Prev"}</button>
        <button onClick={nextSlide} className="absolute right-0 top-1/2 transform -translate-y-1/2 text-2xl">{"Next >"}</button>
      </div>
      <div className="pagination-dots mt-4 flex justify-center space-x-2">
        {images.map((_, index) => (
          <span
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </>


  );
};

export default Slider;

