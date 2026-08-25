import React from "react";
import ActivityForm from "@/components/activity/ActivityForm";
import { getActivityById } from "@/lib/service/activity";
import { notFound } from "next/navigation";
import { Category } from "@prisma/client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Activity - SA Dashboard",
  description: "Edit student union activity details.",
};

export default async function EditActivityPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = params.id;
  const activity = await getActivityById(id);
  const categories = Object.values(Category);

  if (!activity) {
    notFound();
  }

  return (
    <div className="w-full h-full flex-1 flex flex-col p-4 sm:p-6 md:p-8 select-none">
      <ActivityForm mode="edit" data={activity} categories={categories} />
    </div>
  );
}
