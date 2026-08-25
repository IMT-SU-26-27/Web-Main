import React from "react";
import { getActivities } from "@/lib/service/activity";
import DashboardSearch from "@/components/dashboard/DashboardSearch";
import { deleteActivity } from "@/lib/service/activity";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Activities - SA Dashboard",
  description: "Activities Dashboard",
};

async function ActivitiesDashboard() {
  const activities = await getActivities();
  return (
    <div className="w-full h-full flex-1 flex flex-col items-center justify-start m-0 p-0">
      <DashboardSearch
        items={activities}
        deleteItem={deleteActivity}
        label="Activity"
        urlForEdit="/dashboard/sa/activities"
      />
    </div>
  );
}

export default ActivitiesDashboard;
