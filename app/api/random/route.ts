import { NextRequest, NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { getServerAuthSession } from "@/server/auth";

export async function GET(req: NextRequest) {
  const session = await getServerAuthSession();
  if (!session) throw new Error("Unauthorised");
  try {
    const movieCount = await prismadb.movie.count();
    const randomIndex = Math.floor(Math.random() * movieCount);
    const randomMovie = await prismadb.movie.findMany({
      take: 1,
      skip: randomIndex,
    });

    if (randomMovie.length !== 1)
      throw new Error("More than one movie returned");

    return NextResponse.json(randomMovie[0], { status: 200 });
  } catch (error) {
    console.error(error);
    NextResponse.json({ error: error }, { status: 500 });
  }
}
