import { getCategory } from "@/app/infrastructure/categoryRepository";
import { NextRequest, NextResponse } from "next/server";

type Params = Promise<{ [key: string]: string }>;
type Props = {
  params: Params;
};

export async function GET(req: NextRequest, { params }: Props) {
  try {
    const { userId } = await params;

    if (!userId) {
      return NextResponse.json(
        { message: "カテゴリーが見つかりません" },
        { status: 404 }
      );
    }

    const { data, error } = await getCategory(userId);

    if (error) {
      return NextResponse.json(
        { message: "カテゴリーの取得に失敗しました。" },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    const result = data.map(({ id, name }) => ({ id, name }));
    return NextResponse.json(result);
  } catch (err) {
    console.error("予期せぬエラー:", err);
    return NextResponse.json(
      { message: "サーバーエラーが発生しました。" },
      { status: 500 }
    );
  }
}
