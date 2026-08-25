import { Category } from "@prisma/client";
import { getActivities } from "@/lib/service/activity";
import ClientPageActivities from "@/components/activity/ClientPage";
import BigWaves from "@/components/home/BigWaves";
import TitleDivider from "@/components/TitleDivider";
import { MdLocalActivity } from "react-icons/md";

export const metadata = {
  title: "Activities",
};

export default async function ActivityPage() {
  const activities = await getActivities();
  const categories = Object.values(Category);

  return (
    <div className="overflow-x-hidden relative z-4 select-none overflow-hidden flex px-4 sm:px-8 md:px-16 lg:px-24 gap-8 sm:gap-12 flex-col items-center justify-center min-h-[90vh] pt-0 w-full">
      <BigWaves extraClassName="rotate-x-180" />
      <TitleDivider
        title="ACTIVITIES"
        icon={<MdLocalActivity />}
      />
      <ClientPageActivities activities={activities} categories={categories} />
      <BigWaves extraClassName="" />
    </div>
  );
}
