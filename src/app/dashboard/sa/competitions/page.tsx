import React from "react";
import DashboardSearch from "@/components/dashboard/DashboardSearch";
import { getCompetitions } from "@/lib/service/competition";
import { deleteCompetition } from "@/lib/service/competition";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Competitions - SA Dashboard",
  description: "Manage your competitions",
};

async function CompetitionDashboard() {
  const competitions = await getCompetitions();
  return (
    <div className="w-full h-full flex-1 flex flex-col items-center justify-start m-0 p-0">
      <DashboardSearch
        items={competitions}
        deleteItem={deleteCompetition}
        label="Competition"
        urlForEdit="/dashboard/sa/competitions"
      />
    </div>
  );
}

export default CompetitionDashboard;