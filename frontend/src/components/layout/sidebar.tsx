import { ReactElement } from "react";
import { SidebarHeader, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenuButton, Sidebar } from "../ui/sidebar";
import { Home, ShoppingBag } from "lucide-react";
import Link from "next/link";

export const MainSidebar = (): ReactElement => {

  const sidebarGroups = [
    {
      label: "GERAL",
      items: [
        {
          label: "Dashboard",
          icon: Home,
          url: "/home/dashboard"
        },
        {
          label: "Produtos",
          icon: ShoppingBag,
          url: "/home/produtos"
        }
      ]
    }
  ]

  return (
      <Sidebar>
        <SidebarHeader className="font-bold text-xl">
          <h1>Hypesoft</h1>
        </SidebarHeader>
        <SidebarContent>
          {sidebarGroups.map((group) => (
            <SidebarGroup key={group.label}>
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              <SidebarGroupContent>
                {group.items.map((item) => (
                  <SidebarMenuButton key={item.label} asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                ))}
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
      </Sidebar>
  );
}
