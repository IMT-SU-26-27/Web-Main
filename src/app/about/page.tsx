import React from "react";
import Image from "next/image";
import CommunityServicesSection from "@/components/about/CommunityServicesSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about Student Union IMT UC",
};

export default function AboutPage() {
  return (
    <section className="flex flex-col justify-center w-full items-center pt-20 pb-16 md:pt-28 md:pb-24 px-4 sm:px-8 md:px-12 overflow-x-hidden gap-6 sm:gap-10">
      <Image
        src={"/about/about-us-hero.webp"}
        alt="About Us"
        width={1000}
        height={500}
        draggable={false}
        priority
        className="h-auto w-[92%] sm:w-[85%] md:w-[75%] lg:w-[70%] max-w-5xl"
      />
      <CommunityServicesSection />
      <Image
        src={"/about/vision-mission.svg"}
        alt="Vision & Mission"
        width={1000}
        height={600}
        draggable={false}
        className="h-auto w-[92%] sm:w-[85%] md:w-[75%] lg:w-[70%] max-w-5xl"
      />
    </section>
  );
}
