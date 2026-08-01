"use client";

import Image from "next/image";
import React from "react";
import { Achievement } from "@/types/service/achievement";

interface AchievementCardProps {
  achievement: Achievement;
  borderColor?: string;
  type?: string;
  className?: string;
}

export function AchievementCard({
  achievement,
  className,
}: AchievementCardProps) {
  return (
    <div
      className={`bg-white w-[20rem] p-4 h-96 flex flex-col justify-start items-center rounded-lg shadow-md overflow-hidden ${className ?? ""}`}
    >
      {achievement.imageUrl ? (
        <div className="relative bg-gray-300 h-72 w-full rounded overflow-hidden">
          <Image
            src={achievement.imageUrl}
            alt={achievement.title}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="bg-gray-300 h-72 w-full rounded flex items-center justify-center">
          <span className="text-gray-500 text-sm">No image</span>
        </div>
      )}
      <div className="mt-3 w-full text-center">
        <h4 className="text-[#543737] font-bold text-sm line-clamp-2">
          {achievement.title}
        </h4>
        <p className="text-[#7E3E11] text-xs mt-1 line-clamp-1">
          {achievement.teamInfo}
        </p>
      </div>
    </div>
  );
}

export default AchievementCard;
