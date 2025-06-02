import { createNote } from "@/app/infrastructure/noteRepository";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {
      id,
      userSub,
      title,
      content,
      categoryId,
      categoryName,
      created_at,
      updated_at,
    } = await req.json();

    const { data, error } = await createNote({
      id,
      user_sub: userSub,
      title,
      content,
      category_id: categoryId,
      category_name: categoryName,
      created_at,
      updated_at,
    });
    if (error) {
      return NextResponse.json(
        { message: "ノートの作成に失敗しました。" },
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
