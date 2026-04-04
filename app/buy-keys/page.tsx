import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { BuyKeysClient } from "./buy-keys-client";

export default async function BuyKeysPage() {
  const session = await auth();
  
  if (!session.userId) {
    redirect("/");
  }

  return <BuyKeysClient />;
}
