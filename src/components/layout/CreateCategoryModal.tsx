"use client";

import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";
import { Category } from "@/lib/type";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Form } from "../ui/form";

interface Props {
  onCreateCategory: (category: Category) => void;
  setIsOpen: (isOpen: boolean) => void;
}

export function CreateCategoryModal({ onCreateCategory, setIsOpen }: Props) {
  const [newCategory, setNewCategory] = useState<string>("");
  const createNewCategory = () => {
    if (!newCategory) {
      return;
    }
    onCreateCategory({ id: uuidv4(), name: newCategory });
    setNewCategory("");
    setIsOpen(false);
  };

  const enterInputCategory = (value: string) => {
    setNewCategory(value);
  };

  const closeModal = () => {
    setNewCategory("");
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
          Create New Category
        </h2>

        <TextField
          isRequired
          value={newCategory}
          onChange={(value) => enterInputCategory(value)}
          autoFocus
          label="Category"
          type="text"
          placeholder="Enter new category"
        />
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
            onPress={() => createNewCategory()}
          >
            Create
          </Button>
        </div>
      </Form>
    </div>
  );
}
