import React from "react";
import { getActivityById } from "@/lib/service/activity";
import NotFound from "./not-found";
import ClientActivityDetails from "@/components/activity/details/ClientPage";

export async function generateMetadata(props: {
  params: Promise<{ activityId: string }>;
}) {
  const params = await props.params;
  const activityId = params.activityId;
  const activity = await getActivityById(activityId);

  if (!activity) {
    return {
      title: "Activity Not Found",
    };
  }

  return {
    title: activity.title,
  };
}

const ActivityDetails = async (props: {
  params: Promise<{ activityId: string }>;
}) => {
  const params = await props.params;
  const activity = await getActivityById(params.activityId);

  if (!activity) {
    return <NotFound />;
  }

  return <ClientActivityDetails activity={activity} />;
};

export default ActivityDetails;
