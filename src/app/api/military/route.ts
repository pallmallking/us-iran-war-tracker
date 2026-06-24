import { NextResponse } from "next/server";
import military from "@/data/military-assets.json";
import type { MilitaryData } from "@/lib/types";

export async function GET() {
  return NextResponse.json({ data: military as MilitaryData });
}
