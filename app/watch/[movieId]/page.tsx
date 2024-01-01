import React from "react";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";

import { redirect } from "next/navigation";

import { getServerAuthSession } from "@/server/auth";

import prismadb from "@/lib/prismadb";

export default async function Watch({
  params,
}: {
  params: { movieId: string };
}) {
  const session = await getServerAuthSession();
  if (!session) redirect("/");

  const data = await prismadb.movie.findUnique({
    where: { id: params.movieId },
  });

  if (!data) throw new Error("Invalid ID");

  return (
    <div className="h-screen w-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
        <a href="/">
          <ArrowLeftIcon className="w-4 md:w-10 text-white cursor-pointer hover:opacity-80 transition" />
        </a>
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light">Watching:</span> {data?.title}
        </p>
      </nav>
      <video
        className="h-full w-full"
        autoPlay
        controls
        src={data?.videoUrl}
      ></video>
    </div>
  );
}
