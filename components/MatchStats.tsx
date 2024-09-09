"use client";

import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Stat {
  name: string
  shortName: string
  value: string | number
  description: string
}

interface MatchStatsProps {
  stats: Stat[]
  bio: string
}

export function MatchStats({ stats, bio }: MatchStatsProps) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-green-500 w-full max-w-sm">
      <h3 className="text-green-300 text-xl mb-4 text-center">Developer Profile</h3>
      <p className="text-green-400 mb-4 text-sm">{bio}</p>
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat) => (
          <TooltipProvider key={stat.name}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="bg-gray-700 p-2 rounded">
                  <span className="text-green-400 text-sm font-bold">{stat.shortName}</span>
                  <div className="text-green-300 font-bold">{stat.value}</div>
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-gray-700 text-green-400 border-green-500">
                <p className="font-bold">{stat.name}</p>
                <p className="text-sm">{stat.description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  )
}