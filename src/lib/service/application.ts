"use server";

import prisma from "../prisma";
import { Status } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { ActionResult } from "@/types/action";
import {
  Application,
  ApplicationSchema,
  ApplicationWithDetails,
} from "@/types/service/application";
import { getUserById } from "./user";

export async function getApplications(): Promise<Application[]> {
  return await prisma.application.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getApplicationsWithDetails(): Promise<
  ApplicationWithDetails[]
> {
  const applications = await prisma.application.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phoneNumber: true,
          nim: true,
        },
      },
      activity: {
        select: {
          id: true,
          title: true,
          quota: true,
        },
      },
      competition: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  // Transform the data to match ApplicationWithDetails interface
  return applications.map((app) => ({
    id: app.id,
    status: app.status,
    createdAt: app.createdAt,
    updatedAt: app.updatedAt,
    user: app.user,
    activity: app.activity,
    competition: app.competition,
    title: app.user.name || `User ${app.user.id}`, // Required by SearchableItem
    name: app.user.name || undefined, // Optional fallback
  }));
}

export async function getApplicationsByUserId(
  userId: string,
): Promise<Application[]> {
  return await prisma.application.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function getUserActivityApplications(
  userId: string,
): Promise<Application[]> {
  return await prisma.application.findMany({
    where: {
      userId,
      activityId: { not: null },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getUserCompetitionApplications(
  userId: string,
): Promise<Application[]> {
  return await prisma.application.findMany({
    where: {
      userId,
      competitionId: { not: null },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getApplicationsByActivityId(
  activityId: string,
): Promise<Application[]> {
  return await prisma.application.findMany({
    where: { activityId },
    orderBy: { createdAt: "desc" },
  });
}

export async function getStatusApplication(
  activityId: string,
  userId: string,
): Promise<string | undefined> {
  const applications = await getApplicationsByActivityId(activityId);
  const userApplications = applications.find((app) => app.userId === userId);
  return userApplications?.status || undefined;
}

export async function setStatusApplication(
  id: string,
  status: Status,
): Promise<ActionResult<Application>> {
  try {
    const application = await prisma.application.update({
      where: { id },
      data: { status },
    });

    revalidatePath("/dashboard/sa");
    revalidatePath("/activities");

    return {
      success: true,
      data: application,
      message: "Application status updated successfully!",
    };
  } catch (error) {
    console.error("Error updating application status:", error);
    return {
      success: false,
      error: "An error occurred while updating the application status.",
    };
  }
}

export async function getAmountApprovedApplication(activityId: string) {
  const applications = await getApplicationsByActivityId(activityId);
  const approvedApplications = applications.filter(
    (app) => app.status === "APPROVED",
  );
  return approvedApplications.length;
}

export async function createApplication(
  userId: string,
  activityId: string,
): Promise<ActionResult<Application>> {
  try {
    const user = await getUserById(userId);
    const existingApplications = await getApplicationsByUserId(userId);
    const alreadyApplied = existingApplications.some(
      (app) => app.activityId === activityId,
    );

    if (!user) {
      return {
        success: false,
        error: "User not found.",
      };
    }

    if (!user.nim || !user.phoneNumber) {
      return {
        success: false,
        error: "Please fill your NIM and Phone Number in your dashboard.",
      };
    }

    if (alreadyApplied) {
      return {
        success: false,
        error: "You have already applied for this activity.",
      };
    }

    const rawData = {
      userId,
      activityId,
      status: "PENDING" as const,
    };

    const validationResult = ApplicationSchema.safeParse(rawData);

    if (!validationResult.success) {
      const errors = validationResult.error.issues
        .map((err) => `${err.path.join(".")}: ${err.message}`)
        .join(", ");
      return {
        success: false,
        error: `${errors}`,
      };
    }

    const validatedData = validationResult.data;

    const application = await prisma.application.create({
      data: {
        userId: validatedData.userId,
        activityId: validatedData.activityId,
        status: validatedData.status as Status,
      },
    });

    revalidatePath("/dashboard/sa");
    revalidatePath("/activities");

    return {
      success: true,
      data: application,
      message: "Application submitted successfully!",
    };
  } catch (error) {
    console.error("Error creating application:", error);
    return {
      success: false,
      error: "An error occurred while submitting your application.",
    };
  }
}

export async function deleteApplication(
  id: string,
): Promise<ActionResult<Application>> {
  try {
    const application = await prisma.application.delete({
      where: { id },
    });

    revalidatePath("/dashboard/sa");
    revalidatePath("/activities");

    return {
      success: true,
      data: application,
      message: "Application deleted successfully!",
    };
  } catch (error) {
    console.error("Error deleting application:", error);
    return {
      success: false,
      error: "An error occurred while deleting the application.",
    };
  }
}
