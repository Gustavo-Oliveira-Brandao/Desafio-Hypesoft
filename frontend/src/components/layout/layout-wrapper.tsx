"use client";

import { ReactNode } from "react";
import { MainSidebar } from "./sidebar";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";

interface LayoutWrapperProps {
  children: ReactNode;
}

export const LayoutWrapper = ({ children }: LayoutWrapperProps) => {

  return (
    <SidebarProvider>
      <div className="flex w-full">
        <MainSidebar
        />
        <div className="flex-1 w-full">
          <header className="bg-zinc-900 p-4 sticky top-0 z-10 flex items-center gap-4 md:hidden">
          <SidebarTrigger />
            <h1 className="font-bold text-xl">Hypesoft</h1>
          </header>
          <main className="w-full">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};
