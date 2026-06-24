"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Map, Clock, Users, Shield, TrendingUp, Handshake, Newspaper,
} from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const ICONS = { LayoutDashboard, Map, Clock, Users, Shield, TrendingUp, Handshake, Newspaper };

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-slate-800 bg-slate-950 p-4">
      <div className="mb-8">
        <h1 className="text-sm font-bold tracking-wide text-amber-400">US-IRAN WAR TRACKER</h1>
        <p className="text-xs text-slate-500">Operation Epic Fury</p>
      </div>
      <nav className="flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const Icon = ICONS[item.icon as keyof typeof ICONS];
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
              active ? "bg-slate-800 text-amber-300" : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
            )}>
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <p className="mt-4 text-[10px] leading-relaxed text-slate-600">
        Aggregated OSINT tracker. Not an official government source. All figures link to primary sources.
      </p>
    </aside>
  );
}
