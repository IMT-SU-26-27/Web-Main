import React from "react";
import { getEventById } from "@/lib/service/event";
import EventForm from "@/components/events/EventForm";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Event - Tech Dashboard",
  description: "Edit existing student union event details.",
};

export default async function EditEventPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const event = await getEventById(params.id);

  if (!event) {
    notFound();
  }

  return (
    <div className="w-full h-full flex-1 flex flex-col mb-10 select-none">
      <EventForm mode="edit" data={event} />
    </div>
  );
}
