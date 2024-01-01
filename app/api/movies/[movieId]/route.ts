import { NextRequest, NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { getServerAuthSession } from "@/server/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: { movieId: string } }
) {
  try {
    const session = await getServerAuthSession();

    if (!session)
      return NextResponse.json({ error: "Unauthorised" }, { status: 400 });

    const { movieId } = params;

    const movie = await prismadb.movie.findUnique({ where: { id: movieId } });

    if (!movie) throw new Error("Invalid ID");

    return NextResponse.json(movie, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
