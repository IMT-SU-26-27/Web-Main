"use client";

import React, { useState, useEffect } from "react";
import AchievementCard from "@/components/achievement/AchievementCard";
import { Achievement } from "@/types/service/achievement";
import ArrowButton from "@/components/utils/ArrowButton";
import { useIsMobile } from "@/hooks/useIsMobile";
interface AchievementFeaturedCarouselProps {
  achievements: Achievement[];
}

export default function AchievementFeaturedCarousel({
  achievements,
}: AchievementFeaturedCarouselProps) {
  const isMobile = useIsMobile();
  const itemsPerPage = isMobile ? 2 : 3;
  const totalPages = Math.ceil(achievements.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    setCurrentPage(0);
  }, [itemsPerPage]);

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
          <ArrowButton extraClass="absolute -left-4" direction="left" onClick={handlePrev}></ArrowButton>
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
          <ArrowButton extraClass="absolute -right-4" direction="right" onClick={handleNext}></ArrowButton>
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
