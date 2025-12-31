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
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface SheetMenuProps {
  unit?: string;
}

export function SheetMenu({ unit }: SheetMenuProps) {
  const pathname = usePathname();
  let sidebarBg = "bg-white"; // default
  let sidebarText = "text-black";
  let activeColor = "bg-emerald-500 text-white";
  let activeHoverColor = "hover:bg-emerald-500 hover:text-white";
  let roleTitle = "Smart School";
  let dashboardHref = "/dashboard";

  if (pathname.includes("/dashboard/pimpinan")) {
    sidebarBg = "bg-slate-900";
    sidebarText = "text-white";
    activeColor = "bg-indigo-500 text-white";
    activeHoverColor = "hover:bg-indigo-500 hover:text-white";
    roleTitle = "Pimpinan";
    dashboardHref = "/dashboard/pimpinan";
  } else if (pathname.includes("/dashboard/kepala-sekolah")) {
    sidebarBg = "bg-blue-900";
    sidebarText = "text-white";
    activeColor = "bg-blue-500 text-white";
    activeHoverColor = "hover:bg-blue-500 hover:text-white";
    roleTitle = "Kepala Sekolah";
    dashboardHref = "/dashboard/kepala-sekolah";
  } else if (pathname.includes("/dashboard/guru")) {
    sidebarBg = "bg-white";
    sidebarText = "text-black";
    activeColor = "bg-emerald-500 text-white";
    activeHoverColor = "hover:bg-emerald-500 hover:text-white";
    roleTitle = "Guru";
    dashboardHref = "/dashboard/guru";
  } else if (pathname.includes("/dashboard/siswa")) {
    sidebarBg = "bg-white";
    sidebarText = "text-black";
    activeColor = "bg-orange-500 text-white";
    activeHoverColor = "hover:bg-orange-500 hover:text-white";
    roleTitle = "Siswa";
    dashboardHref = "/dashboard/siswa";
  }

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
