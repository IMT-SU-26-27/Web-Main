"use server";

import prisma from "../prisma";
import { revalidatePath } from "next/cache";
import { ActionResult } from "@/types/action";
import { Activity, ActivityData, ActivitySchema } from "@/types/service/activity";
import { Category } from "@prisma/client";

export async function getActivities(): Promise<Activity[]> {
  try {
    return await prisma.activity.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.warn("DB connection failed. Returning mock activities.");
    return [];
  }
}

export async function getLatestActivities(limit: number = 3): Promise<Activity[]> {
  try {
    return await prisma.activity.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  } catch (error) {
    console.warn("DB connection failed. Returning mock latest activities.");
    return [];
  }
}

export async function getActivityById(id: string): Promise<Activity | null> {
  try {
    return await prisma.activity.findUnique({
      where: { id },
    });
  } catch (error) {
    console.warn("DB connection failed. Returning mock activity.");
    return null;
  }
}

export async function createActivity(
  formData: FormData
): Promise<ActionResult<Activity>> {
  try {
    const startDateString = formData.get("startDate") as string;
    // datetime-local provides "YYYY-MM-DDTHH:mm" which should be treated as local time
    // We need to ensure it's parsed correctly for the local timezone
    const startDate = new Date(startDateString);
    
    const rawData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      location: formData.get("location") as string,
      startDate: startDate,
      creditPoint: parseInt(formData.get("creditPoint") as string, 10) || 0,
      quota: parseInt(formData.get("quota") as string, 10) || 0,
      imageUrl: formData.get("imageUrl") as string,
      imagePublicId: formData.get("imagePublicId") as string,
      category: formData.get("category") as Category,
    };

    const validationResult = ActivitySchema.safeParse(rawData);

    if (!validationResult.success) {
      const errors = validationResult.error.issues
        .map((err) => `${err.path.join(".")}: ${err.message}`)
        .join(", ");
      return {
        success: false,
        error: `Validation failed: ${errors}`,
      };
    }

    const validatedData = validationResult.data;

    const activity = await prisma.activity.create({
      data: validatedData,
    });

    revalidatePath("/dashboard/sa/activities");
    revalidatePath("/activities");

    return {
      success: true,
      data: activity,
      message: "Activity created successfully!",
    };
  } catch (error) {
    console.error("Failed to create activity:", error);
    return {
      success: false,
      error: "Failed to create activity. Please try again.",
    };
  }
}

export async function updateActivity(
  id: string,
  formData: FormData
): Promise<ActionResult<ActivityData>> {
  try {
    const startDateString = formData.get("startDate") as string;
    // datetime-local provides "YYYY-MM-DDTHH:mm" which should be treated as local time
    // We need to ensure it's parsed correctly for the local timezone
    const startDate = new Date(startDateString);
    
    const rawData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      location: formData.get("location") as string,
      startDate: startDate,
      creditPoint: parseInt(formData.get("creditPoint") as string, 10) || 0,
      quota: parseInt(formData.get("quota") as string, 10) || 0,
      imageUrl: formData.get("imageUrl") as string,
      imagePublicId: formData.get("imagePublicId") as string,
      category: formData.get("category") as Category,
    };

    const validationResult = ActivitySchema.safeParse(rawData);

    if (!validationResult.success) {
      const errors = validationResult.error.issues
        .map((err) => `${err.path.join(".")}: ${err.message}`)
        .join(", ");
      return {
        success: false,
        error: `Validation failed: ${errors}`,
      };
    }

    const validatedData = validationResult.data;

    const activity = await prisma.activity.update({
      where: { id },
      data: validatedData,
    });

    revalidatePath("/dashboard/sa/activities");
    revalidatePath("/activities");

    return {
      success: true,
      data: activity,
      message: "Activity updated successfully!",
    };
  } catch (error) {
    console.error("Failed to edit activity:", error);
    return {
      success: false,
      error: "Failed to edit activity. Please try again.",
    };
  }
}

export async function deleteActivity(id: string) {
  try {
    await prisma.activity.delete({
      where: { id },
    });

    revalidatePath("/dashboard/sa/activities");
    revalidatePath("/activities");

    return {
      success: true,
      message: "Activity deleted successfully!",
    };
  } catch (error) {
    console.error("Failed to delete activity:", error);
    throw new Error("Failed to delete activity. Please try again.");
  }
}

export async function getApprovedApplicationsCount(activityId: string): Promise<number> {
  try {
    const count = await prisma.application.count({
      where: {
        activityId: activityId,
        status: "APPROVED",
      },
    });
    return count;
  } catch (error) {
    console.error("Failed to get approved applications count:", error);
    return 0;
  }
}
