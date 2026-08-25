import React from "react";
import BigWaves from "@/components/home/BigWaves";
import { MdEvent } from "react-icons/md";
import TitleDivider from "@/components/TitleDivider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Union Events",
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
        alt: "STUDENT UNION"
      }
    ]
  }
}

export default function EventsPage() {
    return (
      <div className="relative z-4 select-none overflow-hidden flex px-4 sm:px-8 md:px-16 lg:px-24 gap-8 sm:gap-12 flex-col items-center justify-center min-h-[90vh] pt-0 w-full overflow-x-hidden">
        <BigWaves extraClassName="rotate-x-180" />
        <TitleDivider
          title="EVENTS"
          icon={<MdEvent />}
        />
        <BigWaves extraClassName="" />
      </div>
    );
}
