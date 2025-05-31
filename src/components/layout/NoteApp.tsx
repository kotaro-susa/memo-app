"use client";

import { useState, useEffect } from "react";
import NoteList from "./NoteList";
import NoteDetail from "./NoteDetail";
import { Category, Note } from "@/lib/type";
import { v4 as uuidv4 } from "uuid";

const category = [
  { id: "1", name: "Adobe Photoshop" },
  { id: "2", name: "Sketch" },
  { id: "3", name: "Figma" },
  { id: "4", name: "Adobe XD" },
  { id: "5", name: "InVision" },
];

export default function NoteApp() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeCategoryNotes, setActiveCategoryNotes] = useState<Note[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [isDetailView, setIsDetailView] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>();

  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
        // 本来はAPI通信を行った後にセットする
        setCategories(category);
      } catch (e) {
        console.error("Failed to parse saved notes:", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    if (!selectedCategory) return;
    const target = notes.filter(
      (note) => note.category.id === selectedCategory.id
    );
    setActiveCategoryNotes(target);
  }, [selectedCategory, notes]);

  const handleCreateNote = () => {
    const newNote: Note = {
      id: uuidv4(),
      title: "New Note",
      content: "",
      category: { id: selectedCategory!.id, name: selectedCategory!.name },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setSelectedNoteId(newNote.id);
    setIsDetailView(true);
  };

  const handleSelectNote = (noteId: string) => {
    setSelectedNoteId(noteId);
    setIsDetailView(true);
  };

  const handleUpdateNote = (updatedNote: Note) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === updatedNote.id
          ? { ...updatedNote, updatedAt: new Date().toISOString() }
          : note
      )
    );
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    if (selectedNoteId === noteId) {
      setSelectedNoteId(null);
      setIsDetailView(false);
    }
  };

  const handleBackToList = () => {
    setIsDetailView(false);
  };

  const handleCreateCategory = (category: Category) => {
    setSelectedCategory(category);
    setCategories((prevCategories) => [category, ...prevCategories]);
  };

  const selectedNote = notes.find((note) => note.id === selectedNoteId);

  useEffect(() => {}, [selectedNoteId]);

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
