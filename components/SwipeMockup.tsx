import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import { mockMatches, MatchData } from '@/lib/mockData';
import Image from 'next/image';
import { Github, MapPin, Code, X, Heart } from 'lucide-react';

const SwipeMockup: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);

  const currentProfile = mockMatches[currentIndex];

  const handleSwipe = (swipeDirection: 'left' | 'right') => {
    setDirection(swipeDirection);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % mockMatches.length);
      setDirection(null);
    }, 300);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('left'),
    onSwipedRight: () => handleSwipe('right'),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  const renderCommitHistory = useMemo(() => {
    const weeks = 20; // Increased for a wider graph
    const daysPerWeek = 7;
    const totalDays = weeks * daysPerWeek;
    const commitIntensity = Math.min(currentProfile.githubData.total_commits / totalDays, 1);

    const getCommitColor = (intensity: number) => {
      if (intensity === 0) return 'bg-gray-800';
      if (intensity < 0.25) return 'bg-green-900';
      if (intensity < 0.5) return 'bg-green-700';
      if (intensity < 0.75) return 'bg-green-500';
      return 'bg-green-300';
    };

    const commitTiles = Array.from({ length: totalDays }, () => {
      const randomIntensity = Math.random() * commitIntensity;
      return getCommitColor(randomIntensity);
    });

    return (
      <div className="flex gap-[2px] mt-2 overflow-x-auto pb-2">
        {Array.from({ length: weeks }).map((_, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-[2px]">
            {Array.from({ length: daysPerWeek }).map((_, dayIndex) => {
              const tileIndex = weekIndex * daysPerWeek + dayIndex;
              return (
                <div
                  key={dayIndex}
                  className={`w-2 h-2 ${commitTiles[tileIndex]} rounded-sm`}
                ></div>
              );
            })}
          </div>
        ))}
      </div>
    );
  }, [currentProfile.githubData.total_commits]);

  return (
    <div className="w-80 h-[36rem] bg-gray-900 rounded-2xl overflow-hidden relative shadow-lg flex flex-col" {...swipeHandlers}>
      <AnimatePresence initial={false}>
        <motion.div
          key={currentProfile.id}
          className="flex-grow"
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{
            x: direction === 'left' ? -300 : 300,
            opacity: 0,
            transition: { duration: 0.2 },
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className="relative h-full">
            <Image
              src={currentProfile.image}
              alt={currentProfile.name}
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-3xl font-bold mb-2">{currentProfile.name}, {currentProfile.profile.age}</h3>
              <div className="flex items-center mb-2">
                <MapPin size={18} className="mr-2" />
                <span>{currentProfile.profile.location}</span>
              </div>
              <div className="flex items-center mb-2">
                <Code size={18} className="mr-2" />
                <span>{currentProfile.githubData.top_language} Developer</span>
              </div>
              <div className="flex items-center mb-2">
                <Github size={18} className="mr-2" />
                <span>{currentProfile.githubData.public_repos} repos • {currentProfile.githubData.followers} followers</span>
              </div>
              <p className="text-sm line-clamp-2 text-gray-200 mb-2">{currentProfile.profile.bio}</p>
              {renderCommitHistory}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="bg-gray-800 p-4 flex justify-center space-x-6">
        <button
          className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-red-500 text-3xl shadow-lg backdrop-blur-sm transition-all hover:bg-opacity-30"
          onClick={() => handleSwipe('left')}
        >
          <X size={32} />
        </button>
        <button
          className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-green-500 text-3xl shadow-lg backdrop-blur-sm transition-all hover:bg-opacity-30"
          onClick={() => handleSwipe('right')}
        >
          <Heart size={32} fill="currentColor" />
        </button>
      </div>
    </div>
  );
};

export default SwipeMockup;