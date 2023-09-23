'use client'

import CustomCarousel from "@/components/CarouselComp";


const page = () => {

    const carouselData = [
        { image: { key: "/images/1.jpg" }, slug: "item1" },
        { image: { key: "/images/2.jpg" }, slug: "item2" },
        { image: { key: "/images/3.jpg" }, slug: "item3" },
        { image: { key: "/images/4.jpg" }, slug: "item4" },
        { image: { key: "/images/5.jpg" }, slug: "item5" },
        // Add more data objects as needed
      ];

  return (
    <div>
        <CustomCarousel data={carouselData} /> 
    </div>
  )
}

export default page