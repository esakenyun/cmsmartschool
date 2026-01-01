"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange, RangeKeyDict } from "react-date-range";
import { cn } from "@/lib/utils";
import { id } from "date-fns/locale";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

interface DateRangePickerProps {
  date: {
    startDate: Date;
    endDate: Date;
    key: string;
  };
  setDate: (date: { startDate: Date; endDate: Date; key: string }) => void;
  className?: string;
  align?: "start" | "center" | "end";
}

export function DateRangePicker({
  date,
  setDate,
  className,
  align = "start",
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (ranges: RangeKeyDict) => {
    const selection = ranges.selection;
    setDate({
      startDate: selection.startDate || new Date(),
      endDate: selection.endDate || new Date(),
      key: "selection",
    });
  };

  const alignmentClasses = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0",
  };

  return (
    <div className={cn("relative grid gap-2", className)} ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-start text-left font-normal border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none w-[260px] bg-white transition-colors hover:bg-slate-50",
          !date && "text-muted-foreground"
        )}
      >
        <CalendarIcon className="mr-2 h-4 w-4 text-emerald-600" />
        {date?.startDate ? (
          date.endDate ? (
            <>
              {format(date.startDate, "LLL dd, y", { locale: id })} -{" "}
              {format(date.endDate, "LLL dd, y", { locale: id })}
            </>
          ) : (
            format(date.startDate, "LLL dd, y", { locale: id })
          )
        ) : (
          <span>Pilih Periode Tanggal</span>
        )}
      </button>
      {isOpen && (
        <div
          className={cn(
            "absolute top-full mt-2 z-50 p-0 bg-white border border-slate-200 rounded-lg shadow-lg animate-in fade-in zoom-in-95 duration-200 overflow-hidden",
            alignmentClasses[align]
          )}
        >
          <DateRange
            ranges={[date]}
            onChange={handleSelect}
            months={1}
            direction="horizontal"
            rangeColors={["#059669"]} // Emerald-600
          />
        </div>
      )}
    </div>
  );
}
