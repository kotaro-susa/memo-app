"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthCallback() {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "loading") return;
    if (session?.user?.sub) {
      router.replace(`/${session.user.sub}`);
    } else {
      router.replace("/");
    }
  }, [session, status, router]);

  return <div>ログイン処理中です...</div>;
}
