import Link from "next/link";
import { getActivityById } from "@/lib/service/activity";
import { notFound } from "next/navigation";
import Image from "next/image";
import ClientDate from "@/components/utils/ClientDate";
import SkeletonLoader from "@/components/utils/SkeletonLoader";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Activity Details - SA Dashboard",
  description: "View activity details",
};

export default async function ActivityDetailsPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = params.id;
  const activity = await getActivityById(id);

  if (!activity) {
    notFound();
  }

  return (
    <div className="w-full h-full flex-1 flex flex-col p-4 sm:p-6 md:p-8 select-none">
      {/* Outer Wooden Board Frame */}
      <div className="relative z-2 bg-[#7E3E11] border-2 border-black rounded-2xl p-4 sm:p-6 md:p-8 w-full flex-1 flex flex-col justify-start items-center shadow-2xl mt-4">
        {/* Top Centered Wooden Plaque Header */}
        <div className="font-cinzel py-1 sm:py-1.5 md:py-2 px-6 sm:px-10 md:px-14 rounded-lg sm:rounded-xl font-bold text-white border-black text-sm sm:text-lg md:text-2xl lg:text-3xl absolute z-10 -top-4 sm:-top-5 md:-top-6 left-1/2 -translate-x-1/2 bg-[#BF6432] border-2 shadow-md flex items-center justify-center whitespace-nowrap">
          <span className="font-outline-2 sm:font-outline-4 z-1 absolute text-[#7E3E11]">
            ACTIVITY DETAILS
          </span>
          <p className="relative z-2">ACTIVITY DETAILS</p>
        </div>

        {/* Inner Parchment Panel */}
        <div className="flex flex-col z-1 bg-gradient-to-b from-[#FFD7AB] to-[#FFE6CD] rounded-xl border-2 border-black w-full flex-1 p-4 sm:p-6 md:p-8 mt-4 sm:mt-2">
          {/* Back Navigation */}
          <div className="mb-4 flex items-center justify-between">
            <Link
              href="/dashboard/sa/activities"
              className="inline-flex items-center gap-1.5 font-cinzel font-bold text-xs sm:text-sm text-[#8C4A2F] hover:text-[#541C16] transition-colors"
            >
              ← Back to Activities
            </Link>

            <Link
              href={`/dashboard/sa/activities/${activity.id}/edit`}
              className="bg-[#BF6432] hover:bg-[#a75427] text-white px-4 py-1.5 rounded-lg text-xs font-cinzel font-bold border-2 border-black shadow transition-all hover:scale-105 active:scale-95"
            >
              Edit Activity
            </Link>
          </div>

          {/* Details Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-5">
              {activity.imageUrl && (
                <Suspense fallback={<SkeletonLoader />}>
                  <div className="w-full max-h-80 rounded-xl overflow-hidden border-2 border-black relative shadow-inner bg-[#F5D2A4]">
                    <Image
                      src={activity.imageUrl}
                      alt={activity.title}
                      width={800}
                      height={400}
                      className="w-full h-auto max-h-80 object-cover"
                    />
                  </div>
                </Suspense>
              )}

              <div className="bg-[#F5D2A4] border-2 border-black rounded-xl p-5 shadow-inner">
                <h1 className="font-cinzel font-black text-2xl text-[#541C16] mb-2 uppercase">
                  {activity.title}
                </h1>
                <p className="font-cinzel text-xs text-[#8C4A2F] font-bold mb-4">
                  Category: {activity.category} • Location: {activity.location}
                </p>
                <div className="font-cinzel text-xs sm:text-sm text-[#541C16] whitespace-pre-wrap leading-relaxed">
                  {activity.description}
                </div>
              </div>
            </div>

            {/* Sidebar Stats */}
            <div className="space-y-4">
              <div className="bg-[#F5D2A4] border-2 border-black rounded-xl p-5 shadow-inner space-y-3">
                <h3 className="font-cinzel font-black text-sm text-[#541C16] uppercase tracking-wide border-b-2 border-black pb-2">
                  Key Information
                </h3>
                <div className="font-cinzel text-xs text-[#541C16] space-y-2">
                  <div>
                    <span className="font-bold text-[#8C4A2F] block">Credit Points:</span>
                    <span className="font-semibold">{activity.creditPoint} pts</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#8C4A2F] block">Quota:</span>
                    <span className="font-semibold">{activity.quota} participants</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#8C4A2F] block">Start Date:</span>
                    <ClientDate createdAt={activity.startDate.toISOString()} format="full" />
                  </div>
                  <div>
                    <span className="font-bold text-[#8C4A2F] block">Created:</span>
                    <ClientDate createdAt={activity.createdAt.toISOString()} format="full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
