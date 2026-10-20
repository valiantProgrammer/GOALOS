"use client";

import React from "react";
import { SidebarNav } from "./SidebarNav";
import { TopBar, TopBarProps } from "./TopBar";
import { BottomNav } from "./BottomNav";

export interface AppShellProps {
  children: React.ReactNode;
  activeRoute?: string;
  topBarProps?: TopBarProps;
  heroBanner?: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({
  children,
  activeRoute,
  topBarProps,
  heroBanner,
  backgroundVariant,
}) => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#050b1a] text-[#f8fafc]">
      {/* Desktop Sidebar Chrome: Fixed on the left with faint glass transparency */}
      <SidebarNav className="hidden md:flex shrink-0" activeRoute={activeRoute} />

      {/* Main Content Column: Full viewport height, never scrolls outer window */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
        {/* TopBar: Fixed at the top */}
        <TopBar className="shrink-0" {...topBarProps} />

        {/* Right Bottom Part Inside: The ONLY scrollable container */}
        <div className="flex-1 overflow-y-auto min-h-0 relative">
          {heroBanner}
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </div>
  );
};
