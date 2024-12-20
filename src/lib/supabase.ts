import { createClient } from "@supabase/supabase-js";

const VITE_SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const VITE_SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_KEY);

export async function uploadImage(file: File, filename: string) {
  const { data, error } = await supabase.storage
    .from("NewsImage")
    .upload(`public/news/${filename}`, file, {
      cacheControl: "3600",
      upsert: false,
    });
  if (error) {
    console.log(error);
  } else {
    console.log(data);
  }
}

export async function deleteImage(filename: string | undefined) {
  const { data, error } = await supabase.storage
    .from("NewsImage")
    .remove([`public/news/${filename}`]);
  if (error) {
    console.log(error);
  } else {
    console.log(data);
  }
}

export function getImageUrl(filename: string | undefined) {
  const { data } = supabase.storage
    .from("NewsImage")
    .getPublicUrl(`public/news/${filename}`);
  return data.publicUrl;
}
