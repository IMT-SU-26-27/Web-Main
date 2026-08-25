import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getUserById } from "@/lib/service/user";
import { getActivityById } from "@/lib/service/activity";
import { getCompetitionById } from "@/lib/service/competition";
import { 
  getUserActivityApplications, 
  getUserCompetitionApplications 
} from "@/lib/service/application";
import StudentDashboardClient from "@/components/dashboard/StudentDashboard";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Dashboard",
  description: "View and manage your SU activity and competition applications.",
};

export default async function StudentDashboard() {
  const session = await getServerSession(authOptions);

  /* Session Validation */
  if (!session?.user?.id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F1EEE6]">
        <div className="text-center">
          <p className="text-xl text-red-600 mb-4">User session not found.</p>
          <p className="text-gray-600">
            Please sign in to access your dashboard.
          </p>
        </div>
      </div>
    );
  }

  /* Data Fetching */
  const [activityApplications, competitionApplications, userInfo] = await Promise.all([
    getUserActivityApplications(session.user.id),
    getUserCompetitionApplications(session.user.id),
    getUserById(session.user.id),
  ]);

  if (!userInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F1EEE6]">
        <div className="text-center">
          <p className="text-xl text-red-600 mb-4">User information not found.</p>
          <p className="text-gray-600">
            Please contact support if this issue persists.
          </p>
        </div>
      </div>
    );
  }

  
  const [activities, competitions] = await Promise.all([
    Promise.all(
      activityApplications.map((app) => getActivityById(app.activityId!))
    ),
    Promise.all(
      competitionApplications.map((app) => getCompetitionById(app.competitionId!))
    ),
  ]);
  
  if (!activities && !competitions) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F1EEE6]">
        <div className="text-center">
          <p className="text-xl text-red-600 mb-4">Activities not found.</p>
          <p className="text-gray-600">
            There are no activities associated with your applications.
          </p>
        </div>
      </div>
    );
  }

  // Combine all applications for overall stats
  const allApplications = [...activityApplications, ...competitionApplications];
  
  const stats = {
    total: allApplications.length,
    approved: allApplications.filter((app) => app.status === "APPROVED").length,
    pending: allApplications.filter((app) => app.status === "PENDING").length,
    rejected: allApplications.filter((app) => app.status === "REJECTED").length,
  };

  // Activity-specific stats
  const activityStats = {
    total: activityApplications.length,
    approved: activityApplications.filter((app) => app.status === "APPROVED").length,
    pending: activityApplications.filter((app) => app.status === "PENDING").length,
    rejected: activityApplications.filter((app) => app.status === "REJECTED").length,
  };

  // Competition-specific stats
  const competitionStats = {
    total: competitionApplications.length,
    approved: competitionApplications.filter((app) => app.status === "APPROVED").length,
    pending: competitionApplications.filter((app) => app.status === "PENDING").length,
    rejected: competitionApplications.filter((app) => app.status === "REJECTED").length,
  };

  return (
    <StudentDashboardClient
      userInfo={userInfo}
      activityApplications={activityApplications}
      competitionApplications={competitionApplications}
      activities={activities.filter((activity): activity is NonNullable<typeof activity> => activity !== null)}
      competitions={competitions.filter((competition): competition is NonNullable<typeof competition> => competition !== null)}
      stats={stats}
      activityStats={activityStats}
      competitionStats={competitionStats}
    />
  );
}
