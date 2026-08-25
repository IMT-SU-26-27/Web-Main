import React from "react";
import { getCompetitions } from "@/lib/service/competition";
import CompetitionsSearch from "@/components/competition/CompetitionsSearch";
import TitleDivider from "@/components/TitleDivider";
import { MdEmojiEvents } from "react-icons/md";
import BigWaves from "@/components/home/BigWaves";

export const metadata = {
  title: "Competitions",
};

export default async function CompetitionsPage() {
  const competitions = await getCompetitions();

  return (
    <div className="relative z-4 select-none overflow-hidden flex px-4 sm:px-8 md:px-16 lg:px-24 gap-8 sm:gap-12 flex-col items-center justify-center min-h-[90vh] pt-0 w-full overflow-x-hidden">
      <BigWaves extraClassName="rotate-x-180" />
      <TitleDivider
        title="COMPETITIONS"
        icon={<MdEmojiEvents />}
      />
      <CompetitionsSearch competitions={competitions} />
      <BigWaves extraClassName="" />
    </div>
  );
}
