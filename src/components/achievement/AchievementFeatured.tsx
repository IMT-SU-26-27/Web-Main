import React from "react";
import Image from "next/image";
import { getFeaturedAchievements } from "@/lib/service/achievement";
import { Achievement } from "@/types/service/achievement";
import AchievementFeaturedCarousel from "@/components/achievement/AchievementFeaturedCarousel";
import LinkButton from "../LinkButton";
import TLInfoPanelDecorative from "../TLInfoPanelDecorative";

export async function AchievementFeatured() {
  const featuredAchievements: Achievement[] =
    (await getFeaturedAchievements()) ?? [];

  return (
    <section className="bg-gradient-to-b pb-24 -mt-0.5 from-[#4A74D8] to-[#214DB0] min-h-screen w-full flex flex-col justify-center items-center relative z-10">
      <div className="relative z-2 bg-[#7E3E11] border-2 border-black rounded-2xl p-4 md:p-8 w-[95%] sm:w-[90%] md:w-[85%] max-w-6xl flex justify-center items-center shadow-2xl">
        <div className="flex flex-col justify-center items-center z-1 bg-gradient-to-b rounded-xl border-2 border-black from-[#FFD7AB] to-[#FFE6CD] w-full min-h-full p-4 sm:p-6 md:p-8">
          <Image
            alt="achievement text"
            width={300}
            draggable={false}
            height={300}
            src={"/achievements/achievement-text.svg"}
            className="mt-4 sm:mt-2 w-[85%] sm:w-[60%] md:w-[45%] lg:w-[35%] max-w-sm h-auto"
          />
          <h3 className="text-sm sm:text-base md:text-lg lg:text-xl text-center text-[#543737] font-pixelify mt-2 px-2">
            Explore IMT people&apos;s achievements!
          </h3>

          <div className="w-full h-full my-6 sm:my-8 flex justify-center gap-4 items-center">
            <AchievementFeaturedCarousel
              achievements={featuredAchievements}
            />
          </div>
        </div>

        <LinkButton
          size="xl"
          extraClass="absolute -bottom-4 sm:-bottom-5 z-5 shadow-lg"
          href="/achievements"
        >
          see more !
        </LinkButton>
        <TLInfoPanelDecorative>QUEST BOARD</TLInfoPanelDecorative>
      </div>
    </section>
  );
}

export default AchievementFeatured;
