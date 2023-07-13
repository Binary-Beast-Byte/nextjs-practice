"use client"

import React, { useState } from 'react';
import Lightening from "../../../public/light.png";
import Image from 'next/image';
import { motion } from 'framer-motion';

const Page = () => {
  const [isAnimating, setIsAnimating] = useState(true);

  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <div className='relative h-[300px] w-[300px] bg-blue-300 rounded-full rotate-45' />
      <motion.span
        className='w-[150px] absolute top-20 left-1/2 transform -translate-x-1/2'
        animate={{
            scaleY: isAnimating ? [2, 0.5, 2] : 1,
          }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'mirror',
        }}
        onAnimationComplete={() => setIsAnimating(false)}
        style={{ transformOrigin: 'bottom' }}

      >
        <Image src={Lightening} alt="" width={150} height={200} className='' />
      </motion.span>

      <motion.span
        className='w-[150px] absolute top-20 right-[60%] transform translate-x-14 rotate-45'
        animate={{
            scaleY: isAnimating ? [2, 0.5, 2] : 1,
          }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'mirror',
        }}
        onAnimationComplete={() => setIsAnimating(false)}
        style={{ transformOrigin: 'bottom' }}

      >
        <Image src={Lightening} alt="" width={150} height={200} className='' />
      </motion.span>
    </div>
  );
};

export default Page;
