import { v2 as cloudinary } from "cloudinary";

const cloudinaryUrl = process.env.CLOUDINARY_URL || "";
const match = cloudinaryUrl.match(/cloudinary:\/\/([^:]+):([^@]+)@(.+)/);

if (match) {
  cloudinary.config({
    api_key: match[1],
    api_secret: match[2],
    cloud_name: match[3],
    secure: true,
  });
} else {
  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dcptjcdkr",
    secure: true,
  });
}

export default cloudinary;
