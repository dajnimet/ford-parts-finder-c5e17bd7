import { supabase } from "@/integrations/supabase/client";

export async function uploadPhoto(file: File, folder: string): Promise<string> {
  const ext = file.name.split(".").pop();
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  
  const { error } = await supabase.storage.from("photos").upload(fileName, file);
  if (error) throw error;

  const { data } = supabase.storage.from("photos").getPublicUrl(fileName);
  return data.publicUrl;
}

export async function deletePhoto(url: string) {
  const path = url.split("/photos/")[1];
  if (!path) return;
  const { error } = await supabase.storage.from("photos").remove([path]);
  if (error) throw error;
}
