import { GoogleUser } from "@/lib/type";
import { create } from "zustand";

type StoreState = {
  user: GoogleUser | null | undefined;
  setUser: (user: GoogleUser | null | undefined) => void;
};

const userStore = create<StoreState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export default userStore;
