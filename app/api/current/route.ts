import { getServerAuthSession } from "@/server/auth";
import { NextRequest, NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function GET(req: NextRequest) {
  const session = await getServerAuthSession();

  if (!session) throw new Error("Unauthenticated");

  try {
    const user = await prismadb.user.findUnique({
      where: { email: session.user.email! },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
