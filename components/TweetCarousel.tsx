'use client';

import React, { useRef, useState, useEffect } from 'react';
import Slider, { Settings } from 'react-slick';
import { Tweet } from 'react-tweet';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

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

const TweetCarousel: React.FC = () => {
  const sliderRef = useRef<Slider>(null);
  const [isPaused, setIsPaused] = useState(false);

  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 5000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: false,
    swipeToSlide: true,
    draggable: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  useEffect(() => {
    if (sliderRef.current) {
      if (isPaused) {
        sliderRef.current.slickPause();
      } else {
        sliderRef.current.slickPlay();
      }
    }
  }, [isPaused]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <div 
      className="tweet-carousel-container w-full relative overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="fade-overlay left-0 bg-gradient-to-r from-white to-transparent dark:from-gray-900"></div>
      <div className="fade-overlay right-0 bg-gradient-to-l from-white to-transparent dark:from-gray-900"></div>
      <Slider ref={sliderRef} {...settings}>
        {tweets.concat(tweets).map((tweet, index) => (
          <div key={`${tweet.id}-${index}`} className="tweet-item px-2">
            <div className="tweet-wrapper">
              <Tweet id={tweet.id} />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default TweetCarousel;