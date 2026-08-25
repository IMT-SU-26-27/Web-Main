import React from "react";
import AchievementForm from "@/components/achievement/AchievementForm";
import { getAchievementById } from "@/lib/service/achievement";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Achievement - PR Dashboard",
  description: "Edit student union achievement details.",
};

export default async function EditAchievementPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = params.id;
  const achievement = await getAchievementById(id);

  if (!achievement) {
    notFound();
  }

  return (
    <div className="w-full h-full flex-1 flex flex-col p-4 sm:p-6 md:p-8 select-none">
      <AchievementForm mode="edit" data={achievement} />
    </div>
  );
}
