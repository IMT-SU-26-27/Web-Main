"use client";

import React, { useState, useRef, DragEvent, ChangeEvent } from "react";
import { UploadWidgetProps } from "@/types/action";

const DEFAULT_ALLOWED_FORMATS = [
  "png",
  "jpeg",
  "jpg",
  "webp",
  "heic",
  "heif",
];

export function UploadWidget({
  onUploadSuccess,
  folder,
  allowedFormats = DEFAULT_ALLOWED_FORMATS,
}: UploadWidgetProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const effectiveFormats =
    allowedFormats && allowedFormats.length > 0
      ? allowedFormats
      : DEFAULT_ALLOWED_FORMATS;

  const uploadFile = async (file: File) => {
    setErrorMessage(null);

    // Validate format
    const extension = file.name.split(".").pop()?.toLowerCase() || "";
    const isAllowed = effectiveFormats.some(
      (format) => format.toLowerCase() === extension
    );

    if (!isAllowed) {
      setErrorMessage(
        `Format file tidak didukung (.${extension}). Format yang diizinkan: ${effectiveFormats
          .join(", ")
          .toUpperCase()}`
      );
      return;
    }

    // Validate size (max 10MB)
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setErrorMessage("Ukuran file melebihi batas maksimal 10MB.");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      if (folder) {
        formData.append("folder", folder);
      }

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.success && data.secure_url) {
        onUploadSuccess(data.secure_url, data.public_id);
      } else {
        setErrorMessage(
          data.error || "Gagal mengunggah gambar ke Cloudinary. Silakan coba lagi."
        );
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat mengunggah gambar."
      );
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsDragging(false);
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      await uploadFile(files[0]);
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await uploadFile(files[0]);
    }
  };

  // Build accept attribute string
  const acceptAttribute = effectiveFormats
    .map((fmt) => `.${fmt.toLowerCase()}`)
    .join(",");

  return (
    <div className="w-full flex flex-col space-y-2">
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptAttribute}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Drag & Drop Upload Zone */}
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => {
          if (!isUploading) {
            fileInputRef.current?.click();
          }
        }}
        className={`w-full group relative overflow-hidden rounded-xl p-7 transition-all duration-200 ease-in-out shadow-inner cursor-pointer select-none ${
          isDragging
            ? "bg-[#FFE6CD] border-2 border-dashed border-[#BF6432] scale-[1.01] ring-4 ring-[#BF6432]/30 shadow-lg"
            : isUploading
            ? "bg-[#F5D2A4]/50 border-2 border-dashed border-[#8C4A2F]/40 cursor-wait opacity-80"
            : "bg-[#F5D2A4]/70 hover:bg-[#F5D2A4] border-2 border-dashed border-[#8C4A2F]/60 hover:border-[#541C16]"
        }`}
      >
        <div className="flex flex-col items-center space-y-3">
          {/* Upload or Loading Spinner Icon */}
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center border-2 border-black transition-all duration-200 shadow-sm ${
              isDragging
                ? "bg-[#BF6432] scale-110"
                : isUploading
                ? "bg-[#E5C198] animate-pulse"
                : "bg-[#E5C198] group-hover:bg-[#BF6432]"
            }`}
          >
            {isUploading ? (
              <svg
                className="w-7 h-7 text-[#541C16] animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              <svg
                className={`w-7 h-7 transition-colors duration-200 ${
                  isDragging
                    ? "text-white animate-bounce"
                    : "text-[#541C16] group-hover:text-white"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            )}
          </div>

          {/* Text Content */}
          <div className="text-center">
            <h3 className="font-cinzel font-black text-sm sm:text-base text-[#541C16] uppercase tracking-wide">
              {isUploading
                ? "Mengunggah ke Cloudinary..."
                : isDragging
                ? "Lepaskan File untuk Unggah"
                : "Pilih File atau Drag & Drop"}
            </h3>
            <p className="font-cinzel font-bold text-xs text-[#8C4A2F] mt-1">
              {isUploading
                ? "Mohon tunggu sementara gambar diproses..."
                : isDragging
                ? "Lepaskan file di sini untuk langsung mengunggah"
                : "Klik untuk memilih atau seret & lepas file ke sini"}
            </p>
            <div className="mt-2.5 flex items-center justify-center space-x-2">
              <span className="font-cinzel font-bold text-[11px] text-[#541C16] bg-[#E5C198] border border-black/30 px-2.5 py-0.5 rounded-md shadow-xs">
                {effectiveFormats.join(", ").toUpperCase()}
              </span>
              <span className="text-xs text-[#8C4A2F] font-bold">•</span>
              <span className="font-cinzel font-bold text-[11px] text-[#8C4A2F]">
                Max 10MB
              </span>
            </div>
          </div>

          {/* Decorative Corner Icons */}
          <div className="absolute top-3 right-3 opacity-30 group-hover:opacity-60 transition-opacity duration-200">
            <svg
              className="w-5 h-5 text-[#8C4A2F]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <div className="absolute bottom-3 left-3 opacity-30 group-hover:opacity-60 transition-opacity duration-200">
            <svg
              className="w-5 h-5 text-[#8C4A2F]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Error display */}
      {errorMessage && (
        <div className="p-2.5 bg-[#FADBD8] border-2 border-[#C0392B] text-[#922B21] rounded-xl font-cinzel font-bold text-xs flex items-center justify-between shadow-xs">
          <span>{errorMessage}</span>
          <button
            type="button"
            onClick={() => setErrorMessage(null)}
            className="ml-2 font-bold hover:underline cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
