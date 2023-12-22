import { NextRequest, NextResponse } from "next/server";

import bcrypt from "bcrypt";

import prismadb from "@/lib/prismadb";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "500kb",
    },
  },
};

export async function POST(req: NextRequest) {
  if (req.method !== "POST")
    return NextResponse.json({ error: "Forbidden" }, { status: 405 });

  try {
    const requestBody = await req.json();

    const { email, name, password } = requestBody;
    const existingUser = await prismadb.user.findUnique({
      where: { email: email },
    });
    if (existingUser)
      return NextResponse.json({ error: "Email taken!" }, { status: 422 });

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
