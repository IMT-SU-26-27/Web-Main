import Image from "next/image";
import HomeHeroDesktop from "@/components/home/HomeHeroDesktop";
import HomeHeroMobile from "@/components/home/HomeHeroMobile";
import ChatBubbleSection from "@/components/home/ChatBubbleSection";
import BigWaves from "@/components/home/BigWaves";
import AchievementFeatured from "@/components/achievement/AchievementFeatured";

export const metadata = {
  title: "Home - SU IMT",
  description: "Student Union Information and Multimedia Technology - Your Creative Tech Community",
};

export default async function Home() {
  // const latestActivities = await getLatestActivities(3);

  return (
    <div className="overflow-x-hidden w-screen flex justify-center items-center flex-col">
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 bg-medium-blue w-full flex flex-col justify-center items-center">
        <HomeHeroDesktop />
        <HomeHeroMobile />
        <Image src={"/home/lines.svg"} alt="lines" width={100} height={100} className="w-full absolute bottom-1 sm:-bottom-3 xl:-bottom-7"></Image>
      </section>
      <ChatBubbleSection title={`“Hi there, I'm Veno! You might be wondering, what is SU IMT?`} content={`Well, SU IMT (or Student Union Information and Multimedia Technology) is a student-led organization that serves as a platform for students of the Informatics study program to grow professionally, socially, and academically. SU IMT UC organizes various events, workshops, and initiatives to enhance student engagement, develop leadership skills, and support innovation in technology.”`} />
      <BigWaves extraClassName=""/>
      <AchievementFeatured></AchievementFeatured>
    </div>
  );
}
