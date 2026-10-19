import type { Metadata } from "next";
import "./globals.css";

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
      <body className="bg-[#050814] text-[#f8fafc] antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
