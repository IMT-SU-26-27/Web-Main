import React from "react";
import Image from "next/image";
import LinkButton from "../LinkButton";
import TLInfoPanelDecorative from "../TLInfoPanelDecorative";

export default function CommunityServicesSection() {
  return (
    <section className="py-8 sm:py-12 md:py-16 w-full flex flex-col justify-center items-center relative z-10">
      <div className="relative z-2 bg-[#7E3E11] border-2 border-black rounded-2xl p-3 sm:p-6 md:p-8 w-[95%] sm:w-[90%] md:w-[85%] max-w-6xl flex justify-center items-center">
        <div className="flex flex-col justify-center items-center z-1 bg-gradient-to-b rounded-xl border-2 border-black from-[#FFD7AB] to-[#FFE6CD] w-full p-4 sm:p-6 md:p-8">
          <Image
            alt="community service text"
            width={400}
            height={100}
            draggable={false}
            src={"/about/community-serice-text.svg"}
            className="mt-4 sm:mt-2 w-[85%] sm:w-[60%] md:w-[45%] lg:w-[35%] max-w-sm h-auto"
          />
          <h3 className="text-sm sm:text-base md:text-lg lg:text-xl text-center text-[#543737] w-full font-pixelify mt-2 px-2">
            Serve your community & earn credit points!
          </h3>

          <div className="w-full flex md:flex-row items-center justify-between gap-6 my-4 px-2">
            <div className="w-full text-left font-gill text-sm sm:text-base md:text-lg lg:text-xl text-[#543737] leading-relaxed">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur et aspernatur aliquam, quis impedit ea quasi perferendis doloremque repellat, exercitationem nam accusamus? Aperiam mollitia impedit minus repellendus, alias sapiente. Perspiciatis beatae eligendi accusamus assumenda deserunt commodi, fugit nihil unde porro.
            </div>
            <div className="hidden sm:flex w-full md:w-[35%] justify-end items-center">
              <Image
                src={"/about/community-service-duck.svg"}
                alt="duck"
                width={300}
                height={300}
                className="z-4 w-36 sm:w-48 md:w-56 lg:w-64 h-auto"
                draggable={false}
              />
            </div>
          </div>
        </div>

        <LinkButton
          size="xl"
          extraClass="absolute -bottom-4 sm:-bottom-5 z-5 shadow-lg"
          href="/achievements"
        >
          see more !
        </LinkButton>
        <TLInfoPanelDecorative>NOTICE BOARD!!</TLInfoPanelDecorative>
      </div>
    </section>
  );
}
