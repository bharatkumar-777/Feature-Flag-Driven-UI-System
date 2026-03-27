import { NextRequest, NextResponse } from "next/server";
import { FeatureFlag } from "@/lib/feature-flags/types";

const FLAGS: FeatureFlag[] = [
  {
    name: "new_dashboard",
    enabled: false,
    description: "Redesigned dashboard layout with modern cards",
    depends_on: [],
  },
  {
    name: "analytics_base",
    enabled: true,
    description: "Base analytics widget",
    depends_on: [],
  },
  {
    name: "premium_analytics",
    enabled: false,
    description: "Premium analytics with advanced charts",
    depends_on: ["analytics_base"],
  },
  {
    name: "dark_mode",
    enabled: true,
    description: "Dark mode toggle for the application",
    depends_on: [],
  },
  {
    name: "chat_widget",
    enabled: false,
    description: "Live chat support widget",
    depends_on: [],
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const shouldFail = searchParams.get("fail") === "true";

  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (shouldFail) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }

  return NextResponse.json(FLAGS);
}
