"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, Loader2 } from "lucide-react";
import { Note } from "@/lib/type";
import { ConfirmDeleteNoteModal } from "./ConfirmDeleteNoteModal";
import { Button } from "../ui/button";

interface NoteDetailProps {
  note: Note;
  onUpdate: (note: Note) => void;
  onDelete: (noteId: string) => void;
  onBack: () => void;
}

export default function NoteDetail({
  note,
  onUpdate,
  onDelete,
  onBack,
}: NoteDetailProps) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [isSaving, setIsSaving] = useState(false);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (title !== note.title || content !== note.content) {
        setIsSaving(true);
        const updatedNote: Note = { ...note, title, content };
        onUpdate(updatedNote);
        setTimeout(() => setIsSaving(false), 500);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [title, content, note, onUpdate]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleDelete = () => {
    setIsOpen(true);
  };

  const handleSave = () => {
    const updatedNote: Note = { ...note, title, content };
    onUpdate(updatedNote);
  };

  return (
    <>
      <div className="flex flex-col h-full pb-24 sm:pb-0">
        <header className="flex justify-between items-center p-5 border-b">
          <button
            onClick={onBack}
            className="p-1 rounded-md hover:bg-secondary transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="hidden sm:flex items-center space-x-2">
            <Button onPress={handleSave} className="hover:cursor-pointer">
              {isSaving ? <Loader2 className="animate-spin h-4 w-4" /> : "Save"}
            </Button>
            <Button onPress={handleDelete} className="hover:cursor-pointer">
              Delete
            </Button>
          </div>
        </header>

        <div className="flex-grow flex flex-col p-4 overflow-y-auto">
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="タイトル"
            className="text-xl font-semibold mb-4 bg-transparent border-none outline-none w-full focus:ring-0"
          />
          <textarea
            ref={contentRef}
            value={content}
            onChange={handleContentChange}
            placeholder="本文を入力..."
            className="flex-grow resize-none bg-transparent border-none outline-none w-full focus:ring-0 text-foreground"
          />
        </div>

        <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 border-t sm:hidden flex justify-around p-3 z-50">
          <Button
            onPress={handleSave}
            className="w-1/2 mr-2 hover:cursor-pointer"
          >
            {isSaving ? (
              <Loader2 className="animate-spin h-4 w-4 mx-auto" />
            ) : (
              "Save"
            )}
          </Button>
          <Button onPress={handleDelete} className="w-1/2">
            Delete
          </Button>
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-6 md:p-8">
          <div className="w-full max-w-md bg-white rounded-xl shadow-xl dark:bg-gray-800">
            <ConfirmDeleteNoteModal
              onDeleteNote={onDelete}
              noteId={note.id}
              setIsOpen={setIsOpen}
            />
          </div>
        </div>
      )}
    </>
  );
}
