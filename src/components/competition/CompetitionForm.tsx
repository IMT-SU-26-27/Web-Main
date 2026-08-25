"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createCompetition, updateCompetition } from "@/lib/service/competition";
import { CompetitionFormProps } from "@/types/service/competition";
import { Type, Level } from "@prisma/client";
import { UploadWidget } from "../utils/UploadWidget";

export default function CompetitionForm({ mode, data }: CompetitionFormProps) {
  /* States */
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState<string>("");
  const [type, setType] = useState<Type>(data?.type || Type.INDIVIDUAL);
  const [level, setLevel] = useState<Level>(data?.level || Level.NATIONAL);
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
      formData.set("type", type);
      formData.set("level", level);

      if (imageUrl) {
        formData.set("imageUrl", imageUrl);
      }
      if (imagePublicId) {
        formData.set("imagePublicId", imagePublicId);
      }

      if (mode === "create") {
        const result = await createCompetition(formData);
        if (result.success) {
          setSuccess(result.message || "Competition created successfully!");
          setTimeout(() => {
            router.push("/dashboard/sa/competitions");
          }, 500);
        } else {
          setErrors([result.error || "Failed to create competition"]);
        }
      } else if (mode === "edit" && data) {
        const result = await updateCompetition(data.id, formData);
        if (result.success) {
          setSuccess(result.message || "Competition updated successfully!");
          setTimeout(() => {
            router.push("/dashboard/sa/competitions");
          }, 500);
        } else {
          setErrors([result.error || "Failed to update competition"]);
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

  const title = mode === "create" ? "CREATE COMPETITION" : "EDIT COMPETITION";

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
            href="/dashboard/sa/competitions"
            className="inline-flex items-center gap-1.5 font-cinzel font-bold text-xs sm:text-sm text-[#8C4A2F] hover:text-[#541C16] transition-colors"
          >
            ← Back to Competitions
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

        {/* Competition Form */}
        <form
          id="competition-form"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleSubmit(formData);
          }}
          className={`space-y-5 ${
            isSubmitting ? "opacity-60 pointer-events-none" : ""
          }`}
        >
          {/* Row 1: Name & Organizer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block font-cinzel font-black text-xs sm:text-sm text-[#541C16] uppercase tracking-wide mb-1.5"
              >
                Competition Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={data?.name || ""}
                required
                maxLength={100}
                className="w-full px-3.5 py-2.5 bg-[#F5D2A4] border-2 border-black rounded-xl font-cinzel font-bold text-xs sm:text-sm text-[#541C16] focus:outline-none placeholder-[#8C4A2F]/70 shadow-inner"
                placeholder="e.g., Code Challenge 2025"
              />
            </div>

            <div>
              <label
                htmlFor="organizer"
                className="block font-cinzel font-black text-xs sm:text-sm text-[#541C16] uppercase tracking-wide mb-1.5"
              >
                Organizer
              </label>
              <input
                type="text"
                id="organizer"
                name="organizer"
                defaultValue={data?.organizer || ""}
                required
                maxLength={100}
                className="w-full px-3.5 py-2.5 bg-[#F5D2A4] border-2 border-black rounded-xl font-cinzel font-bold text-xs sm:text-sm text-[#541C16] focus:outline-none placeholder-[#8C4A2F]/70 shadow-inner"
                placeholder="e.g., IMT Student Union"
              />
            </div>
          </div>

          {/* Row 2: Category, Type & Level */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="category"
                className="block font-cinzel font-black text-xs sm:text-sm text-[#541C16] uppercase tracking-wide mb-1.5"
              >
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                defaultValue={data?.category || ""}
                required
                maxLength={50}
                className="w-full px-3.5 py-2.5 bg-[#F5D2A4] border-2 border-black rounded-xl font-cinzel font-bold text-xs sm:text-sm text-[#541C16] focus:outline-none placeholder-[#8C4A2F]/70 shadow-inner"
                placeholder="e.g., Programming, Design"
              />
            </div>

            <div>
              <label className="block font-cinzel font-black text-xs sm:text-sm text-[#541C16] uppercase tracking-wide mb-1.5">
                Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: Type.INDIVIDUAL, label: "Individual" },
                  { value: Type.GROUP, label: "Group" },
                ].map((item) => (
                  <label
                    key={item.value}
                    className={`flex items-center justify-center p-2 rounded-xl border-2 border-black font-cinzel font-bold text-xs cursor-pointer transition-all ${
                      type === item.value
                        ? "bg-[#BF6432] text-white shadow-md scale-[1.02]"
                        : "bg-[#F5D2A4] text-[#541C16] hover:bg-[#ffe6cd]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="type_radio"
                      value={item.value}
                      checked={type === item.value}
                      onChange={() => setType(item.value)}
                      className="sr-only"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-cinzel font-black text-xs sm:text-sm text-[#541C16] uppercase tracking-wide mb-1.5">
                Level
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { value: Level.REGIONAL, label: "Reg" },
                  { value: Level.NATIONAL, label: "Nat" },
                  { value: Level.INTERNATIONAL, label: "Int" },
                ].map((item) => (
                  <label
                    key={item.value}
                    title={item.value}
                    className={`flex items-center justify-center p-2 rounded-xl border-2 border-black font-cinzel font-bold text-xs cursor-pointer transition-all ${
                      level === item.value
                        ? "bg-[#BF6432] text-white shadow-md scale-[1.02]"
                        : "bg-[#F5D2A4] text-[#541C16] hover:bg-[#ffe6cd]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="level_radio"
                      value={item.value}
                      checked={level === item.value}
                      onChange={() => setLevel(item.value)}
                      className="sr-only"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Row 3: Dates */}
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
              rows={3}
              className="w-full px-3.5 py-2.5 bg-[#F5D2A4] border-2 border-black rounded-xl font-cinzel font-bold text-xs sm:text-sm text-[#541C16] focus:outline-none placeholder-[#8C4A2F]/70 shadow-inner resize-vertical"
              placeholder="Overview of the competition..."
            />
          </div>

          {/* Information Input */}
          <div>
            <label
              htmlFor="information"
              className="block font-cinzel font-black text-xs sm:text-sm text-[#541C16] uppercase tracking-wide mb-1.5"
            >
              Additional Information & Rules
            </label>
            <textarea
              id="information"
              name="information"
              defaultValue={data?.information || ""}
              required
              rows={3}
              className="w-full px-3.5 py-2.5 bg-[#F5D2A4] border-2 border-black rounded-xl font-cinzel font-bold text-xs sm:text-sm text-[#541C16] focus:outline-none placeholder-[#8C4A2F]/70 shadow-inner resize-vertical"
              placeholder="Prizes, requirements, team constraints, guidelines..."
            />
          </div>

          {/* Cover Image Input */}
          <div>
            <label className="block font-cinzel font-black text-xs sm:text-sm text-[#541C16] uppercase tracking-wide mb-2">
              Cover Image / Banner
            </label>
            <div className="space-y-3">
              <UploadWidget
                onUploadSuccess={handleImageUpload}
                folder="competitions"
                allowedFormats={["png", "jpeg", "jpg", "webp"]}
              />
              {imageUrl && (
                <div className="flex items-center gap-4 p-3 bg-[#F5D2A4] border-2 border-black rounded-xl shadow-inner">
                  <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-black relative shrink-0 shadow-sm">
                    <Image
                      src={imageUrl}
                      alt="Uploaded cover"
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
                ? "Create Competition"
                : "Update Competition"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/dashboard/sa/competitions")}
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
