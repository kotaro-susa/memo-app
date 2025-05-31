"use client";

import { useEffect, useState } from "react";
import { Select } from "@/components/ui/select";
import { Category } from "@/lib/type";
import { Key } from "react-aria-components";

interface Props {
  categories: Category[];
  onSelectCategory: (category: Category) => void;
}

export function SelectCategoryComponent({
  categories,
  onSelectCategory,
}: Props) {
  const [selectedKey, setSelectedKey] = useState<Key>(categories[0]?.id);

  // 初期マウント時に最初のカテゴリを選択
  useEffect(() => {
    if (categories.length > 0) {
      setSelectedKey(categories[0].id);
      onSelectCategory(categories[0]);
    }
  }, [categories]);

  const selectCategory = (value: Key | null) => {
    if (!value) return;
    setSelectedKey(value);
    const target = categories.find((category) => category.id === value);
    if (target) {
      onSelectCategory(target);
    }
  };

  return (
    <Select
      placeholder="カテゴリー"
      className="w-32 text-sm"
      selectedKey={selectedKey}
      onSelectionChange={selectCategory}
    >
      <Select.Trigger />
      <Select.List items={categories}>
        {(item) => (
          <Select.Option id={item.id} textValue={item.name}>
            {item.name}
          </Select.Option>
        )}
      </Select.List>
    </Select>
  );
}
