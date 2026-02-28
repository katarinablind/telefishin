import React from "react";
import { TankPage } from "@/components/tank/TankPage";

export default async function TankRoute({
  params,
  searchParams,
}: {
  params: Promise<{ tankId: string }>;
  searchParams: Promise<{ share?: string }>;
}) {
  const { tankId } = await params;
  const { share } = await searchParams;
  return <TankPage tankId={tankId} showShareOnMount={share === "1"} />;
}
