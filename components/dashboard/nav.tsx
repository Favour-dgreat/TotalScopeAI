"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  MessageCircle,
  BarChart,
  Settings,
  History,
  Star,
  ImageIcon,
  Twitter,
  Hash
} from 'lucide-react'

const items = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Content Creator",
    href: "/dashboard/content",
    icon: MessageCircle,
    subItems: [
      {
        title: "Tweets",
        href: "/dashboard/content/tweets",
        icon: Twitter,
      },
      {
        title: "Community Posts",
        href: "/dashboard/content/community",
        icon: MessageCircle,
      },
      {
        title: "Memes",
        href: "/dashboard/content/memes",
        icon: ImageIcon,
      },
      {
        title: "Hashtags",
        href: "/dashboard/content/hashtags",
        icon: Hash,
      },
    ],
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart,
  },
  {
    title: "History",
    href: "/dashboard/history",
    icon: History,
  },
  {
    title: "Favorites",
    href: "/dashboard/favorites",
    icon: Star,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardNav() {
  const pathname = usePathname()
  
  return (
    <nav className="hidden md:block w-64 border-r bg-muted/20 p-6">
      <div className="space-y-4">
        <div className="py-2">
          <h4 className="mb-5 text-sm font-medium leading-none text-muted-foreground">
            Content Creation
          </h4>
          <div className="space-y-10 pt-2">
            {items.map((item) => (
              <div key={item.href}>
                <Link href={item.href}>
                  <span
                    className={cn(
                      "group flex items-center rounded-md px-3 py-2 text-m font-medium hover:bg-accent hover:text-accent-foreground",
                      pathname === item.href ? "bg-accent text-accent-foreground" : "transparent"
                    )}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.title}
                  </span>
                </Link>
                
                {item.subItems && (
                  <div className="ml-4 mt-1 space-y-5">
                    {item.subItems.map((subItem) => (
                      <Link key={subItem.href} href={subItem.href}>
                        <span
                          className={cn(
                            "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                            pathname === subItem.href ? "bg-accent/50 text-accent-foreground" : "transparent"
                          )}
                        >
                          <subItem.icon className="mr-2 h-4 w-4" />
                          {subItem.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}