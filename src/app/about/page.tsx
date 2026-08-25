import React from "react";
import CommunityServicesSection from "@/components/about/CommunityServicesSection";
import VisionMissionSection from "@/components/about/VisionMissionSection";
import type { Metadata } from "next";
import BigWaves from "@/components/home/BigWaves";
import TitleDivider from "@/components/TitleDivider";
import { MdInfo } from "react-icons/md";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about Student Union IMT UC",
};

export default function AboutPage() {
  return (
    <div className="relative z-4 select-none overflow-hidden flex px-4 sm:px-8 md:px-16 lg:px-24 gap-8 sm:gap-12 flex-col items-center justify-center min-h-[90vh] pt-0 w-full overflow-x-hidden">
      <BigWaves extraClassName="rotate-x-180" />
      <TitleDivider
        title="ABOUT US"
        icon={<MdInfo />}
      />
      <CommunityServicesSection />
      <VisionMissionSection />
      <BigWaves extraClassName="" />
    </div>
  );
}
