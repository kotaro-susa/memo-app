import { deleteNote, updateNote } from "@/app/infrastructure/noteRepository";
import { NextRequest, NextResponse } from "next/server";
import { getNotes } from "@/app/infrastructure/noteRepository";

type Params = Promise<{ [key: string]: string }>;
type Props = {
  params: Params;
};

export async function PATCH(req: NextRequest, { params }: Props) {
  const { id } = await params;
  try {
    const { title, content, updated_at } = await req.json();

    const { data, error } = await updateNote({
      id,
      title,
      content,
      updated_at,
    });
    if (error) {
      return NextResponse.json(
        { message: "ノートの更新に失敗しました。" },
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

export async function GET(req: NextRequest, { params }: Props) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "ノートが見つかりません" },
        { status: 404 }
      );
    }

    const { data, error } = await getNotes(id);

    if (error) {
      return NextResponse.json(
        { message: "カテゴリーの取得に失敗しました。" },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json([], { status: 200 });
    }
    const result = data.map(
      ({
        id,
        user_sub,
        title,
        content,
        category_id,
        category_name,
        created_at,
        updated_at,
      }) => ({
        id,
        userSub: user_sub,
        title,
        content,
        category: { id: category_id, name: category_name },
        createdAt: created_at,
        updatedAt: updated_at,
      })
    );
    return NextResponse.json(result);
  } catch (err) {
    console.error("予期せぬエラー:", err);
    return NextResponse.json(
      { message: "サーバーエラーが発生しました。" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: Props) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "ノートIDが指定されていません。" },
        { status: 400 }
      );
    }

    const { data, error } = await deleteNote(id);

    if (error) {
      return NextResponse.json(
        { message: "ノートの削除に失敗しました。" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "ノートを削除しました。", data });
  } catch (err) {
    console.error("予期せぬエラー:", err);
    return NextResponse.json(
      { message: "サーバーエラーが発生しました。" },
      { status: 500 }
    );
  }
}
