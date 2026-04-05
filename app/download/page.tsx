import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DownloadClient } from "./download-client";

export const dynamic = 'force-dynamic';

export default async function DownloadPage() {
  const session = await auth();
  
  if (!session.userId) {
    redirect("/");
  }

  return <DownloadClient />;
}
