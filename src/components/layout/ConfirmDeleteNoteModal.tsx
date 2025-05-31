"use client";

import { Button } from "@/components/ui/button";
import { Form } from "../ui/form";

interface Props {
  onDeleteNote: (noteId: string) => void;
  noteId: string;
  setIsOpen: (isOpen: boolean) => void;
}

export function ConfirmDeleteNoteModal({
  onDeleteNote,
  noteId,
  setIsOpen,
}: Props) {
  const closeModal = () => {
    setIsOpen(false);
  };

  const deleteNote = () => {
    onDeleteNote(noteId);
    setIsOpen(false);
  };

  return (
    <div
      className="
        fixed inset-0 z-50 flex items-center justify-center
        bg-black/50 backdrop-blur-sm
        p-4 sm:p-6
      "
    >
      <Form
        className="
          bg-white dark:bg-gray-900
          rounded-2xl shadow-xl
          w-full max-w-md
          p-6 sm:p-8
          flex flex-col gap-6
          ring-1 ring-gray-200 dark:ring-gray-700
        "
      >
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Are you sure you want to delete?
        </h2>
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            onPress={() => closeModal()}
            className="px-5 py-2 rounded-lg"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            className="px-5 py-2 rounded-lg"
            onPress={() => deleteNote()}
          >
            OK
          </Button>
        </div>
      </Form>
    </div>
  );
}
