import { supabase } from "@/lib/supabase";

export const getCategory = async (userId: string) => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("user_sub", userId)
    .order("created_at", { ascending: false });
  return { data, error };
};

export const createCategory = async ({
  id,
  userSub,
  name,
}: {
  id: string;
  userSub: string;
  name: string;
}) => {
  const { data, error } = await supabase.from("categories").insert({
    id,
    user_sub: userSub,
    name,
    created_at: new Date().toISOString(),
  });
  return { data, error };
};
