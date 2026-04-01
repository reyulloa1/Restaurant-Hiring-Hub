import { randomUUID } from "node:crypto";
import { env } from "../config/env.js";
import { supabaseAdmin } from "../config/supabase.js";

export async function uploadResume(file: Express.Multer.File): Promise<string> {
  const extension = file.originalname.split(".").pop() || "pdf";
  const filePath = `resumes/${randomUUID()}.${extension}`;

  const { error: uploadError } = await supabaseAdmin.storage
    .from(env.SUPABASE_RESUME_BUCKET)
    .upload(filePath, file.buffer, {
      contentType: file.mimetype,
      upsert: false
    });

  if (uploadError) {
    throw new Error(`Resume upload failed: ${uploadError.message}`);
  }

  const { data: signedData, error: signedError } = await supabaseAdmin.storage
    .from(env.SUPABASE_RESUME_BUCKET)
    .createSignedUrl(filePath, 60 * 60 * 24 * 30);

  if (!signedError && signedData?.signedUrl) {
    return signedData.signedUrl;
  }

  const { data: publicData } = supabaseAdmin.storage.from(env.SUPABASE_RESUME_BUCKET).getPublicUrl(filePath);
  return publicData.publicUrl;
}
