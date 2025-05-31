"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, Trash2 } from "lucide-react";
import { Note } from "@/lib/type";
import { ConfirmDeleteNoteModal } from "./ConfirmDeleteNoteModal";

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

  const saveChanges = () => {
    if (title !== note.title || content !== note.content) {
      setIsSaving(true);

      const updatedNote: Note = {
        ...note,
        title,
        content,
      };

      onUpdate(updatedNote);

      setTimeout(() => {
        setIsSaving(false);
      }, 500);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveChanges();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [title, content]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleDelete = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className="flex flex-col h-full">
        <header className="flex justify-between items-center p-5 border-b">
          <button
            onClick={onBack}
            className="p-1 rounded-md hover:bg-secondary transition-colors"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleDelete}
              className="p-2 rounded-md text-destructive hover:bg-destructive/10 transition-colors"
              aria-label="Delete note"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </header>

        <div className="flex-grow flex flex-col p-4 overflow-y-auto">
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Title"
            className="text-xl font-semibold mb-4 bg-transparent border-none outline-none w-full focus:ring-0"
          />

          <textarea
            ref={contentRef}
            value={content}
            onChange={handleContentChange}
            placeholder="Start writing..."
            className="flex-grow resize-none bg-transparent border-none outline-none w-full focus:ring-0 text-foreground"
          />
        </div>

        <div className="p-4 border-t flex justify-between items-center text-sm text-muted-foreground">
          <span>{isSaving ? "保存中..." : "保存"}</span>
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
