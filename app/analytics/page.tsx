import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { AnalyticsClient } from "./analytics-client";

export default async function AnalyticsPage() {
  const session = await auth();
  
  if (!session.userId) {
    redirect("/");
  }

  return <AnalyticsClient />;
}
