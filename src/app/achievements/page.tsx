import React from "react";
import {
  getAchievementsExcludingFeatured,
  getFeaturedAchievements,
} from "@/lib/service/achievement";
import AchievementQuestBoard from "@/components/achievement/AchievementQuestBoard";
import AchievementsSearch from "@/components/achievement/AchievementsSearch";
import BigWaves from "@/components/home/BigWaves";
import TitleDivider from "@/components/TitleDivider";
import { MdEmojiEvents } from "react-icons/md";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Achievements",
  description: "Explore the remarkable achievements and quest trophies of IMT UC people.",
};

export default async function AchievementsPage() {
  const featuredAchievements = (await getFeaturedAchievements()) ?? [];
  const achievementElse = (await getAchievementsExcludingFeatured()) ?? [];

  return (
    <div className="relative z-4 select-none overflow-hidden flex px-4 sm:px-8 md:px-16 lg:px-24 gap-8 sm:gap-12 flex-col items-center justify-center min-h-[90vh] pt-0 w-full overflow-x-hidden">
      <BigWaves extraClassName="rotate-x-180" />

      {/* Page Title & Icon Divider */}
      <TitleDivider
        title="STUDENT ACHIEVEMENTS"
        icon={<MdEmojiEvents />}
      />

      {/* 1. Dedicated Quest Board for Featured Achievements */}
      {featuredAchievements.length > 0 && (
        <AchievementQuestBoard achievements={featuredAchievements} />
      )}

      {/* 2. All Achievements Search & Responsive Grid */}
      <div className="w-full flex flex-col items-center justify-center my-4">
        <AchievementsSearch achievements={achievementElse} />
      </div>

      <BigWaves extraClassName="" />
    </div>
  );
}
