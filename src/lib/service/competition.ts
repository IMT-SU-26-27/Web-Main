"use server";

import prisma from "../prisma";
import { revalidatePath } from "next/cache";
import { ActionResult } from "@/types/action";
import {
  Competition,
  CompetitionData,
  CompetitionSchema,
} from "@/types/service/competition";

export async function getCompetitions(): Promise<Competition[]> {
  return await prisma.competition.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getCompetitionById(
  id: string
): Promise<Competition | null> {
  return await prisma.competition.findUnique({
    where: { id },
  });
}

export async function createCompetition(
  formData: FormData
): Promise<ActionResult<Competition>> {
  try {
    const rawData = {
      name: formData.get("name") as string,
      organizer: formData.get("organizer") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      information: formData.get("information") as string,
      type: formData.get("type") as string,
      level: formData.get("level") as string,
      startDate: formData.get("startDate") as string,
      endDate: formData.get("endDate") as string,
      imageUrl: (formData.get("imageUrl") as string) || null,
      imagePublicId: (formData.get("imagePublicId") as string) || null,
    };

    const validationResult = CompetitionSchema.safeParse(rawData);

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

    const competition = await prisma.competition.create({
      data: validatedData,
    });

    revalidatePath("/dashboard/sa/competitions");
    revalidatePath("/competitions");

    return {
      success: true,
      data: competition,
      message: "Competition created successfully!",
    };
  } catch (error) {
    console.error("Failed to create competition:", error);
    return {
      success: false,
      error: "Failed to create competition",
    };
  }
}

export async function updateCompetition(
  id: string,
  formData: FormData
): Promise<ActionResult<CompetitionData>> {
  try {
    const rawData = {
      name: formData.get("name") as string,
      organizer: formData.get("organizer") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      information: formData.get("information") as string,
      type: formData.get("type") as string,
      level: formData.get("level") as string,
      startDate: formData.get("startDate") as string,
      endDate: formData.get("endDate") as string,
      imageUrl: (formData.get("imageUrl") as string) || null,
      imagePublicId: (formData.get("imagePublicId") as string) || null,
    };

    const validationResult = CompetitionSchema.safeParse(rawData);

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

    const competition = await prisma.competition.update({
      where: { id },
      data: validatedData,
    });

    revalidatePath("/dashboard/sa/competitions");
    revalidatePath("/competitions");

    return {
      success: true,
      data: competition,
      message: "Competition updated successfully!",
    };
  } catch (error) {
    console.error("Failed to update competition:", error);
    return {
      success: false,
      error: "Failed to update competition",
    };
  }
}

export async function deleteCompetition(
  id: string
): Promise<ActionResult<void>> {
  try {
    await prisma.competition.delete({
      where: { id },
    });

    revalidatePath("/dashboard/sa/competitions");
    revalidatePath("/competitions");

    return {
      success: true,
      message: "Competition deleted successfully!",
    };
  } catch (error) {
    console.error("Failed to delete competition:", error);
    return {
      success: false,
      error: "Failed to delete competition",
    };
  }
}
