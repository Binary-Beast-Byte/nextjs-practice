import Slider from '@/components/Slider/Slider';
import React from 'react'

const page = () => {
    const sliderImages = [
        { image: { key: "/images/1.jpg" }, slug: "item1" },
        { image: { key: "/images/2.jpg" }, slug: "item2" },
        { image: { key: "/images/3.jpg" }, slug: "item3" },
        { image: { key: "/images/4.jpg" }, slug: "item4" },
        { image: { key: "/images/5.jpg" }, slug: "item5" },
    ];
    return (
        <div className='mt-[200px] px-4'>
            <h1>Custom slider component</h1>
            <Slider images={sliderImages} slidesToShow={3} speed={10000} />
        </div>
    )
}

export default page