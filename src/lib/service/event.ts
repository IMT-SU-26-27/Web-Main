"use server";

import prisma from "../prisma";
import { revalidatePath } from "next/cache";
import { ActionResult } from "@/types/action";
import { Event, EventData, EventSchema } from "@/types/service/event";

export async function getEvents(): Promise<Event[]> {
  return await prisma.event.findMany({
    orderBy: { startDate: "asc" },
  });
}

export async function getUpcomingEvents(): Promise<Event[]> {
  return await prisma.event.findMany({
    where: {
      status: {
        in: ["UPCOMING", "ONGOING"],
      },
    },
    orderBy: { startDate: "asc" },
  });
}

export async function getEventById(id: string): Promise<Event | null> {
  return await prisma.event.findUnique({
    where: { id },
  });
}

export async function createEvent(
  formData: FormData
): Promise<ActionResult<Event>> {
  try {
    const rawData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      status: (formData.get("status") as string) || "UPCOMING",
      startDate: formData.get("startDate") as string,
      endDate: formData.get("endDate") as string,
      imageUrl: (formData.get("imageUrl") as string) || null,
      imagePublicId: (formData.get("imagePublicId") as string) || null,
    };

    const validationResult = EventSchema.safeParse(rawData);

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

    const event = await prisma.event.create({
      data: validatedData,
    });

    revalidatePath("/events");
    revalidatePath("/dashboard/tech/events");

    return {
      success: true,
      data: event,
      message: "Event created successfully!",
    };
  } catch (error) {
    console.error("Failed to create event:", error);
    return {
      success: false,
      error: "Failed to create event",
    };
  }
}

export async function updateEvent(
  id: string,
  formData: FormData
): Promise<ActionResult<EventData>> {
  try {
    const rawData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      status: (formData.get("status") as string) || "UPCOMING",
      startDate: formData.get("startDate") as string,
      endDate: formData.get("endDate") as string,
      imageUrl: (formData.get("imageUrl") as string) || null,
      imagePublicId: (formData.get("imagePublicId") as string) || null,
    };

    const validationResult = EventSchema.safeParse(rawData);

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

    const event = await prisma.event.update({
      where: { id },
      data: validatedData,
    });

    revalidatePath("/events");
    revalidatePath("/dashboard/tech/events");

    return {
      success: true,
      data: event,
      message: "Event updated successfully!",
    };
  } catch (error) {
    console.error("Failed to update event:", error);
    return {
      success: false,
      error: "Failed to update event",
    };
  }
}

export async function deleteEvent(id: string): Promise<ActionResult<void>> {
  try {
    await prisma.event.delete({
      where: { id },
    });

    revalidatePath("/events");
    revalidatePath("/dashboard/tech/events");

    return {
      success: true,
      message: "Event deleted successfully!",
    };
  } catch (error) {
    console.error("Failed to delete event:", error);
    return {
      success: false,
      error: "Failed to delete event. Please try again.",
    };
  }
}
