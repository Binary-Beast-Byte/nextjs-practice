'use client'

import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { motion, scroll, useScroll, useTransform } from 'framer-motion'

const data = [
    {
        title: 'first',
        key: 1,
        src: '/1.png'
    },
    {
        title: 'second',
        key: 2,
        src: '/2.png'
    },
    {
        title: 'third',
        key: 3,
        src: '/3.png'
    },
    {
        title: 'fourth',
        key: 4,
        src: '/4.png'
    },

]

// mr-369



const Animate = () => {
    const circleRadius = window?.innerWidth < 1280 ? 250 :  500; // Adjust the radius based on your design
    const totalImages = data.length;
    const [rotation, setRotation] = useState<number>(0);
    console.log(rotation)
    const scrollRef = useRef(null);

    const { scrollYProgress } = useScroll({ target: scrollRef});
    const rotatenew = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [10, -90, -180, -270, -360])

    const handleDivClick = () => {
        setRotation(rotation - 90);
    };

    const circleVariants = {

        rotate: {
            rotate: rotation,
            transition: {
                duration: 2,
                repeatType: 'loop',
                type: 'spring'
            }
        }
    }

let circleWidthHeight = `${circleRadius * 2}px`
    return (
        <motion.div ref={scrollRef}  className='h-[300vh] w-screen flex justify-end  items-start bg-[#eed487] overflow-hidden ]'>
            <motion.div
                transition={{ duration: 2}}
                style={{ rotate: rotatenew }}
                className={`w-[500px] h-[500px] xl:w-[1000px] xl:h-[1000px]  rounded-full  border-4 border-black bg-none -mr-[300px]  xl:-mr-[540px] fixed`}
            >
                {data.map((d, index) => {
                    const angle = (index / totalImages) * 360; // Calculate the angle based on the number of images
                    const x = circleRadius * Math.cos((angle * Math.PI) / 180);
                    const y = circleRadius * Math.sin((angle * Math.PI) / 180);

                    return (
                        <div
                            key={d.key}
                            className='absolute w-full'
                            style={{ top: `calc(50% - 70px + ${y}px)`, left: `calc(50% - 70px + ${x}px)` }}
                        >
                            <Image src={d.src} width={200} height={200}  alt='image' className='rounded-full border border-gray-700 hidden xl:block' />
                            <Image src={d.src} width={100} height={100} alt='image' className='rounded-full border border-gray-700  xl:hidden' />
                        </div>
                    );
                })}
            </motion.div>
        </motion.div>
    )
}

export default Animate