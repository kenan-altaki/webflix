import { redirect } from "next/navigation";

import { getServerAuthSession } from "@/server/auth";

import HomePage from "./component";

export default async function Home() {
  const session = await getServerAuthSession();

  if (session) {
    return <HomePage />;
  }

  redirect("/auth");
}
