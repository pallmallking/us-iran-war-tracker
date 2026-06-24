import { NextResponse } from "next/server";
import casualties from "@/data/casualties.json";
import type { CasualtiesData } from "@/lib/types";

export async function GET() {
  return NextResponse.json({ data: casualties as CasualtiesData });
}
