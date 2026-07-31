import { getLatestActivities } from "@/lib/service/activity";
import Image from "next/image";
import PSPHomeDesktop from "@/components/home/PSPHomeDesktop";
import PSPHomeMobile from "@/components/home/PSPHomeMobile";
import ChatBubbleSection from "@/components/home/ChatBubbleSection";
import BigWaves from "@/components/home/BigWaves";
export const metadata = {
  title: "Home - SU IMT",
  description: "Student Union Information and Multimedia Technology - Your Creative Tech Community",
};

export default async function Home() {
  // const latestActivities = await getLatestActivities(3);

  return (
    <div className="overflow-x-hidden w-screen flex justify-center items-center flex-col">
      <section className="relative mt-0 md:mt-[4vh] bg-medium-blue w-full min-h-screen flex justify-center items-center">
        <PSPHomeDesktop />
        <PSPHomeMobile />
        <Image src={"home/lines.svg"} alt="lines" width={100} height={100} className="w-full absolute -bottom-1 xl:-bottom-7"></Image>
      </section>
      <ChatBubbleSection title={`“Hi there, I'm Veno! You might be wondering, what is SU IMT?`} content={`Well, SU IMT (or Student Union Information and Multimedia Technology) is a student-led organization that serves as a platform for students of the Informatics study program to grow professionally, socially, and academically. SU IMT UC organizes various events, workshops, and initiatives to enhance student engagement, develop leadership skills, and support innovation in technology.”`} />
      <BigWaves />
    </div>
  );
}
