import { NextResponse } from "next/server";
import { getAboutData } from "@/lib/firebase/services";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getAboutData();
  return NextResponse.json(data);
}
