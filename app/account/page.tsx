import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { AccountClient } from "./account-client";

export default async function AccountPage() {
  const session = await auth();
  
  if (!session.userId) {
    redirect("/");
  }

  return <AccountClient />;
}
