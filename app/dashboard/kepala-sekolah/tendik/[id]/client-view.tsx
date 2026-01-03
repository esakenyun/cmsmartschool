"use client";

import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Teacher } from "@/features/teachers/data/data-teacher";
import { Download, Clock, BookOpen, FileText, ArrowLeft } from "lucide-react";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import ReactECharts from "echarts-for-react";
import {
  getDetailPresensiOption,
  getActivityPieOption,
} from "@/features/principal/chart-options";
import { DetailCard } from "@/features/principal/components/detail-card";
import { generateTeacherReportPDF } from "@/features/principal/utils/pdf-generator";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getTeacherDetailData } from "@/features/teachers/utils/data-mapper";
import { TendikDetailData } from "@/features/teachers/schemas/tendik-detail-schema";
import { PresensiTable } from "@/features/teachers/tables/presensi-table";
import { MutabaahTable } from "@/features/teachers/tables/mutabaah-table";
import { JurnalTable } from "@/features/teachers/tables/jurnal-table";
import ProgressBar from "@/features/teachers/components/progress-bar";

export default function TendikKepalaSekolahContent({
  guru,
  initialData, // This is now ALL data for the teacher given by page.tsx
  initialDateRange,
}: {
  guru: Teacher;
  initialData: TendikDetailData;
  initialDateRange: { from: Date; to: Date };
}) {
  const router = useRouter();
  const [dateRange, setDateRange] = useState({
    startDate: initialDateRange.from,
    endDate: initialDateRange.to,
    key: "selection",
  });

  // Client-side filtering logic
  // Update handleDateChange to just set state, NO router push
  const handleDateChange = (newRange: {
    startDate: Date;
    endDate: Date;
    key: string;
  }) => {
    setDateRange(newRange);
  };

  // Filter the initialData (which is full history) based on current dateRange
  const detailData = useMemo(() => {
    if (!dateRange.startDate || !dateRange.endDate) return initialData;
    return getTeacherDetailData(
      initialData,
      guru.name,
      dateRange.startDate,
      dateRange.endDate
    );
  }, [initialData, guru.name, dateRange]);

  // Calculate real stats from the filtered detailData
  const chartStats = useMemo(() => {
    // 1. Presensi Stats
    const totalOnTime = detailData.attendance.filter(
      (d) => d.reportKehadiran === "Tepat Waktu"
    ).length;
    const totalLate = detailData.attendance.filter(
      (d) => d.reportKehadiran === "Terlambat"
    ).length;

    // 2. Mutabaah Stats (Progress Bars Calculation)
    const mutabaahStats = {
      shalatWajib: 0,
      duha: 0,
      tilawah: 0,
      shaum: 0,
      sedekah: 0,
    };

    detailData.mutabaah.forEach((d) => {
      // Shalat Wajib: check if all 5 are valid (not "0", "-", null)
      const prayers = [
        "shalatSubuh",
        "shalatDzuhur",
        "shalatAshar",
        "shalatMaghrib",
        "shalatIsya",
      ] as const;

      const allPrayersDone = prayers.every((p) => {
        const val = d[p as keyof typeof d];
        return val && val !== "0" && val !== "-";
      });
      if (allPrayersDone) mutabaahStats.shalatWajib++;

      // Duha
      if (d.shalatDhuha === "YA") mutabaahStats.duha++;

      // Tilawah (pages)
      const pages = parseInt(d.tilawah);
      if (!isNaN(pages)) mutabaahStats.tilawah += pages;

      // Shaum
      if (d.shaum === "YA") mutabaahStats.shaum++;

      // Sedekah
      if (d.sedekah === "YA") mutabaahStats.sedekah++;
    });

    // 3. Journal Stats Breakdown
    const journalBreakdown = {
      sesi1: {} as Record<string, number>,
      sesi2: {} as Record<string, number>,
      sesi3: {} as Record<string, number>,
      sesi4: {} as Record<string, number>,
      sesi5: {} as Record<string, number>,
      tambahan: {} as Record<string, number>,
    };

    const processSession = (
      sessionKey: keyof typeof journalBreakdown,
      value: string
    ) => {
      if (!value || value === "-" || value === "0") {
        const key = "[Kosong]";
        journalBreakdown[sessionKey][key] =
          (journalBreakdown[sessionKey][key] || 0) + 1;
        return;
      }
      journalBreakdown[sessionKey][value] =
        (journalBreakdown[sessionKey][value] || 0) + 1;
    };

    detailData.journal.forEach((d) => {
      processSession("sesi1", d.sesi1);
      processSession("sesi2", d.sesi2);
      processSession("sesi3", d.sesi3);
      processSession("sesi4", d.sesi4);
      processSession("sesi5", d.sesi5);
      processSession("tambahan", d.tambahan);
    });

    return {
      presensi: { onTime: totalOnTime, late: totalLate },
      mutabaah: mutabaahStats,
      journal: journalBreakdown,
    };
  }, [detailData]);

  const presensiOnTime = chartStats.presensi.onTime;
  const presensiLate = chartStats.presensi.late;

  // Helper to transform dictionary to array of objects for ECharts
  const xf = (record: Record<string, number>) =>
    Object.entries(record).map(([name, value]) => ({ name, value }));

  const handleDownloadPDF = () => {
    toast.info("Sedang membuat PDF...");
    try {
      generateTeacherReportPDF(guru, {
        presensi: detailData.attendance.map((d) => ({
          date: d.tanggal,
          time: d.waktu,
          status: d.reportKehadiran,
          color: "",
        })),
        mutabaah: detailData.mutabaah.map(() => ({
          activity: "Total Ibadah",
          status: "Detail di Tabel",
          color: "",
        })),
        jurnal: detailData.journal.map((d) => ({
          materi: d.sesi1,
          sub: d.keterangan,
          status: d.kehadiran,
          color: "",
        })),
      });
      toast.success("PDF berhasil diunduh");
    } catch (error) {
      console.error(error);
      toast.error("Gagal membuat PDF");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between gap-4">
        <div className="flex gap-2 items-center">
          <Link
            href="/dashboard/kepala-sekolah/tendik"
            className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{guru.name}</h1>
            <p className="text-sm font-medium text-emerald-600">{guru.role}</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <DateRangePicker date={dateRange} setDate={handleDateChange} />
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto justify-center"
          >
            <Download className="w-4 h-4" />
            <span className="">Unduh PDF</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Presensi Card */}
        <DetailCard
          title="Presensi Kehadiran"
          subtitle="Rekapitulasi Periode Ini"
          icon={<Clock className="w-5 h-5" />}
          chartOption={getDetailPresensiOption(presensiOnTime, presensiLate)}
          tableTitle="Riwayat Presensi"
        >
          <PresensiTable data={detailData.attendance} />
        </DetailCard>

        {/* Mutabaah Card - Custom Progress Bars */}
        <DetailCard
          title="Mutabaah Yaumiyah"
          subtitle="Ibadah Harian"
          icon={<BookOpen className="w-5 h-5 text-violet-600" />}
          tableTitle="Riwayat Mutabaah"
          customChartContent={
            <div className="w-full max-w-lg mx-auto py-4">
              <ProgressBar
                label="Shalat Wajib (5 Waktu)"
                value={chartStats.mutabaah.shalatWajib}
                target={30}
                colorClass="bg-violet-600"
              />
              <ProgressBar
                label="Shalat Dhuha"
                value={chartStats.mutabaah.duha}
                target={20}
                colorClass="bg-blue-500"
              />
              <ProgressBar
                label="Tilawah (Lembar)"
                value={chartStats.mutabaah.tilawah}
                target={50}
                colorClass="bg-emerald-500"
              />
              <ProgressBar
                label="Shaum Sunnah"
                value={chartStats.mutabaah.shaum}
                target={5}
                colorClass="bg-amber-500"
              />
              <ProgressBar
                label="Sedekah"
                value={chartStats.mutabaah.sedekah}
                target={15}
                colorClass="bg-pink-500"
              />
            </div>
          }
        >
          <MutabaahTable data={detailData.mutabaah} />
        </DetailCard>

        {/* Jurnal Card */}
        <DetailCard
          title="Jurnal Mengajar"
          subtitle="Aktivitas per Sesi"
          icon={<FileText className="w-5 h-5 text-blue-600" />}
          tableTitle="Riwayat Jurnal"
          customChartContent={
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="h-[250px]">
                <ReactECharts
                  option={getActivityPieOption(
                    xf(chartStats.journal.sesi1),
                    "Sesi 1"
                  )}
                  style={{ height: "100%", width: "100%" }}
                />
              </div>
              <div className="h-[250px]">
                <ReactECharts
                  option={getActivityPieOption(
                    xf(chartStats.journal.sesi2),
                    "Sesi 2"
                  )}
                  style={{ height: "100%", width: "100%" }}
                />
              </div>
              <div className="h-[250px]">
                <ReactECharts
                  option={getActivityPieOption(
                    xf(chartStats.journal.sesi3),
                    "Sesi 3"
                  )}
                  style={{ height: "100%", width: "100%" }}
                />
              </div>
              <div className="h-[250px]">
                <ReactECharts
                  option={getActivityPieOption(
                    xf(chartStats.journal.sesi4),
                    "Sesi 4"
                  )}
                  style={{ height: "100%", width: "100%" }}
                />
              </div>
              <div className="h-[250px]">
                <ReactECharts
                  option={getActivityPieOption(
                    xf(chartStats.journal.sesi5),
                    "Sesi 5"
                  )}
                  style={{ height: "100%", width: "100%" }}
                />
              </div>
              <div className="h-[250px]">
                <ReactECharts
                  option={getActivityPieOption(
                    xf(chartStats.journal.tambahan),
                    "Tambahan"
                  )}
                  style={{ height: "100%", width: "100%" }}
                />
              </div>
            </div>
          }
        >
          <JurnalTable data={detailData.journal} />
        </DetailCard>
      </div>
    </div>
  );
}
