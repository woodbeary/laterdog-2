"use client";

import React from 'react';

const GithubContributionGraph: React.FC = () => {
  const generateRandomContributions = () => {
    return Math.floor(Math.random() * 5); // 0-4 contributions
  };

  const weeks = Array.from({ length: 52 }, () =>
    Array.from({ length: 7 }, generateRandomContributions)
  );

  const getColor = (count: number) => {
    if (count === 0) return 'bg-gray-800';
    if (count === 1) return 'bg-green-900';
    if (count === 2) return 'bg-green-700';
    if (count === 3) return 'bg-green-500';
    return 'bg-green-300';
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

  return (
    <div className="font-mono text-xs overflow-x-auto">
      <div className="inline-block min-w-full">
        <div className="flex mb-1 text-green-400 text-[0.5rem]">
          {months.map((month, index) => (
            <div key={month} style={{ width: `${100 / 12}%` }} className="text-center">
              {month}
            </div>
          ))}
        </div>
        <div className="flex">
          <div className="flex flex-col mr-1 space-y-1 text-green-400 text-[0.5rem]">
            {days.map((day, index) => (
              <div key={index} style={{ height: '8px' }}>{day}</div>
            ))}
          </div>
          <div className="flex space-x-[1px]">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col space-y-[1px]">
                {week.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`w-[8px] h-[8px] ${getColor(day)} rounded-sm`}
                    title={`${day} contributions`}
                  ></div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center mt-1 text-green-400 text-[0.5rem]">
          <span className="mr-1">Less</span>
          <div className={`w-[8px] h-[8px] ${getColor(0)} rounded-sm`}></div>
          <div className={`w-[8px] h-[8px] ${getColor(1)} rounded-sm ml-[1px]`}></div>
          <div className={`w-[8px] h-[8px] ${getColor(2)} rounded-sm ml-[1px]`}></div>
          <div className={`w-[8px] h-[8px] ${getColor(3)} rounded-sm ml-[1px]`}></div>
          <div className={`w-[8px] h-[8px] ${getColor(4)} rounded-sm ml-[1px]`}></div>
          <span className="ml-1">More</span>
        </div>
      </div>
    </div>
  );
};

export default GithubContributionGraph;