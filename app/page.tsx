"use client";

import { LandingPage } from "@/components/landing-page";
import { MockSessionProvider } from "./mock-session-provider";

export default function Home() {
  return (
    <MockSessionProvider>
      <LandingPage />
    </MockSessionProvider>
  );
}
