import { LandingPage, styleTag } from "@/components/landing-page";

export default function Home() {
  return (
    <>
      {styleTag}
      <div className="hacker-background">
        <LandingPage />
      </div>
    </>
  );
}
