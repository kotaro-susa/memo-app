"use client";

import SignIn from "@/components/layout/sign-in";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">
        Welcome to MemoApp
      </h1>
      <p className="mb-10 text-gray-600 max-w-md text-center">
        Please sign in with your Google account to access your memos securely.
      </p>
      <SignIn />
    </main>
  );
}
