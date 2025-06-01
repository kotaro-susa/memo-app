"use client";

import NoteApp from "@/components/layout/NoteApp";
import ProtectedUserRoute from "@/components/layout/user-guard";

export default function Home() {
  return (
    <ProtectedUserRoute>
      <main className="min-h-screen bg-background p-4">
        <NoteApp />
      </main>
    </ProtectedUserRoute>
  );
}
