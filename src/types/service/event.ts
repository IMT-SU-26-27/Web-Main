import { z } from "zod";
import { FormProps } from "../action";

export type EventStatus = "UPCOMING" | "ONGOING" | "DONE";

export interface Event {
  id: string;
  name: string;
  description: string;
  status: EventStatus;
  imageUrl: string | null;
  imagePublicId: string | null;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface EventData {
  name: string;
  description: string;
  status: EventStatus;
  imageUrl: string | null;
  imagePublicId: string | null;
  startDate: Date;
  endDate: Date;
}

export const EventSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .max(100, "Name must be less than 100 characters"),

    description: z
      .string()
      .min(1, "Description is required")
      .max(10000, "Description must be less than 10000 characters"),

    status: z
      .enum(["UPCOMING", "ONGOING", "DONE"])
      .default("UPCOMING"),

    startDate: z.coerce.date({
      message: "Please provide a valid start date",
    }),

    endDate: z.coerce.date({
      message: "Please provide a valid end date",
    }),

    imageUrl: z
      .string()
      .nullable()
      .optional()
      .transform((val) => val || null),

    imagePublicId: z
      .string()
      .nullable()
      .optional()
      .transform((val) => val || null),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "End date must be after or equal to start date",
    path: ["endDate"],
  });

export type EventInput = z.infer<typeof EventSchema>;

export type EventFormProps = FormProps<Event>;
