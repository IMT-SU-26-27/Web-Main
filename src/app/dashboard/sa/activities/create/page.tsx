import React from "react";
import ActivityForm from "@/components/activity/ActivityForm";
import { Category } from "@prisma/client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Activity - SA Dashboard",
  description: "Create a new student union activity.",
};

export default async function CreateActivityPage() {
  const categories = Object.values(Category);
  return (
    <div className="w-full h-full flex-1 flex flex-col p-4 sm:p-6 md:p-8 select-none">
      <ActivityForm mode="create" categories={categories} />
    </div>
  );
}
