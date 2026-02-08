"use client";

import { DetailCard } from "@/features/principal/components/detail-card";
import { PresensiTable } from "@/features/students/components/presensi-table";
import { PresensiStats } from "@/features/students/components/presensi-stats";
import { getDetailPresensiOption } from "@/features/students/utils/chart-options";
import {
  generateDummyAttendance,
  DUMMY_STUDENTS,
} from "@/features/students/data/presensi-dummy";
import {
  Clock,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useMemo } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default function PresensiSiswaContent() {
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

  // Mock logged-in student (First student in dummy data)
  const currentStudent = DUMMY_STUDENTS[0];

  // Generate and filter data based on selected month and current student
  const filteredData = useMemo(() => {
    const [year, month] = selectedDate.split("-").map(Number);
    // Generate data for the selected month
    const monthlyData = generateDummyAttendance(month, year);
    // Filter for current student
    return monthlyData.filter((d) => d.studentId === currentStudent.id);
  }, [selectedDate, currentStudent.id]);

  // Calculate stats
  const hadir = filteredData.filter((d) => d.status === "Hadir").length;
  const sakit = filteredData.filter((d) => d.status === "Sakit").length;
  const izin = filteredData.filter((d) => d.status === "Izin").length;
  const alpha = filteredData.filter((d) => d.status === "Alpha").length;
  const terlambat = filteredData.filter((d) => d.status === "Terlambat").length;

  // Calculate effective working days in the selected month (excluding weekends)
  // Fixed target of 20 days as requested
  const totalDays = 20;

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            Rekapitulasi Kehadiran
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

      <PresensiStats
        hadir={hadir}
        sakit={sakit}
        izin={izin}
        alpha={alpha}
        terlambat={terlambat}
        totalDays={totalDays}
      />

      <div className="grid grid-cols-1 gap-6">
        <div className="w-full">
          <DetailCard
            title="Detail Presensi"
            subtitle="Grafik & Riwayat kehadiran bulan ini"
            icon={<Clock className="w-5 h-5" />}
            tableTitle="Log Harian"
            chartOption={getDetailPresensiOption(
              hadir,
              sakit,
              izin,
              alpha,
              terlambat,
            )}
          >
            <PresensiTable data={filteredData} />
          </DetailCard>
        </div>
      </div>
    </div>
  );
}
