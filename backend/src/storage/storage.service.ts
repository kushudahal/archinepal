import { randomUUID } from "node:crypto";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v2 as cloudinary } from "cloudinary";
import { env } from "../config/env.js";
import { ApiError } from "../utils/http.js";

const s3 =
  env.AWS_ACCESS_KEY && env.AWS_SECRET_KEY && env.AWS_S3_BUCKET
    ? new S3Client({
        region: env.AWS_REGION,
        credentials: {
          accessKeyId: env.AWS_ACCESS_KEY,
          secretAccessKey: env.AWS_SECRET_KEY
        }
      })
    : null;

if (env.CLOUDINARY_URL) {
  cloudinary.config({ cloudinary_url: env.CLOUDINARY_URL });
}

export async function createUploadUrl(input: { filename: string; contentType: string; folder?: string }) {
  if (!input.contentType.match(/^(image\/|application\/pdf)/)) {
    throw new ApiError(400, "Unsupported file type.", "UNSUPPORTED_FILE_TYPE");
  }

  if (s3 && env.AWS_S3_BUCKET) {
    const key = `${input.folder ?? "uploads"}/${randomUUID()}-${input.filename}`;
    const command = new PutObjectCommand({
      Bucket: env.AWS_S3_BUCKET,
      Key: key,
      ContentType: input.contentType
    });
    const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 });
    return { provider: "s3", key, uploadUrl };
  }

  if (env.CLOUDINARY_URL) {
    const timestamp = Math.round(Date.now() / 1000);
    const signature = cloudinary.utils.api_sign_request({ timestamp, folder: input.folder ?? "archinepal" }, cloudinary.config().api_secret!);
    return { provider: "cloudinary", timestamp, signature, folder: input.folder ?? "archinepal" };
  }

  throw new ApiError(503, "No storage provider configured.", "STORAGE_NOT_CONFIGURED");
}
