"use client";
import Link from "next/link";
import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Menu } from "@/components/dashboard-panel/menu";
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useRoleSettings } from "@/features/auth/hooks/use-role-settings";

interface SheetMenuProps {
  unit?: string;
}

export function SheetMenu({ unit }: SheetMenuProps) {
  const {
    sidebarBg,
    sidebarText,
    activeColor,
    activeHoverColor,
    roleTitle,
    dashboardHref,
  } = useRoleSettings();

  return (
    <Sheet>
      <SheetTrigger className="tablet-landscape-max:hidden" asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent
        className={cn(
          "sm:w-72 px-3 h-full flex flex-col",
          sidebarBg,
          sidebarText
        )}
        side="left"
      >
        <SheetHeader className="mt-5 flex items-start">
          <Link href={dashboardHref} className="flex items-center gap-2">
            <div className="bg-slate-200 p-1.5 mr-2 shrink-0 rounded-md">
              <Image
                src={"/logocm.png"}
                width={50}
                height={50}
                className="w-6 h-6"
                alt="logo"
                priority
              />
            </div>
            {/* <PanelsTopLeft className="w-6 h-6 mr-1" /> */}
            <div className="flex flex-col">
              <SheetTitle className={cn("font-bold text-lg", sidebarText)}>
                {roleTitle}
              </SheetTitle>
              <p className="text-xs text-slate-500">
                {unit || "SmartSchool Portal"}
              </p>
            </div>
          </Link>

          <SheetDescription className="sr-only">
            Sidebar Navigation Mobile
          </SheetDescription>
        </SheetHeader>
        <Menu
          isOpen
          activeColor={activeColor}
          activeHoverColor={activeHoverColor}
        />
      </SheetContent>
    </Sheet>
  );
}
