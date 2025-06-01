"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import userStore from "@/store/userStore";

type Props = {
  children: React.ReactNode;
};

export default function ProtectedUserRoute({ children }: Props) {
  const { userId } = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const { setUser } = userStore();

  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
    }
  }, [session, setUser]);

  useEffect(() => {
    if (status === "loading") return;

    // 未ログイン時
    if (status === "unauthenticated" || !session?.user?.sub) {
      router.replace("/");
      return;
    }

    // 不正ユーザーのアクセス制限
    if (session.user.sub !== userId) {
      router.replace("/");
      return;
    }
  }, [status, session, router, userId]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
