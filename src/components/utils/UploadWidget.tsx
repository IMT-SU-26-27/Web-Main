"use client";

import { CldUploadWidget } from "next-cloudinary";
import { UploadWidgetProps } from "@/types/action";

export function UploadWidget({
  onUploadSuccess,
  folder,
  allowedFormats,
}: UploadWidgetProps) {
  return (
    <CldUploadWidget
      uploadPreset={process.env.NEXT_PUBLIC_UPLOAD_PRESET || "ml_default"}
      options={{
        folder: folder,
        clientAllowedFormats: allowedFormats,
        resourceType: "auto",
      }}
      onSuccess={(result) => {
        if (
          result.event === "success" &&
          result.info &&
          typeof result.info === "object" &&
          "secure_url" in result.info &&
          "public_id" in result.info
        ) {
          onUploadSuccess(result.info.secure_url, result.info.public_id);
        }
      }}
    >
      {({ open }) => (
        <button
          type="button"
          onClick={() => open()}
          className="w-full group relative overflow-hidden bg-[#F5D2A4]/70 hover:bg-[#F5D2A4] border-2 border-dashed border-[#8C4A2F]/60 hover:border-[#541C16] rounded-xl p-7 transition-all duration-200 ease-in-out shadow-inner cursor-pointer"
        >
          <div className="flex flex-col items-center space-y-3">
            {/* Upload Icon */}
            <div className="w-14 h-14 bg-[#E5C198] group-hover:bg-[#BF6432] border-2 border-black rounded-full flex items-center justify-center transition-colors duration-200 shadow-sm">
              <svg
                className="w-7 h-7 text-[#541C16] group-hover:text-white transition-colors duration-200"
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
            </div>

            {/* Text Content */}
            <div className="text-center">
              <h3 className="font-cinzel font-black text-sm sm:text-base text-[#541C16] uppercase tracking-wide">
                Choose File to Upload
              </h3>
              <p className="font-cinzel font-bold text-xs text-[#8C4A2F] mt-1">
                Click here to browse and select your file
              </p>
              <div className="mt-2.5 flex items-center justify-center space-x-2">
                <span className="font-cinzel font-bold text-[11px] text-[#541C16] bg-[#E5C198] border border-black/30 px-2.5 py-0.5 rounded-md shadow-xs">
                  {allowedFormats?.join(", ").toUpperCase() || "PNG, JPG, JPEG, WEBP"}
                </span>
                <span className="text-xs text-[#8C4A2F] font-bold">•</span>
                <span className="font-cinzel font-bold text-[11px] text-[#8C4A2F]">
                  Max 10MB
                </span>
              </div>
            </div>

            {/* Decorative Elements */}
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
        </button>
      )}
    </CldUploadWidget>
  );
}
