import { supabase } from "@/lib/supabase";

export const createNote = async ({
  id,
  user_sub,
  title,
  content,
  category_id,
  category_name,
  created_at,
  updated_at,
}: {
  id: string;
  user_sub: string;
  title: string;
  content: string;
  category_id: string;
  category_name: string;
  created_at: string;
  updated_at: string;
}) => {
  const { data, error } = await supabase.from("notes").insert({
    id,
    user_sub,
    title,
    content,
    category_id,
    category_name,
    created_at,
    updated_at,
  });
  return { data, error };
};

export const getNotes = async (userId: string) => {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("user_sub", userId)
    .order("created_at", { ascending: false });
  return { data, error };
};

export const updateNote = async ({
  id,
  title,
  content,
  updated_at,
}: {
  id: string;
  title: string;
  content: string;
  updated_at: string;
}) => {
  const { data, error } = await supabase
    .from("notes")
    .update({
      title,
      content,
      updated_at,
    })
    .eq("id", id);

  return { data, error };
};

export const deleteNote = async (id: string) => {
  const { data, error } = await supabase
    .from("notes")
    .delete()
    .eq("id", id);

  return { data, error };
};