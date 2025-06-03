"use client";

import NoteItem from "./NoteItem";
import { Category, Note } from "@/lib/type";
import { Button } from "../ui/button";
import { SelectCategoryComponent } from "./SelectCategory";
import { CreateCategoryModal } from "./CreateCategoryModal";
import { useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { signOut } from "next-auth/react";

interface NoteListProps {
  notes: Note[];
  categories: Category[];
  selectedNoteId: string | null;
  onSelectNote: (noteId: string) => void;
  onSelectCategory: (category: Category) => void;
  onCreateNote: () => void;
  onCreateCategory: (category: Category) => void;
}

export default function NoteList({
  notes,
  categories,
  selectedNoteId,
  onSelectNote,
  onSelectCategory,
  onCreateNote,
  onCreateCategory,
}: NoteListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const userSignOut = () => {
    signOut({ callbackUrl: "/" });
  };
  return (
    <>
      <div className="flex flex-col h-full">
        <header className="flex justify-between items-center p-4 border-b gap-4">
          <div className="flex-1">
            <SelectCategoryComponent
              categories={categories}
              onSelectCategory={onSelectCategory}
            />
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => userSignOut()}
              className="hover:cursor-pointer"
            >
              <AiOutlineLogout size={24} />
            </button>
          </div>
        </header>

        <div className="flex-grow overflow-y-auto py-2">
          {notes.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-2xl font-semibold text-primary">
                Please create a note
              </p>
            </div>
          ) : (
            <div className="space-y-2 px-4">
              {notes.map((note) => (
                <NoteItem
                  key={note.id}
                  note={note}
                  isSelected={note.id === selectedNoteId}
                  onClick={() => onSelectNote(note.id)}
                />
              ))}
            </div>
          )}
        </div>
        <div
          className={`
            fixed bottom-0 left-0 right-0 z-50
            flex justify-center items-center gap-4
            p-3 border-t
            bg-gray-300 text-white
            md:static md:justify-center md:bg-transparent md:text-inherit
          `}
        >
          <Button
            onPress={onCreateNote}
            className={`
              flex items-center gap-1 px-4 py-2
              bg-primary text-primary-foreground
              hover:bg-primary/90 transition-colors
            `}
          >
            <span className="text-sm text-white hover:cursor-pointer">
              New Note
            </span>
          </Button>
          <Button
            onPress={() => setIsOpen(true)}
            intent="outline"
            className={`
              flex items-center gap-1 px-4 py-2
              bg-primary text-primary-foreground
              hover:bg-primary/90 transition-colors hover:cursor-pointer
            `}
          >
            <span className="text-sm text-white">New Category</span>
          </Button>
        </div>
      </div>

      {isOpen && (
        <div
          className="
            fixed inset-0 z-50 flex items-center justify-center
            bg-black/50 p-4 sm:p-6 md:p-8
          "
        >
          <div
            className="
              w-full max-w-md bg-white rounded-xl shadow-xl
              dark:bg-gray-800
            "
          >
            <CreateCategoryModal
              onCreateCategory={onCreateCategory}
              setIsOpen={setIsOpen}
            />
          </div>
        </div>
      )}
    </>
  );
}
