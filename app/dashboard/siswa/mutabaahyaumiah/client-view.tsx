"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { MOCK_MUTABAAH_DATA } from "../../../../features/students/data/mutabaah-dummy";
import { MutabaahRecapTable } from "../../../../features/students/components/mutabaah-recap-table";
import { MutabaahTargetTable } from "../../../../features/students/components/mutabaah-target-table";

export default function MutabaahYaumiahSiswaContent() {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().slice(0, 7),
  );

  const [pickerYear, setPickerYear] = useState<number>(
    parseInt(selectedDate.split("-")[0]),
  );

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agt",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            Rekapitulasi Mutabaah Yaumiah
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <button
                className={cn(
                  "flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 transition-colors text-sm font-medium text-slate-700",
                  !selectedDate && "text-slate-400",
                )}
              >
                <CalendarIcon className="w-4 h-4 text-slate-500" />
                <span>
                  {selectedDate
                    ? format(new Date(selectedDate + "-01"), "MMMM yyyy", {
                        locale: id,
                      })
                    : "Pilih Periode"}
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-[280px] p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setPickerYear((prev) => prev - 1)}
                    className="p-1 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 text-slate-600" />
                  </button>
                  <span className="font-semibold text-slate-800">
                    {pickerYear}
                  </span>
                  <button
                    onClick={() => setPickerYear((prev) => prev + 1)}
                    className="p-1 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-slate-600" />
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {months.map((month, index) => {
                    const isSelected =
                      selectedDate ===
                      `${pickerYear}-${String(index + 1).padStart(2, "0")}`;
                    const isCurrentMonth =
                      new Date().getFullYear() === pickerYear &&
                      new Date().getMonth() === index;

                    return (
                      <button
                        key={month}
                        onClick={() => {
                          setSelectedDate(
                            `${pickerYear}-${String(index + 1).padStart(2, "0")}`,
                          );
                          setIsPopoverOpen(false);
                        }}
                        className={cn(
                          "py-2 text-sm rounded-md transition-colors",
                          isSelected
                            ? "bg-slate-900 text-white shadow-sm"
                            : isCurrentMonth
                              ? "bg-slate-100 text-slate-900 font-medium"
                              : "hover:bg-slate-50 text-slate-600",
                        )}
                      >
                        {month}
                      </button>
                    );
                  })}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="mt-6">
        {" "}
        {/* Spacing for Target Table */}
        <MutabaahTargetTable data={MOCK_MUTABAAH_DATA} />
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-semibold text-slate-700 mb-3">
          Detail Harian
        </h3>
        <MutabaahRecapTable data={MOCK_MUTABAAH_DATA} />
      </div>
    </div>
  );
}
