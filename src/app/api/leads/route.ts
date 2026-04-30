import { NextRequest, NextResponse } from "next/server";
import { submitLead } from "@/lib/lead";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        code: "validation_error",
        message: "Не удалось прочитать данные формы.",
      },
      { status: 400 }
    );
  }

  const result = await submitLead(body, {
    ip: request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip") ?? undefined,
    userAgent: request.headers.get("user-agent") ?? undefined,
  });

  if (result.success) {
    return NextResponse.json(result);
  }

  const statusByCode: Record<typeof result.code, number> = {
    validation_error: 400,
    spam: 400,
    rate_limited: 429,
    save_failed: 500,
    unexpected_error: 500,
  };

  return NextResponse.json(result, { status: statusByCode[result.code] });
}
