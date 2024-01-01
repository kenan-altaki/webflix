import { NextRequest, NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { getServerAuthSession } from "@/server/auth";

export async function GET(requ: NextRequest) {
  const session = await getServerAuthSession();
  if (!session) throw new Error("Unauthenticated");

  try {
    const currentUser = await prismadb.user.findUnique({
      where: { email: session.user.email! },
    });

    const favouriteMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: currentUser?.favouriteIds,
        },
      },
    });

    return NextResponse.json(favouriteMovies, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
