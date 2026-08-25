"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createActivity, updateActivity } from "@/lib/service/activity";
import { ActivityFormProps } from "@/types/service/activity";
import { UploadWidget } from "../utils/UploadWidget";
import { Category } from "@prisma/client";

export default function ActivityForm({
  mode,
  data,
  categories,
}: ActivityFormProps) {
  /* States */
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    data?.category || Category.ACTIVITY
  );
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

  /* Form Submission Handler */
  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setErrors([]);
    setSuccess("");

    try {
      formData.set("category", selectedCategory);

      if (imageUrl) {
        formData.set("imageUrl", imageUrl);
      }
      if (imagePublicId) {
        formData.set("imagePublicId", imagePublicId);
      }

      if (mode === "create") {
        const result = await createActivity(formData);
        if (result.success) {
          setSuccess(result.message || "Activity created successfully!");
          setTimeout(() => {
            router.push("/dashboard/sa/activities");
          }, 500);
        } else {
          setErrors([result.error || "Failed to create activity"]);
        }
      } else if (mode === "edit" && data) {
        const result = await updateActivity(data.id, formData);
        if (result.success) {
          setSuccess(result.message || "Activity updated successfully!");
          setTimeout(() => {
            router.push("/dashboard/sa/activities");
          }, 500);
        } else {
          setErrors([result.error || "Failed to update activity"]);
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

  const title = mode === "create" ? "CREATE ACTIVITY" : "EDIT ACTIVITY";

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
            href="/dashboard/sa/activities"
            className="inline-flex items-center gap-1.5 font-cinzel font-bold text-xs sm:text-sm text-[#8C4A2F] hover:text-[#541C16] transition-colors"
          >
            ← Back to Activities
          </Link>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-5 p-3.5 bg-[#D4EDDA] border-2 border-[#28A745] text-[#155724] rounded-xl font-cinzel font-bold text-xs sm:text-sm text-center">
            {success}
          </div>
        )}

        {/* Error Message */}
        {errors.length > 0 && (
          <div className="mb-5 p-3.5 bg-[#FADBD8] border-2 border-[#C0392B] text-[#922B21] rounded-xl font-cinzel font-bold text-xs sm:text-sm">
            <ul className="list-disc list-inside space-y-1">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Activity Form */}
        <form
          id="activity-form"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleSubmit(formData);
          }}
          className={`space-y-5 ${
            isSubmitting ? "opacity-60 pointer-events-none" : ""
          }`}
        >
          {/* Row 1: Title & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="title"
                className="block font-cinzel font-black text-xs sm:text-sm text-[#541C16] uppercase tracking-wide mb-1.5"
              >
                Activity Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                defaultValue={data?.title || ""}
                required
                maxLength={100}
                className="w-full px-3.5 py-2.5 bg-[#F5D2A4] border-2 border-black rounded-xl font-cinzel font-bold text-xs sm:text-sm text-[#541C16] focus:outline-none placeholder-[#8C4A2F]/70 shadow-inner"
                placeholder="e.g., Programming Workshop"
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="block font-cinzel font-black text-xs sm:text-sm text-[#541C16] uppercase tracking-wide mb-1.5"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                defaultValue={data?.location || ""}
                required
                maxLength={100}
                className="w-full px-3.5 py-2.5 bg-[#F5D2A4] border-2 border-black rounded-xl font-cinzel font-bold text-xs sm:text-sm text-[#541C16] focus:outline-none placeholder-[#8C4A2F]/70 shadow-inner"
                placeholder="e.g., Computer Lab A - Building 2"
              />
            </div>
          </div>

          {/* Row 2: Category, Generation, Start Date */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-cinzel font-black text-xs sm:text-sm text-[#541C16] uppercase tracking-wide mb-1.5">
                Category
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[Category.ACTIVITY, Category.RESEARCH].map((cat) => (
                  <label
                    key={cat}
                    className={`flex items-center justify-center p-2.5 rounded-xl border-2 border-black font-cinzel font-bold text-xs cursor-pointer transition-all ${
                      selectedCategory === cat
                        ? "bg-[#BF6432] text-white shadow-md scale-[1.02]"
                        : "bg-[#F5D2A4] text-[#541C16] hover:bg-[#ffe6cd]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="cat_radio"
                      value={cat}
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                      className="sr-only"
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="generation"
                className="block font-cinzel font-black text-xs sm:text-sm text-[#541C16] uppercase tracking-wide mb-1.5"
              >
                Generation (Year)
              </label>
              <input
                type="text"
                id="generation"
                name="generation"
                defaultValue={data?.generation || ""}
                maxLength={20}
                className="w-full px-3.5 py-2.5 bg-[#F5D2A4] border-2 border-black rounded-xl font-cinzel font-bold text-xs sm:text-sm text-[#541C16] focus:outline-none placeholder-[#8C4A2F]/70 shadow-inner"
                placeholder="e.g., 2025"
              />
            </div>

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
          </div>

          {/* Row 3: Credit Points & Quota */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="creditPoint"
                className="block font-cinzel font-black text-xs sm:text-sm text-[#541C16] uppercase tracking-wide mb-1.5"
              >
                Credit Point (1-10)
              </label>
              <input
                type="number"
                id="creditPoint"
                name="creditPoint"
                defaultValue={data?.creditPoint || 1}
                required
                min={1}
                max={10}
                className="w-full px-3.5 py-2.5 bg-[#F5D2A4] border-2 border-black rounded-xl font-cinzel font-bold text-xs sm:text-sm text-[#541C16] focus:outline-none shadow-inner"
                placeholder="1"
              />
            </div>

            <div>
              <label
                htmlFor="quota"
                className="block font-cinzel font-black text-xs sm:text-sm text-[#541C16] uppercase tracking-wide mb-1.5"
              >
                Participant Quota
              </label>
              <input
                type="number"
                id="quota"
                name="quota"
                defaultValue={data?.quota || 30}
                required
                min={1}
                max={1000}
                className="w-full px-3.5 py-2.5 bg-[#F5D2A4] border-2 border-black rounded-xl font-cinzel font-bold text-xs sm:text-sm text-[#541C16] focus:outline-none shadow-inner"
                placeholder="30"
              />
            </div>
          </div>

          {/* Description Input */}
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
              placeholder="Overview and schedule of the activity..."
            />
          </div>

          {/* Cover Image Input */}
          <div>
            <label className="block font-cinzel font-black text-xs sm:text-sm text-[#541C16] uppercase tracking-wide mb-2">
              Activity Cover Banner
            </label>
            <div className="space-y-3">
              <UploadWidget
                onUploadSuccess={handleImageUpload}
                folder="activities"
                allowedFormats={["png", "jpeg", "jpg", "webp", "heic", "heif"]}
              />
              {imageUrl && (
                <div className="flex items-center gap-4 p-3 bg-[#F5D2A4] border-2 border-black rounded-xl shadow-inner">
                  <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-black relative shrink-0 shadow-sm">
                    <Image
                      src={imageUrl.replace(/\.(heic|heif)$/i, ".webp")}
                      alt="Uploaded cover"
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
                ? "Create Activity"
                : "Update Activity"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/dashboard/sa/activities")}
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
