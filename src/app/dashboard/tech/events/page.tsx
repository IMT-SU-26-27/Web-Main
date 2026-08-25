import React from "react";
import { getEvents } from "@/lib/service/event";
import EventTable from "@/components/events/EventTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Event Management - Tech Dashboard",
  description: "Manage upcoming and past student union events.",
};

export default async function TechEventsPage() {
  const events = await getEvents();

  return (
    <div className="w-full h-full flex-1 flex flex-col mb-10 select-none">
      {/* Outer Wooden Board Frame */}
      <div className="relative z-2 bg-[#7E3E11] border-2 border-black rounded-2xl p-4 sm:p-6 md:p-8 w-full flex-1 flex flex-col justify-start items-center shadow-2xl mt-4">
        {/* Top Centered Wooden Plaque Header */}
        <div className="font-cinzel py-1 sm:py-1.5 md:py-2 px-6 sm:px-10 md:px-14 rounded-lg sm:rounded-xl font-bold text-white border-black text-sm sm:text-lg md:text-2xl lg:text-3xl absolute z-10 -top-4 sm:-top-5 md:-top-6 left-1/2 -translate-x-1/2 bg-[#BF6432] border-2 shadow-md flex items-center justify-center whitespace-nowrap">
          <span className="font-outline-2 sm:font-outline-4 z-1 absolute text-[#7E3E11]">
            EVENT MANAGEMENT
          </span>
          <p className="relative z-2">EVENT MANAGEMENT</p>
        </div>

        {/* Inner Parchment Panel */}
        <div className="flex flex-col z-1 bg-gradient-to-b from-[#FFD7AB] to-[#FFE6CD] rounded-xl border-2 border-black w-full flex-1 p-4 sm:p-6 md:p-8 mt-4 sm:mt-2">
          {/* Subtitle description */}
          <div className="mb-6 text-center">
            <p className="font-cinzel font-bold text-xs sm:text-sm text-[#8C4A2F]">
              Create, update, and manage all events held by Student Union Informatics.
            </p>
          </div>

          <EventTable events={events} />
        </div>
      </div>
    </div>
  );
}
