import React from "react";
import AchievementForm from "@/components/achievement/AchievementForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Achievement - PR Dashboard",
  description: "Create a new student union achievement record.",
};

export default function CreateAchievementPage() {
  return (
    <div className="w-full h-full flex-1 flex flex-col p-4 sm:p-6 md:p-8 select-none">
      <AchievementForm mode="create" />
    </div>
  );
}
