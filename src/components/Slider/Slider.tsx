'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import '../carousel.css'

const Slider = ({ images, speed, slidesToShow }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  console.log('currentIndex', currentIndex)
  const [isHovered, setIsHovered] = useState<boolean>(false);

  console.log('isHovered', isHovered)

  const controls = useAnimation()

  const continousFunction = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slidesToShow);
  }, [slidesToShow]);

  useEffect(() => {
    const interval = setInterval(continousFunction, speed);
    return () => clearInterval(interval);
  }, [speed, continousFunction]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slidesToShow);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slidesToShow) % slidesToShow);
  };

  const handleMouseEnter = (index: number) => {
    setIsHovered(true);
    controls.start({ marginRight: "0px" , });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    controls.start({ marginRight: "100px", });
  };

  return (
    <div className="relative w-full">
      <div className={`flex overflow-hidden justify-between`}>
        <AnimatePresence initial={false} custom={currentIndex}>
          {images.slice(currentIndex, currentIndex + slidesToShow).map((image:any, index: number) => (
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
