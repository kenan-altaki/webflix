"use client";
import React from "react";

import { signOut, useSession } from "next-auth/react";

function HomePage() {
  const { data: session } = useSession();

  return (
    <>
      <h1 className="text-2xl text-green-500">WebFlix</h1>;
      <p className="text-white">Logged in as {session?.user.email}</p>
      <button className="h-10 w-full bg-white" onClick={() => signOut()}>
        SignOut
      </button>
    </>
  );
}

export default HomePage;
