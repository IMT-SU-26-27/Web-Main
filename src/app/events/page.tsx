import React from "react";
import BigWaves from "@/components/home/BigWaves";
import TitleDivider from "@/components/TitleDivider";
import { Metadata } from "next";
import { getEvents } from "@/lib/service/event";
import EventLandscapeCard from "@/components/events/EventLandscapeCard";

export const metadata: Metadata = {
  title: "Events",
  description: "The list of events held by student union informatics UC 2026/2027",
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),
  openGraph: {
    title: "Student Union Events",
    description: "The list of events held by student union informatics UC 2026/2027",
    images: [
      {
        url: "/logos/su-logo.webp",
        width: 1200,
        height: 630,
        alt: "STUDENT UNION",
      },
    ],
  },
};

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="relative z-4 select-none overflow-hidden flex px-4 sm:px-8 md:px-16 lg:px-24 gap-8 sm:gap-12 flex-col items-center justify-center min-h-[90vh] pt-0 w-full overflow-x-hidden">
      <BigWaves extraClassName="rotate-x-180" />
      <TitleDivider title="EVENTS" />

      {/* Events Glassmorphic Timeline Wrapper */}
      {events.length === 0 ? (
        <div className="text-center py-16 px-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl max-w-lg w-full shadow-xl my-8 z-10">
          <h3 className="text-xl sm:text-2xl font-bold text-white font-cinzel mb-2">
            No Events Yet
          </h3>
          <p className="text-white/80 font-gill text-sm">
            Stay tuned for upcoming events!
          </p>
        </div>
      ) : (
        <div className="relative w-full max-w-5xl flex flex-col gap-10 sm:gap-14 my-8 z-10 pl-8 sm:pl-12 md:pl-14">
          {/* Continuous Absolute Vertical Timeline Spine */}
          <div className="absolute left-2.5 sm:left-4 md:left-5 top-12 bottom-12 w-1 bg-white/40 rounded-full z-0 pointer-events-none" />

          {events.map((event, index) => (
            <EventLandscapeCard
              key={event.id}
              event={event}
              index={index}
            />
          ))}
        </div>
      )}

      <BigWaves extraClassName="" />
    </div>
  );
}
