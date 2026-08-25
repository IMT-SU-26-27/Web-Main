import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { UploadApiResponse } from "cloudinary";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "general";

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    const isHeic = ext === "heic" || ext === "heif";

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: folder,
          resource_type: "image",
          format: isHeic ? "webp" : undefined,
        },
        (error, uploadResult) => {
          if (error || !uploadResult) {
            reject(error || new Error("Cloudinary upload failed"));
          } else {
            resolve(uploadResult);
          }
        }
      );

      uploadStream.end(buffer);
    });

    // Ensure URL is web-viewable (if .heic, deliver as .webp via Cloudinary on-the-fly transformation)
    const secureUrl = result.secure_url.replace(/\.(heic|heif)$/i, ".webp");

    return NextResponse.json({
      success: true,
      secure_url: secureUrl,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to upload file to Cloudinary",
      },
      { status: 500 }
    );
  }
}
