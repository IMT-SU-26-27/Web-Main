"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createEvent, updateEvent } from "@/lib/service/event";
import { EventFormProps, EventStatus } from "@/types/service/event";
import { UploadWidget } from "@/components/utils/UploadWidget";

export default function EventForm({ mode, data }: EventFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState<string>("");
  const [status, setStatus] = useState<EventStatus>(data?.status || "UPCOMING");
  const [imageUrl, setImageUrl] = useState<string>(data?.imageUrl || "");
  const [imagePublicId, setImagePublicId] = useState<string>(
    data?.imagePublicId || ""
  );

  const router = useRouter();

  function handleImageUpload(url: string, publicId?: string) {
    setImageUrl(url);
    setImagePublicId(publicId || "");
  }

  // Format Date for datetime-local input (YYYY-MM-DDTHH:mm)
  const formatForInput = (date?: Date) => {
    if (!date) return "";
    const d = new Date(date);
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
      d.getHours()
    )}:${pad(d.getMinutes())}`;
  };

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setErrors([]);
    setSuccess("");

    try {
      formData.set("status", status);

      if (imageUrl) {
        formData.set("imageUrl", imageUrl);
      }
      if (imagePublicId) {
        formData.set("imagePublicId", imagePublicId);
      }

      if (mode === "create") {
        const result = await createEvent(formData);
        if (result.success) {
          setSuccess(result.message || "Event created successfully!");
          setTimeout(() => {
            router.push("/dashboard/tech/events");
          }, 500);
        } else {
          setErrors([result.error || "Failed to create event"]);
        }
      } else if (mode === "edit" && data) {
        const result = await updateEvent(data.id, formData);
        if (result.success) {
          setSuccess(result.message || "Event updated successfully!");
          setTimeout(() => {
            router.push("/dashboard/tech/events");
          }, 500);
        } else {
          setErrors([result.error || "Failed to update event"]);
        }
      }
    } catch (error) {
      setErrors([
        error instanceof Error ? error.message : "An unexpected error occurred",
      ]);
    } finally {
      setIsSubmitting(false);
    }
  }

  const title = mode === "create" ? "CREATE EVENT" : "EDIT EVENT";

  return (
    <div className="relative z-2 bg-[#7E3E11] border-2 border-black rounded-2xl p-4 sm:p-6 md:p-8 w-full flex-1 flex flex-col justify-start items-center shadow-2xl mt-4 select-none">
      {/* Top Centered Wooden Plaque Header */}
      <div className="font-cinzel py-1 sm:py-1.5 md:py-2 px-6 sm:px-10 md:px-14 rounded-lg sm:rounded-xl font-bold text-white border-black text-sm sm:text-lg md:text-2xl lg:text-3xl absolute z-10 -top-4 sm:-top-5 md:-top-6 left-1/2 -translate-x-1/2 bg-[#BF6432] border-2 shadow-md flex items-center justify-center whitespace-nowrap">
        <span className="font-outline-2 sm:font-outline-4 z-1 absolute text-[#7E3E11]">
          {title}
        </span>
        <p className="relative z-2">{title}</p>
      </div>

      {/* Inner Parchment Panel */}
      <div className="flex flex-col z-1 bg-gradient-to-b from-[#FFD7AB] to-[#FFE6CD] rounded-xl border-2 border-black w-full flex-1 p-4 sm:p-6 md:p-8 mt-4 sm:mt-2">
        {/* Back link */}
        <div className="mb-4">
          <Link
            href="/dashboard/tech/events"
            className="inline-flex items-center gap-1.5 font-cinzel font-bold text-xs sm:text-sm text-[#8C4A2F] hover:text-[#541C16] transition-colors"
          >
            ← Back to Events
          </Link>
        </div>

        {/* Success Notification */}
        {success && (
          <div className="mb-5 p-3.5 bg-[#D4EDDA] border-2 border-[#28A745] text-[#155724] rounded-xl font-cinzel font-bold text-xs sm:text-sm text-center">
            {success}
          </div>
        )}

        {/* Error Notification */}
        {errors.length > 0 && (
          <div className="mb-5 p-3.5 bg-[#FADBD8] border-2 border-[#C0392B] text-[#922B21] rounded-xl font-cinzel font-bold text-xs sm:text-sm">
            <ul className="list-disc list-inside space-y-1">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleSubmit(formData);
          }}
          className={`space-y-5 ${
            isSubmitting ? "opacity-60 pointer-events-none" : ""
          }`}
        >
          {/* Name Input */}
          <div>
            <label
              htmlFor="name"
              className="block font-cinzel font-black text-xs sm:text-sm text-[#541C16] uppercase tracking-wide mb-1.5"
            >
              Event Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={data?.name || ""}
              required
              maxLength={100}
              className="w-full px-3.5 py-2.5 bg-[#F5D2A4] border-2 border-black rounded-xl font-cinzel font-bold text-xs sm:text-sm text-[#541C16] focus:outline-none placeholder-[#8C4A2F]/70 shadow-inner"
              placeholder="e.g., Informatics Grand Orientation"
            />
          </div>

          {/* Status Selection */}
          <div>
            <label className="block font-cinzel font-black text-xs sm:text-sm text-[#541C16] uppercase tracking-wide mb-1.5">
              Event Status
            </label>
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
              {[
                { value: "UPCOMING", label: "Upcoming", color: "bg-[#1976D2]" },
                { value: "ONGOING", label: "Ongoing", color: "bg-[#2E7D32]" },
                { value: "DONE", label: "Done", color: "bg-[#7E3E11]" },
              ].map((item) => (
                <label
                  key={item.value}
                  className={`flex items-center justify-center gap-2 p-2.5 sm:p-3 rounded-xl border-2 border-black font-cinzel font-bold text-xs sm:text-sm cursor-pointer transition-all ${
                    status === item.value
                      ? "bg-[#BF6432] text-white shadow-md scale-[1.02]"
                      : "bg-[#F5D2A4] text-[#541C16] hover:bg-[#ffe6cd]"
                  }`}
                >
                  <input
                    type="radio"
                    name="status"
                    value={item.value}
                    checked={status === item.value}
                    onChange={(e) => setStatus(e.target.value as EventStatus)}
                    className="sr-only"
                  />
                  <div
                    className={`w-2.5 h-2.5 rounded-full border border-black ${item.color}`}
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Description Textarea */}
          <div>
            <label
              htmlFor="description"
              className="block font-cinzel font-black text-xs sm:text-sm text-[#541C16] uppercase tracking-wide mb-1.5"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              defaultValue={data?.description || ""}
              required
              rows={4}
              className="w-full px-3.5 py-2.5 bg-[#F5D2A4] border-2 border-black rounded-xl font-cinzel font-bold text-xs sm:text-sm text-[#541C16] focus:outline-none placeholder-[#8C4A2F]/70 shadow-inner resize-vertical"
              placeholder="Provide a detailed overview of the event..."
            />
          </div>

          {/* Date Row (Start & End Date) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="startDate"
                className="block font-cinzel font-black text-xs sm:text-sm text-[#541C16] uppercase tracking-wide mb-1.5"
              >
                Start Date & Time
              </label>
              <input
                type="datetime-local"
                id="startDate"
                name="startDate"
                defaultValue={formatForInput(data?.startDate)}
                required
                className="w-full px-3.5 py-2.5 bg-[#F5D2A4] border-2 border-black rounded-xl font-cinzel font-bold text-xs sm:text-sm text-[#541C16] focus:outline-none shadow-inner"
              />
            </div>

            <div>
              <label
                htmlFor="endDate"
                className="block font-cinzel font-black text-xs sm:text-sm text-[#541C16] uppercase tracking-wide mb-1.5"
              >
                End Date & Time
              </label>
              <input
                type="datetime-local"
                id="endDate"
                name="endDate"
                defaultValue={formatForInput(data?.endDate)}
                required
                className="w-full px-3.5 py-2.5 bg-[#F5D2A4] border-2 border-black rounded-xl font-cinzel font-bold text-xs sm:text-sm text-[#541C16] focus:outline-none shadow-inner"
              />
            </div>
          </div>

          {/* Cover Image Upload */}
          <div>
            <label className="block font-cinzel font-black text-xs sm:text-sm text-[#541C16] uppercase tracking-wide mb-2">
              Event Cover Banner
            </label>
            <div className="space-y-3">
              <UploadWidget
                onUploadSuccess={handleImageUpload}
                folder="events"
                allowedFormats={["png", "jpeg", "jpg", "webp", "heic", "heif"]}
              />
              {imageUrl && (
                <div className="flex items-center gap-4 p-3 bg-[#F5D2A4] border-2 border-black rounded-xl shadow-inner">
                  <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-black relative shrink-0 shadow-sm">
                    <Image
                      src={imageUrl.replace(/\.(heic|heif)$/i, ".webp")}
                      alt="Uploaded event cover"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setImageUrl("");
                      setImagePublicId("");
                    }}
                    className="bg-[#C0392B] hover:bg-[#a93226] text-white px-3 py-1.5 rounded-lg font-cinzel font-bold text-xs border-2 border-black shadow transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    Remove Image
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Submit & Cancel Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-[#BF6432] hover:bg-[#a75427] text-white font-cinzel font-bold py-2.5 px-4 rounded-xl border-2 border-black shadow-md hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-xs sm:text-sm cursor-pointer"
            >
              {isSubmitting
                ? "Saving..."
                : mode === "create"
                ? "Create Event"
                : "Update Event"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/dashboard/tech/events")}
              className="px-6 py-2.5 bg-[#E5C198] hover:bg-[#d6af84] text-[#541C16] font-cinzel font-bold rounded-xl border-2 border-black transition-all text-xs sm:text-sm cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
