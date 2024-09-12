import React from 'react';
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
  return (
    <div className="tweet-carousel-container overflow-hidden w-full bg-gray-100 dark:bg-gray-800 rounded-lg shadow-inner">
      <div className="tweet-carousel flex animate-scroll">
        {tweets.concat(tweets).map((tweet, index) => (
          <div key={`${tweet.id}-${index}`} className="tweet-item flex-shrink-0 mx-4">
            <Tweet id={tweet.id} />
          </div>
        ))}
      </div>
    </div>
  );
}