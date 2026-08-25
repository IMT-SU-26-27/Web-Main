import React from "react";
import { getAchievements } from "@/lib/service/achievement";
import DashboardSearch from "@/components/dashboard/DashboardSearch";
import { deleteAchievement } from "@/lib/service/achievement";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Achievements - PR Dashboard",
  description: "Manage public relations student achievements.",
};

async function AchievementDashboard() {
  const achievements = await getAchievements();

  return (
    <div className="w-full h-full flex-1 flex flex-col items-center justify-start m-0 p-0">
      <DashboardSearch
        items={achievements}
        deleteItem={deleteAchievement}
        label="Achievement"
        urlForEdit="/dashboard/pr"
      />
    </div>
  );
}

export default AchievementDashboard;