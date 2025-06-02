import { createCategory } from "@/app/infrastructure/categoryRepository";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id, userSub, name } = await req.json();

    const { data, error } = await createCategory({ id, userSub, name });
    if (error) {
      return NextResponse.json(
        { message: "カテゴリーの作成に失敗しました。" },
        { status: 500 }
      );
    }
    return NextResponse.json(data);
  } catch (err) {
    console.error("予期せぬエラー:", err);
    return NextResponse.json(
      { message: "サーバーエラーが発生しました。" },
      { status: 500 }
    );
  }
}
