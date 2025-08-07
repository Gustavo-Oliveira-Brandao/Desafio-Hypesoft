import { MainSidebar } from "@/components/layout/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactElement, ReactNode } from "react";

const HomePageLayout = ({ children }: { children: ReactNode }): ReactElement => {
  return (
    <div className="flex w-screen min-h-screen">
      <SidebarProvider>
        <MainSidebar />
        <main className="w-full p-10">{children}</main>
      </SidebarProvider>
    </div>
  );
}

export default HomePageLayout