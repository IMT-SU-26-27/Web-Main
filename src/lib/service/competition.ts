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
  try {
    return await prisma.competition.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.warn("Database connection failed. Returning mock competitions for UI testing.");
    return [
      {
        id: "1",
        name: "Hackfest 2026",
        organizer: "Student Union",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        category: "Technology",
        information: "Test info",
        imageUrl: "/competitions/competition-detail/duck.webp",
        imagePublicId: null,
        type: "GROUP" as any,
        level: "NATIONAL" as any,
        startDate: new Date(),
        endDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];
  }
}

export async function getCompetitionById(
  id: string
): Promise<Competition | null> {
  try {
    return await prisma.competition.findUnique({
      where: { id },
    });
  } catch (error) {
    console.warn(`Database connection failed. Returning mock competition for ID ${id}.`);
    return {
      id: "1",
      name: "Hackfest 2026",
      organizer: "Student Union",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      category: "Technology",
      information: "Test info",
      imageUrl: "/competitions/competition-detail/duck.webp",
      imagePublicId: null,
      type: "GROUP" as any,
      level: "NATIONAL" as any,
      startDate: new Date(),
      endDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}

export async function createCompetition(
  formData: FormData
): Promise<ActionResult<Competition>> {
  try {
    const rawData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      imageUrl: formData.get("imageUrl") as string,
      imagePublicId: formData.get("imagePublicId") as string,
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
      description: formData.get("description") as string,
      imageUrl: formData.get("imageUrl") as string,
      imagePublicId: formData.get("imagePublicId") as string,
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
      error: "Failed to delete competition. Please try again.",
    };
  }
}
