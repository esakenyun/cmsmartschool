import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Teacher } from "@/features/teachers/data/data-teacher";

// Define the shape of dummy activity data to match what's used in the view
// In a real app, this would come from the API/Arguments
interface ActivityData {
  presensi: { date: string; time: string; status: string }[];
  mutabaah: { activity: string; status: string }[];
  jurnal: { materi: string; sub: string; status: string }[];
}

interface jsPDFWithAutoTable extends jsPDF {
  lastAutoTable: { finalY: number };
}

export const generateTeacherReportPDF = (guru: Teacher, data: ActivityData) => {
  const doc = new jsPDF() as jsPDFWithAutoTable;

  // Header
  doc.setFontSize(18);
  doc.text("Laporan Kinerja Guru", 14, 20);

  doc.setFontSize(12);
  doc.text(`Nama: ${guru.name}`, 14, 30);
  doc.text(`Peran: ${guru.role}`, 14, 36);
  doc.text(`Sekolah: SMP Cendekia Muda`, 14, 42);
  doc.line(14, 46, 196, 46); // Horizontal line

  let finalY = 50;

  // 1. Presensi Section
  doc.setFontSize(14);
  doc.text("Laporan Presensi Kehadiran", 14, finalY);

  autoTable(doc, {
    startY: finalY + 5,
    head: [["Tanggal", "Jam Masuk", "Status"]],
    body: data.presensi.map((item) => [item.date, item.time, item.status]),
    theme: "striped",
    headStyles: { fillColor: [16, 185, 129] }, // Emerald-500
  });

  // Get Y position after table
  finalY = doc.lastAutoTable.finalY + 15;

  // 2. Mutabaah Section
  doc.setFontSize(14);
  doc.text("Laporan Mutabaah Yaumiyah", 14, finalY);

  autoTable(doc, {
    startY: finalY + 5,
    head: [["Aktivitas", "Status"]],
    body: data.mutabaah.map((item) => [item.activity, item.status]),
    theme: "striped",
    headStyles: { fillColor: [139, 92, 246] }, // Violet-500
  });

  finalY = doc.lastAutoTable.finalY + 15;

  // 3. Jurnal Section
  // Check if we need a new page
  if (finalY > 250) {
    doc.addPage();
    finalY = 20;
  }

  doc.setFontSize(14);
  doc.text("Laporan Jurnal Mengajar", 14, finalY);

  autoTable(doc, {
    startY: finalY + 5,
    head: [["Materi", "Sub Materi", "Status"]],
    body: data.jurnal.map((item) => [item.materi, item.sub, item.status]),
    theme: "striped",
    headStyles: { fillColor: [59, 130, 246] }, // Blue-500
  });

  // Save
  doc.save(`Laporan_Kinerja_${guru.name.replace(/\s+/g, "_")}.pdf`);
};
