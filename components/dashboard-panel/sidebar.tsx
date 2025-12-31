"use client";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { SidebarToggle } from "./sidebar-toggle";
import { Menu } from "./menu";
import Image from "next/image";

interface SidebarProps {
  backgroundColor: string;
  textColor: string;
  activeColor: string;
  activeHoverColor: string;
  title: string;
  dashboardHref: string;
  unit?: string;
}

export function Sidebar({
  backgroundColor,
  textColor,
  activeColor,
  activeHoverColor,
  title,
  dashboardHref,
  unit,
}: SidebarProps) {
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;
  const { isOpen, toggleOpen, getOpenState, setIsHover, settings } = sidebar;
  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen -translate-x-full tablet-landscape-max:translate-x-0 transition-[width] ease-in-out duration-300",
        !getOpenState() ? "w-[90px]" : "w-60",
        settings.disabled && "hidden",
        backgroundColor,
        textColor
      )}
    >
      <SidebarToggle isOpen={isOpen} setIsOpen={toggleOpen} />
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="relative h-full flex flex-col px-3 py-4 overflow-y-hidden shadow-md"
      >
        <div className="">
          <Button
            className={cn(
              "transition-transform ease-in-out duration-300 mb-1",
              !getOpenState() ? "translate-x-1" : "translate-x-0"
            )}
            variant="linkMenu"
            asChild
          >
            <Link href={dashboardHref} className="flex items-center gap-2">
              <div className="bg-slate-200 p-1.5 mr-2 shrink-0 rounded-md">
                <Image
                  src={"/logocm.png"}
                  width={50}
                  height={50}
                  className="w-6 h-6 shrink-0 object-contain"
                  alt="logo"
                  priority
                />
              </div>
              {/* <PanelsTopLeft className="w-6 h-6 mr-1" /> */}
              <div
                className={cn(
                  "font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300",
                  !getOpenState()
                    ? "-translate-x-96 opacity-0 hidden"
                    : "translate-x-0 opacity-100",
                  textColor
                )}
              >
                <h1>{title}</h1>
                <p className="text-xs text-slate-500">
                  {unit || "SmartSchool Portal"}
                </p>
              </div>
            </Link>
          </Button>
        </div>
        <Menu
          isOpen={getOpenState()}
          activeColor={activeColor}
          activeHoverColor={activeHoverColor}
        />
      </div>
    </aside>
  );
}
