import { NextRequest, NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { getServerAuthSession } from "@/server/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerAuthSession();

    if (!session)
      return NextResponse.json({ error: "Unauthorised" }, { status: 400 });

    const movies = await prismadb.movie.findMany();

    return NextResponse.json(movies);
  } catch (error) {
    console.error(error);
  }
}
