
"use client";
import { ReactElement } from "react";
import {
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuButton,
  Sidebar,
  SidebarTrigger,
  SidebarFooter,
} from "../ui/sidebar";
import { Home, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

export const MainSidebar = (): ReactElement => {
  const sidebarGroups = [
    {
      label: "GERAL",
      items: [
        {
          label: "Dashboard",
          icon: Home,
          url: "/home",
        },
        {
          label: "Produtos",
          icon: ShoppingBag,
          url: "/produtos",
        },
      ],
    },
  ];

    const handleLogout = async () => {
      await signOut({ callbackUrl: "/" });
    };

  return (
    <Sidebar>
      <SidebarHeader className="flex justify-between items-center px-4 py-3">
        <h1 className="font-bold text-xl">Hypesoft</h1>
        <SidebarTrigger className="md:hidden" />
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
      <SidebarFooter>
        <Button onClick={handleLogout} className="w-full sm:w-auto">
          Sair
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};
