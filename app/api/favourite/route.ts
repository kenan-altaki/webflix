import { NextRequest, NextResponse } from "next/server";

import { without } from "lodash";

import prismadb from "@/lib/prismadb";
import { getServerAuthSession } from "@/server/auth";

export async function POST(req: NextRequest) {
  const session = await getServerAuthSession();
  if (!session) throw new Error("Unauthenticated");
  const requestBody = await req.json();
  const { movieId } = requestBody;
  const existingMovie = await prismadb.movie.findUnique({
    where: {
      id: movieId,
    },
  });
  if (!existingMovie) throw new Error("Invalid ID");

  const user = await prismadb.user.update({
    where: {
      email: session.user.email!,
    },
    data: {
      favouriteIds: {
        push: movieId,
      },
    },
  });

  return NextResponse.json(user);
}

export async function DELETE(req: NextRequest) {
  const session = await getServerAuthSession();
  if (!session) throw new Error("Unauthenticated");
  const currentUser = await prismadb.user.findUnique({
    where: { email: session.user.email! },
  });
  const requestBody = await req.json();
  const { movieId } = requestBody;
  const existingMovie = await prismadb.movie.findUnique({
    where: {
      id: movieId,
    },
  });
  if (!existingMovie) throw new Error("Invalid ID");

  const updatedFavouriteIds = without(currentUser?.favouriteIds, movieId);
  const updatedUser = await prismadb.user.update({
    where: { email: currentUser?.email || "" },
    data: {
      favouriteIds: updatedFavouriteIds,
    },
  });

  return NextResponse.json(updatedUser);
}

export async function GET(req: NextRequest) {}
