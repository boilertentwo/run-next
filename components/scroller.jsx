'use client'

import { useEffect, useState, Children, cloneElement } from 'react';

const Scroller = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const childCount = Children.count(children);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % childCount);
    }, 11000); 
    return () => clearInterval(interval);
  }, [childCount]);

  return (
    <div className="relative overflow-hidden w-screen h-screen">
      {Children.map(children, (child, index) =>
        cloneElement(child, {
          className: `absolute w-full h-full transition-transform duration-1000 ${
            index === activeIndex ? 'transform translate-x-0 animate-scrollIn' : 'animate-scrollOut'
          }`,
        })
      )}
    </div>
  );
};

export default Scroller;

