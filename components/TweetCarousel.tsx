'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Tweet } from 'react-tweet';

interface TweetData {
  id: string;
  author: string;
}

const tweets: TweetData[] = [
  { id: '1834354801896726667', author: 'michael_c_law' },
  { id: '1834355056008995060', author: 'pillzzu' },
  { id: '1834355890549301394', author: 'DidGinn' },
  { id: '1834351595414327369', author: 'wtravishubbard' },
  { id: '1834005657374117946', author: 'nathudgens' },
];

export function TweetCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      const scrollWidth = scrollElement.scrollWidth;
      const animationDuration = scrollWidth / 50; // Adjust speed as needed
      scrollElement.style.setProperty('--scroll-width', `${scrollWidth / 2}px`);
      scrollElement.style.setProperty('--animation-duration', `${animationDuration}s`);
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    scrollRef.current.style.animationPlayState = 'paused';
    scrollRef.current.style.cursor = 'grabbing';
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (scrollRef.current) {
      scrollRef.current.style.animationPlayState = 'running';
      scrollRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  return (
    <div className="tweet-carousel-container w-full overflow-hidden relative">
      <div className="fade-overlay left-0 bg-gradient-to-r from-gray-900 to-transparent"></div>
      <div className="fade-overlay right-0 bg-gradient-to-l from-gray-900 to-transparent"></div>
      <div 
        ref={scrollRef} 
        className="tweet-carousel flex animate-scroll cursor-grab"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        {tweets.concat(tweets).map((tweet, index) => (
          <div key={`${tweet.id}-${index}`} className="tweet-item flex-shrink-0 mx-4">
            <div className="tweet-wrapper">
              <Tweet id={tweet.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}