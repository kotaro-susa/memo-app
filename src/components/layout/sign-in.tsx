"use client";

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";

export default function SignIn() {
  return (
    <Button
      onPress={() =>
        signIn(
          "google",
          { callbackUrl: "/auth/callback" },
          { prompt: "select_account" },
        )
      }
      className="hover:cursor-pointer"
    >
      Sign in with Google
    </Button>
  );
}
