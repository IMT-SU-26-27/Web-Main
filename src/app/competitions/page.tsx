import React from "react";
import { getCompetitions } from "@/lib/service/competition";
import CompetitionsBoard from "@/components/competition/CompetitionsBoard";

export const metadata = {
  title: "Competitions",
};

export default async function CompetitionsPage() {
  const competitions = await getCompetitions();

  return (
    <>
      {/* Spacer for header */}
      <div className="h-[10vh] bg-medium-blue" />

      <div className="select-none relative overflow-hidden flex flex-col items-center justify-center min-h-[90vh] w-full bg-medium-blue py-16">
        <CompetitionsBoard competitions={competitions} />
      </div>
    </>
  );
}
