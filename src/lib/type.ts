export interface Note {
  id: string;
  userId: string;
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

export interface GoogleUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  sub?: string | null;
}
