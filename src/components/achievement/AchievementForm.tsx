"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  createAchievement,
  updateAchievement,
} from "@/lib/service/achievement";
import { AchievementFormProps } from "@/types/service/achievement";
import { UploadWidget } from "../utils/UploadWidget";

export default function AchievementForm({
  mode,
  data,
}: AchievementFormProps) {
  /* States */
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>(data?.imageUrl || "");
  const [imagePublicId, setImagePublicId] = useState<string>(
    data?.imagePublicId || ""
  );
  const [featured, setFeatured] = useState<boolean>(data?.featured || false);

  const router = useRouter();

  function handleImageUpload(url: string, publicId?: string) {
    setImageUrl(url);
    setImagePublicId(publicId || "");
  }

  /* Form Submission Handler */
  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setErrors([]);
    setSuccess("");

    try {
      formData.set("featured", String(featured));

      if (imageUrl) {
        formData.set("imageUrl", imageUrl);
      }
      if (imagePublicId) {
        formData.set("imagePublicId", imagePublicId);
      }

      if (mode === "create") {
        const result = await createAchievement(formData);
        if (result.success) {
          setSuccess(result.message || "Achievement created successfully!");
          setTimeout(() => {
            router.push("/dashboard/pr");
          }, 500);
        } else {
          setErrors([result.error || "Failed to create achievement"]);
        }
      } else if (mode === "edit" && data) {
        const result = await updateAchievement(data.id, formData);
        if (result.success) {
          setSuccess(result.message || "Achievement updated successfully!");
          setTimeout(() => {
            router.push("/dashboard/pr");
          }, 500);
        } else {
          setErrors([result.error || "Failed to update achievement"]);
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

  const title =
    mode === "create" ? "CREATE ACHIEVEMENT" : "EDIT ACHIEVEMENT";

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
            href="/dashboard/pr"
            className="inline-flex items-center gap-1.5 font-cinzel font-bold text-xs sm:text-sm text-[#8C4A2F] hover:text-[#541C16] transition-colors"
          >
            ← Back to Achievements
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

        {/* Achievement Form */}
        <form
          id="achievement-form"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleSubmit(formData);
          }}
          className={`space-y-5 ${
            isSubmitting ? "opacity-60 pointer-events-none" : ""
          }`}
        >
          {/* Row 1: Title & Team Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="title"
                className="block font-cinzel font-black text-xs sm:text-sm text-[#541C16] uppercase tracking-wide mb-1.5"
              >
                Achievement Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                defaultValue={data?.title || ""}
                required
                maxLength={100}
                className="w-full px-3.5 py-2.5 bg-[#F5D2A4] border-2 border-black rounded-xl font-cinzel font-bold text-xs sm:text-sm text-[#541C16] focus:outline-none placeholder-[#8C4A2F]/70 shadow-inner"
                placeholder="e.g., 1st Place National Hackathon"
              />
            </div>

            <div>
              <label
                htmlFor="teamInfo"
                className="block font-cinzel font-black text-xs sm:text-sm text-[#541C16] uppercase tracking-wide mb-1.5"
              >
                Team Info / Members
              </label>
              <input
                type="text"
                id="teamInfo"
                name="teamInfo"
                defaultValue={data?.teamInfo || ""}
                required
                maxLength={100}
                className="w-full px-3.5 py-2.5 bg-[#F5D2A4] border-2 border-black rounded-xl font-cinzel font-bold text-xs sm:text-sm text-[#541C16] focus:outline-none placeholder-[#8C4A2F]/70 shadow-inner"
                placeholder="e.g., Team Alpha (Bryan, Sarah, Alex)"
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
              placeholder="Detailed summary of the achievement and competition context..."
            />
          </div>

          {/* Featured Toggle */}
          <div className="bg-[#F5D2A4] border-2 border-black rounded-xl p-3.5 sm:p-4 shadow-inner flex items-center justify-between">
            <div>
              <span className="font-cinzel font-black text-xs sm:text-sm text-[#541C16] block uppercase tracking-wide">
                Featured Achievement
              </span>
              <span className="font-cinzel text-xs text-[#8C4A2F] block mt-0.5">
                Highlight this achievement on the public homepage quest board
              </span>
            </div>
            <button
              type="button"
              onClick={() => setFeatured((prev) => !prev)}
              className={`w-14 h-8 flex items-center rounded-full p-1 border-2 border-black transition-colors cursor-pointer ${
                featured ? "bg-[#2E7D32]" : "bg-[#C8B6A6]"
              }`}
            >
              <div
                className={`bg-white w-5 h-5 rounded-full border border-black shadow-md transform transition-transform ${
                  featured ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Cover Image Input */}
          <div>
            <label className="block font-cinzel font-black text-xs sm:text-sm text-[#541C16] uppercase tracking-wide mb-2">
              Achievement Image / Certificate
            </label>
            <div className="space-y-3">
              <UploadWidget
                onUploadSuccess={handleImageUpload}
                folder="achievements"
                allowedFormats={["png", "jpeg", "jpg", "webp"]}
              />
              {imageUrl && (
                <div className="flex items-center gap-4 p-3 bg-[#F5D2A4] border-2 border-black rounded-xl shadow-inner">
                  <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-black relative shrink-0 shadow-sm">
                    <Image
                      src={imageUrl}
                      alt="Uploaded achievement cover"
                      fill
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
                ? "Create Achievement"
                : "Update Achievement"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/dashboard/pr")}
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
