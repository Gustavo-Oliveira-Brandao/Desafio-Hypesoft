import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenuButton, SidebarProvider } from "@/components/ui/sidebar";
import { ReactElement } from "react";

const DashboardPage = (): ReactElement => {
  return (
    <div className="flex">
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <h1>Hypesoft</h1>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Geral</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenuButton>Dashboard</SidebarMenuButton>
                <SidebarMenuButton>Produtos</SidebarMenuButton>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    </div>
  );
}

export default DashboardPage