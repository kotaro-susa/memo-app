"use client";

import NoteApp from "@/components/layout/NoteApp";
import ProtectedUserRoute from "@/components/layout/user-guard";
import { Category, Note } from "@/lib/type";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
  const [category, setCategory] = useState<Category[]>([]);
  const [savedNotes, setSavedNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  const getCategory = async (userSub: string | undefined | null) => {
    try {
      const res = await fetch(`/api/category/${userSub}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        console.error("カテゴリーの取得に失敗しました");
        return [];
      } else {
        const result = await res.json();
        return result;
      }
    } catch (error) {
      console.error("通信エラー:", error);
      return [];
    }
  };

  const getNote = async (userSub: string | undefined | null) => {
    try {
      const res = await fetch(`/api/note/${userSub}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        console.error("カテゴリーの取得に失敗しました");
        return [];
      } else {
        const result = await res.json();
        return result;
      }
    } catch (error) {
      console.error("通信エラー:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const category = await getCategory(session?.user?.sub);
        setCategory(category ?? []);
        const note = await getNote(session?.user?.sub);
        setSavedNotes(note ?? []);
      } catch (error) {
        console.error("データ取得中にエラーが発生しました:", error);
        setCategory([]);
        setSavedNotes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
  }, [session]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-transparent border-blue-500" />
      </div>
    );
  }

  return (
    <ProtectedUserRoute>
      <main className="min-h-screen bg-background p-4">
        <NoteApp category={category} savedNotes={savedNotes} />
      </main>
    </ProtectedUserRoute>
  );
}
