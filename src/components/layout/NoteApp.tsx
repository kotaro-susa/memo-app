"use client";

import { useState, useEffect, useMemo } from "react";
import NoteList from "./NoteList";
import NoteDetail from "./NoteDetail";
import { Category, Note } from "@/lib/type";
import { v4 as uuidv4 } from "uuid";
import userStore from "@/store/userStore";

interface NoteAppProps {
  category: Category[];
  savedNotes: Note[];
}

export default function NoteApp({ category, savedNotes }: NoteAppProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [isDetailView, setIsDetailView] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const { user } = userStore();

  useEffect(() => {
    try {
      setNotes(savedNotes);
      setCategories(category);
    } catch (e) {
      console.error("Failed to parse saved notes:", e);
    }
  }, [category, savedNotes]);

  const activeCategoryNotes = useMemo(() => {
    if (!selectedCategory) return [];
    return notes
      .filter((note) => note.category.id === selectedCategory.id)
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
  }, [selectedCategory, notes]);

  const handleCreateNote = async () => {
    if (!user?.sub || !selectedCategory) {
      console.error("ユーザー情報またはカテゴリがありません");
      return;
    }

    const newNote: Note = {
      id: uuidv4(),
      userSub: user.sub,
      title: "New Note",
      content: "",
      category: {
        id: selectedCategory.id,
        name: selectedCategory.name,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const res = await fetch(`/api/note`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: newNote.id,
        userSub: newNote.userSub,
        title: newNote.title,
        content: newNote.content,
        categoryId: newNote.category.id,
        categoryName: newNote.category.name,
        created_at: newNote.createdAt,
        updated_at: newNote.updatedAt,
      }),
    });

    if (!res.ok) {
      console.error("カテゴリーの取得に失敗しました");
    } else {
      setNotes((prevNotes) => [newNote, ...prevNotes]);
      setSelectedNoteId(newNote.id);
      setIsDetailView(true);
    }
  };

  const handleSelectNote = (noteId: string) => {
    setSelectedNoteId(noteId);
    setIsDetailView(true);
  };

  const handleUpdateNote = async (updatedNote: Note) => {
    const updatedAt = new Date().toISOString();
    const previousNotes = [...notes];
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === updatedNote.id
          ? { ...updatedNote, updatedAt: updatedAt }
          : note
      )
    );
    try {
      const res = await fetch(`/api/note/${updatedNote.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: updatedNote.title,
          content: updatedNote.content,
          updated_at: updatedAt,
        }),
      });

      if (!res.ok) {
        throw new Error("ノートの更新に失敗しました");
      }
    } catch (error) {
      console.error(error);
      setNotes(previousNotes);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    const prevNotes = [...notes];
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    if (selectedNoteId === noteId) {
      setSelectedNoteId(null);
      setIsDetailView(false);
    }
    try {
      const res = await fetch(`/api/note/${noteId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error("ノートの削除に失敗しました");
      }
    } catch (error) {
      console.error(error);
      setNotes(prevNotes);
    }
  };

  const handleBackToList = () => {
    setIsDetailView(false);
  };

  const handleCreateCategory = async (category: Category) => {
    const previousCategory = [...categories];
    setSelectedCategory(category);
    setCategories((prevCategories) => [category, ...prevCategories]);

    try {
      const res = await fetch(`/api/category`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: category.id,
          userSub: user?.sub,
          name: category.name,
        }),
      });

      if (!res.ok) {
        throw new Error("カテゴリーの作成に失敗しました");
      }
    } catch (error) {
      console.error(error);
      setCategories(previousCategory);
      if (selectedCategory?.id === category.id) {
        setSelectedCategory(undefined);
      }
    }
  };

  const selectedNote = activeCategoryNotes.find(
    (note) => note.id === selectedNoteId
  );

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div
        className={`w-full md:w-1/3 p-4 ${
          isDetailView ? "hidden md:block" : "block"
        }`}
      >
        <NoteList
          notes={activeCategoryNotes}
          categories={categories}
          selectedNoteId={selectedNoteId}
          onSelectNote={handleSelectNote}
          onSelectCategory={setSelectedCategory}
          onCreateNote={handleCreateNote}
          onCreateCategory={handleCreateCategory}
        />
      </div>
      <div
        className={`w-full md:w-2/3 p-4 ${isDetailView ? "block" : "hidden"}`}
      >
        {selectedNote && (
          <NoteDetail
            key={selectedNote.id}
            note={selectedNote}
            onUpdate={handleUpdateNote}
            onDelete={handleDeleteNote}
            onBack={handleBackToList}
          />
        )}
      </div>
    </div>
  );
}
