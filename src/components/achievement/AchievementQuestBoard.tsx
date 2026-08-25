import React from "react";
import { Achievement } from "@/types/service/achievement";
import AchievementFeaturedCarousel from "@/components/achievement/AchievementFeaturedCarousel";
import TLInfoPanelDecorative from "../TLInfoPanelDecorative";

interface AchievementQuestBoardProps {
  achievements: Achievement[];
}

export default function AchievementQuestBoard({
  achievements,
}: AchievementQuestBoardProps) {
  if (!achievements || achievements.length === 0) return null;

  return (
    <div className="w-full flex justify-center items-center my-4 select-none">
      {/* Wooden Quest Board Frame */}
      <div className="relative z-2 bg-[#7E3E11] border-2 border-black rounded-2xl p-4 md:p-8 w-full flex justify-center items-center shadow-2xl">
        {/* Inner Parchment Panel */}
        <div className="flex flex-col justify-center items-center z-1 bg-gradient-to-b rounded-xl border-2 border-black from-[#FFD7AB] to-[#FFE6CD] w-full min-h-full p-4 sm:p-6 md:p-8">
          <div className="w-full h-full my-6 sm:my-8 flex justify-center gap-4 items-center">
            <AchievementFeaturedCarousel achievements={achievements} />
          </div>
        </div>
        <TLInfoPanelDecorative>LATEST</TLInfoPanelDecorative>
      </div>
    </div>
  );
}
