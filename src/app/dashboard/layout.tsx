"use client";

import type { ReactNode } from "react";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="space-y-8">{children}</div>;
}
