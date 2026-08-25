import React from "react";
import EventForm from "@/components/events/EventForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Event - Tech Dashboard",
  description: "Create a new student union event.",
};

export default function CreateEventPage() {
  return (
    <div className="w-full h-full flex-1 flex flex-col mb-10 select-none">
      <EventForm mode="create" />
    </div>
  );
}
