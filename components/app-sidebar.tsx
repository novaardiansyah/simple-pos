"use client"

import * as React from "react"
import { BookOpen, LayoutDashboard, ShoppingCart, Store } from "lucide-react"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"
import { useLanguage } from "@/components/language-provider"
import { useAuth } from "@/contexts/auth-context"

const teams = [
  {
    name: "Simple POS",
    logo: Store,
    plan: "Enterprise",
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { t } = useLanguage()
  const { user } = useAuth()

  const navMain = [
    {
      title: t.sidebar.nav.general,
      url: "#",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        {
          title: t.sidebar.nav.dashboard,
          url: "#",
        },
        {
          title: t.sidebar.nav.cashier,
          url: "#",
        },
        {
          title: t.sidebar.nav.users,
          url: "#",
        },
      ],
    },
    {
      title: t.sidebar.nav.operations,
      url: "#",
      icon: ShoppingCart,
      items: [
        {
          title: t.sidebar.nav.kitchen,
          url: "#",
        },
        {
          title: t.sidebar.nav.restock,
          url: "#",
        },
      ],
    },
    {
      title: t.sidebar.nav.reports,
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: t.sidebar.nav.transactionReport,
          url: "#",
        },
      ],
    },
  ]

  const userData = {
    name: user?.name || "Guest",
    email: user?.email || "guest@example.com",
    avatar: "/avatars/shadcn.jpg",
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

