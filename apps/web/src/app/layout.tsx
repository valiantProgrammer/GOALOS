import type { Metadata } from "next";
import "./globals.css";
import { AppBackground } from "@/components/ui/AppBackground";

export const metadata: Metadata = {
  title: "GOALOS — The Hunter System | Level Up Your Life",
  description: "Solo Leveling–inspired RPG daily goal, habit and routine tracker. Turn your real life into quests.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#050b1a] text-[#f8fafc] antialiased min-h-screen relative overflow-hidden">
        <AppBackground className="fixed inset-0" />
        <div className="relative z-10 w-full h-full min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
