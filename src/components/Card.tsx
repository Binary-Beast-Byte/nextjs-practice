"use client"
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';

const Card = () => {
  const [data, setData] = useState([]);
  const [item, setItem] = useState(10);
  const [loading, setLoading] = useState(false);

  console.log('page', item)
  const containerRef = useRef(null);

  const getApiData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const { data: newData } = await axios.get(
        `https://api.punkapi.com/v2/beers?page=1&per_page=${item}`
      );
      setData(newData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getApiData();
  }, [item]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0, // Trigger when the whole element is in view
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        console.log('intersecting')
        setItem((prevPage) => prevPage + 10);

        // getApiData();
      }
    }, options);

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div className='w-[80vw] h-[70vh] p-5 bg-slate-500 flex flex-col overflow-y-scroll space-y-4 my-12 mx-auto'>
      {data.map((d) => (
        <div key={d.id} className='border border-red-400 drop-shadow-xl'>
          <p className='italic text-lg font-semibold capitalize tracking-widest'>{d.tagline}</p>
          <p className='text-gray-300'>{d.description}</p>
        </div>
      ))}
      <div ref={containerRef} style={{ height: '1px' }} />
    </div>
  );
};

export default Card;
