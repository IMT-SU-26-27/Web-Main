import React from "react";
import CompetitionForm from "@/components/competition/CompetitionForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Competition - SA Dashboard",
  description: "Create a new student union competition.",
};

export default function CreateCompetitionPage() {
  return (
    <div className="w-full h-full flex-1 flex flex-col p-4 sm:p-6 md:p-8 select-none">
      <CompetitionForm mode="create" />
    </div>
  );
}
