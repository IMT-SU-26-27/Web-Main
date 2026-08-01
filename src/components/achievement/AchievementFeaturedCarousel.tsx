"use client";

import React, { useState } from "react";
import AchievementCard from "@/components/achievement/AchievementCard";
import { Achievement } from "@/types/service/achievement";

interface AchievementFeaturedCarouselProps {
  achievements: Achievement[];
}

export default function AchievementFeaturedCarousel({
  achievements,
}: AchievementFeaturedCarouselProps) {
  const itemsPerPage = 3;
  const totalPages = Math.ceil(achievements.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const handlePrev = (): void => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handleNext = (): void => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const startIndex: number = currentPage * itemsPerPage;
  const visibleAchievements: Achievement[] = achievements.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (achievements.length === 0) {
    return (
      <p className="text-[#543737] font-pixelify text-lg py-8">
        No featured achievements yet.
      </p>
    );
  }

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="w-full flex justify-center items-center gap-4">
        {/* Previous Button */}
        {totalPages > 1 && (
          <button
            onClick={handlePrev}
            aria-label="Previous achievements"
            className="shrink-0 w-10 h-10 rounded-full bg-[#7E3E11] border-2 border-[#543737] text-white flex items-center justify-center hover:bg-[#9B5A2A] transition-colors duration-200 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        {/* Achievement Cards */}
        <div className="flex justify-center gap-4 items-stretch flex-wrap">
          {visibleAchievements.map((achievement: Achievement) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
            />
          ))}
        </div>

        {/* Next Button */}
        {totalPages > 1 && (
          <button
            onClick={handleNext}
            aria-label="Next achievements"
            className="shrink-0 w-10 h-10 rounded-full bg-[#7E3E11] border-2 border-[#543737] text-white flex items-center justify-center hover:bg-[#9B5A2A] transition-colors duration-200 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Page Indicator Dots */}
      {totalPages > 1 && (
        <div className="flex gap-2 mt-2">
          {Array.from({ length: totalPages }).map((_, index: number) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              aria-label={`Go to page ${index + 1}`}
              className={`w-3 h-3 rounded-full transition-colors duration-200 cursor-pointer ${
                index === currentPage
                  ? "bg-[#7E3E11]"
                  : "bg-[#D4A574] hover:bg-[#9B5A2A]"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
