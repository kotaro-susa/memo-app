export interface Note {
  id: string;
  title: string;
  content: string;
  category: Category;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
}
