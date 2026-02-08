import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { MutabaahRecapitulation } from "../types/mutabaah-types";

interface MutabaahRecapTableProps {
  data: MutabaahRecapitulation[];
}

export function MutabaahRecapTable({ data }: MutabaahRecapTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <div className="min-w-[3000px]">
          {" "}
          {/* Container to ensure scroll width */}
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="text-slate-500 bg-slate-50/50 font-semibold">
              {/* Top Level Headers */}
              <tr className="border-b border-slate-200">
                <th
                  rowSpan={2}
                  className="px-4 py-3 border-r border-slate-200 font-semibold text-center sticky left-0 z-20 bg-slate-50"
                >
                  BULAN
                </th>
                <th
                  rowSpan={2}
                  className="px-4 py-3 border-r border-slate-200 font-semibold text-center"
                >
                  TANGGAL & JAM
                </th>
                <th
                  rowSpan={2}
                  className="px-4 py-3 border-r border-slate-200 font-semibold text-center"
                >
                  TANGGAL
                </th>
                <th
                  rowSpan={2}
                  className="px-4 py-3 border-r border-slate-200 font-semibold text-center"
                >
                  NIS
                </th>
                <th
                  rowSpan={2}
                  className="px-4 py-3 border-r border-slate-200 font-semibold text-center"
                >
                  NAMA SISWA
                </th>
                <th
                  rowSpan={2}
                  className="px-4 py-3 border-r border-slate-200 font-semibold text-center"
                >
                  JABATAN
                </th>
                <th
                  rowSpan={2}
                  className="px-4 py-3 border-r border-slate-200 font-semibold text-center"
                >
                  KELAS
                </th>
                <th
                  rowSpan={2}
                  className="px-4 py-3 border-r border-slate-200 font-semibold text-center"
                >
                  EMAIL USER
                </th>
                <th
                  rowSpan={2}
                  className="px-4 py-3 border-r border-slate-200 font-semibold text-center"
                >
                  EMAIL KEPALA SEKOLAH
                </th>
                <th
                  rowSpan={2}
                  className="px-4 py-3 border-r border-slate-200 font-semibold text-center"
                >
                  EMAIL WAKIL KEPALA SEKOLAH
                </th>
                <th
                  rowSpan={2}
                  className="px-4 py-3 border-r border-slate-200 font-semibold text-center"
                >
                  EMAIL GURU KELAS
                </th>

                <th
                  colSpan={5}
                  className="px-4 py-3 border-r border-slate-200 font-semibold text-center bg-blue-50 text-blue-700"
                >
                  SHALAT FARDHU
                </th>
                <th
                  colSpan={6}
                  className="px-4 py-3 border-r border-slate-200 font-semibold text-center bg-green-50 text-green-700"
                >
                  SHALAT RAWATIB
                </th>
                <th
                  colSpan={4}
                  className="px-4 py-3 border-r border-slate-200 font-semibold text-center bg-purple-50 text-purple-700"
                >
                  SHALAT SUNNAH
                </th>
                <th
                  colSpan={2}
                  className="px-4 py-3 border-r border-slate-200 font-semibold text-center bg-yellow-50 text-yellow-700"
                >
                  SHAUM (PUASA)
                </th>
                <th
                  colSpan={2}
                  className="px-4 py-3 border-r border-slate-200 font-semibold text-center bg-orange-50 text-orange-700"
                >
                  ITIKAF
                </th>
                <th
                  colSpan={4}
                  className="px-4 py-3 border-r border-slate-200 font-semibold text-center bg-red-50 text-red-700"
                >
                  RAMADHAN
                </th>
                <th
                  colSpan={2}
                  className="px-4 py-3 border-r border-slate-200 font-semibold text-center bg-teal-50 text-teal-700"
                >
                  BUDAYA LITERASI
                </th>
                <th
                  colSpan={2}
                  className="px-4 py-3 border-r border-slate-200 font-semibold text-center bg-indigo-50 text-indigo-700"
                >
                  MENGIKUTI KAJIAN
                </th>
                <th
                  colSpan={6}
                  className="px-4 py-3 border-r border-slate-200 font-semibold text-center bg-pink-50 text-pink-700"
                >
                  AMALAN LAIN
                </th>
                <th
                  colSpan={5}
                  className="px-4 py-3 border-r border-slate-200 font-semibold text-center bg-cyan-50 text-cyan-700"
                >
                  INTERAKSI DENGAN QURAN
                </th>
              </tr>

              {/* Sub Headers */}
              <tr className="border-b border-slate-200">
                {/* SHALAT FARDHU */}
                <th className="px-4 py-3 border-r border-slate-200 text-center bg-blue-50/50">
                  SHUBUH
                </th>
                <th className="px-4 py-3 border-r border-slate-200 text-center bg-blue-50/50">
                  ZHUHUR
                </th>
                <th className="px-4 py-3 border-r border-slate-200 text-center bg-blue-50/50">
                  ASHAR
                </th>
                <th className="px-4 py-3 border-r border-slate-200 text-center bg-blue-50/50">
                  MAGHRIB
                </th>
                <th className="px-4 py-3 border-r border-slate-200 text-center bg-blue-50/50">
                  ISYA
                </th>

                {/* SHALAT RAWATIB */}
                <th className="px-4 py-3 border-r border-slate-200 text-center bg-green-50/50">
                  QABLIYAH SHUBUH
                </th>
                <th className="px-4 py-3 border-r border-slate-200 text-center bg-green-50/50">
                  QABLIYAH ZHUHUR
                </th>
                <th className="px-4 py-3 border-r border-slate-200 text-center bg-green-50/50">
                  BADA ZHUHUR
                </th>
                <th className="px-4 py-3 border-r border-slate-200 text-center bg-green-50/50">
                  QABLIYAH ASHAR
                </th>
                <th className="px-4 py-3 border-r border-slate-200 text-center bg-green-50/50">
                  BADA MAGHRIB
                </th>
                <th className="px-4 py-3 border-r border-slate-200 text-center bg-green-50/50">
                  BADA ISYA
                </th>

                {/* SHALAT SUNNAH */}
                <th className="px-4 py-3 border-r border-slate-200 text-center bg-purple-50/50">
                  DHUHA
                </th>
                <th className="px-4 py-3 border-r border-slate-200 text-center bg-purple-50/50">
                  WITIR
                </th>
                <th className="px-4 py-3 border-r border-slate-200 text-center bg-purple-50/50">
                  TAHAJUD
                </th>
                <th className="px-4 py-3 border-r border-slate-200 text-center bg-purple-50/50">
                  TARAWIH
                </th>

                {/* SHAUM */}
                <th className="px-4 py-3 border-r border-slate-200 text-center bg-yellow-50/50">
                  SHAUM
                </th>
                <th className="px-4 py-3 border-r border-slate-200 text-center bg-yellow-50/50">
                  KETERANGAN SHAUM SUNNAH
                </th>

                {/* ITIKAF */}
                <th className="px-4 py-3 border-r border-slate-200 text-center bg-orange-50/50">
                  ITIKAF
                </th>
                <th className="px-4 py-3 border-r border-slate-200 text-center bg-orange-50/50">
                  LOKASI ITIKAF
                </th>

                {/* RAMADHAN */}
                <th className="px-4 py-3 border-r border-slate-200 text-center bg-red-50/50">
                  SHAUM RAMADHAN
                </th>
                <th className="px-4 py-3 border-r border-slate-200 text-center bg-red-50/50">
                  YAUMUL BIDH
                </th>
                <th className="px-4 py-3 border-r border-slate-200 text-center bg-red-50/50">
                  LAINNYA
                </th>
                <th className="px-4 py-3 border-r border-slate-200 text-center bg-red-50/50">
                  KETERANGAN PUASA
                </th>

                {/* BUDAYA LITERASI */}
                <th className="px-4 py-3 border-r border-slate-200 text-center bg-teal-50/50">
                  MEMBACA
                </th>
                <th className="px-4 py-3 border-r border-slate-200 text-center bg-teal-50/50">
                  KETERANGAN MEMBACA
                </th>

                {/* MENGIKUTI KAJIAN */}
                <th className="px-4 py-3 border-r border-slate-200 text-center bg-indigo-50/50">
                  MEDIA
                </th>
                <th className="px-4 py-3 border-r border-slate-200 text-center bg-indigo-50/50">
                  JUDUL KAJIAN
                </th>

                {/* AMALAN LAIN */}
                <th className="px-4 py-3 border-r border-slate-200 text-center bg-pink-50/50">
                  AL MATSURAT PAGI
                </th>
                <th className="px-4 py-3 border-r border-slate-200 text-center bg-pink-50/50">
                  AL MATSURAT PETANG
                </th>
                <th className="px-4 py-3 border-r border-slate-200 text-center bg-pink-50/50">
                  INFAQ
                </th>
                <th className="px-4 py-3 border-r border-slate-200 text-center bg-pink-50/50">
                  BERSOSIALISASI DENGAN TETANGGA
                </th>
                <th className="px-4 py-3 border-r border-slate-200 text-center bg-pink-50/50">
                  TIDUR DALAM KEADAAN BERWUDHU
                </th>
                <th className="px-4 py-3 border-r border-slate-200 text-center bg-pink-50/50">
                  OLAHRAGA MANDIRI
                </th>

                {/* INTERAKSI DENGAN QURAN */}
                <th className="px-4 py-3 border-r border-slate-200 text-center bg-cyan-50/50">
                  TILAWAH (HAL)
                </th>
                <th className="px-4 py-3 border-r border-slate-200 text-center bg-cyan-50/50">
                  MUROJAAH (HAL)
                </th>
                <th className="px-4 py-3 border-r border-slate-200 text-center bg-cyan-50/50">
                  ZIYADAH (JUZ/SURAH)
                </th>
                <th className="px-4 py-3 border-r border-slate-200 text-center bg-cyan-50/50">
                  AYAT
                </th>
                <th className="px-4 py-3 border-slate-200 text-center bg-cyan-50/50">
                  MEMBACA TERJEMAH (HAL)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paginatedData.map((item, index) => (
                <tr key={index} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 border-r border-slate-200 font-medium text-slate-700 bg-white sticky left-0 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] text-center">
                    {item.bulan}
                  </td>
                  <td className="px-4 py-3 border-r border-slate-200 text-center text-slate-500">
                    {item.tanggal_jam}
                  </td>
                  <td className="px-4 py-3 border-r border-slate-200 text-center text-slate-500">
                    {item.tanggal}
                  </td>
                  <td className="px-4 py-3 border-r border-slate-200 text-center text-slate-500">
                    {item.nis}
                  </td>
                  <td className="px-4 py-3 border-r border-slate-200 font-medium text-slate-700 whitespace-nowrap">
                    {item.nama_siswa}
                  </td>
                  <td className="px-4 py-3 border-r border-slate-200 text-center text-slate-500">
                    {item.jabatan}
                  </td>
                  <td className="px-4 py-3 border-r border-slate-200 text-center text-slate-500">
                    {item.kelas}
                  </td>
                  <td
                    className="px-4 py-3 border-r border-slate-200 text-slate-500 truncate max-w-[200px]"
                    title={item.email_user}
                  >
                    {item.email_user}
                  </td>
                  <td
                    className="px-4 py-3 border-r border-slate-200 text-slate-500 truncate max-w-[200px]"
                    title={item.email_kepala_sekolah}
                  >
                    {item.email_kepala_sekolah}
                  </td>
                  <td
                    className="px-4 py-3 border-r border-slate-200 text-slate-500 truncate max-w-[200px]"
                    title={item.email_wakil_kepala_sekolah}
                  >
                    {item.email_wakil_kepala_sekolah}
                  </td>
                  <td
                    className="px-4 py-3 border-r border-slate-200 text-slate-500 truncate max-w-[200px]"
                    title={item.email_guru_kelas}
                  >
                    {item.email_guru_kelas}
                  </td>

                  {/* Shalat Fardhu */}
                  <td className="px-4 py-3 border-r border-slate-200 text-center text-slate-500">
                    {item.shalat_shubuh}
                  </td>
                  <td className="px-4 py-3 border-r border-slate-200 text-center text-slate-500">
                    {item.shalat_zhuhur}
                  </td>
                  <td className="px-4 py-3 border-r border-slate-200 text-center text-slate-500">
                    {item.shalat_ashar}
                  </td>
                  <td className="px-4 py-3 border-r border-slate-200 text-center text-slate-500">
                    {item.shalat_maghrib}
                  </td>
                  <td className="px-4 py-3 border-r border-slate-200 text-center text-slate-500">
                    {item.shalat_isya}
                  </td>

                  {/* Shalat Rawatib */}
                  <td className="px-4 py-3 border-r border-slate-200 text-center text-slate-500">
                    {item.rawatib_qabliyah_shubuh}
                  </td>
                  <td className="px-4 py-3 border-r border-slate-200 text-center text-slate-500">
                    {item.rawatib_qabliyah_zhuhur}
                  </td>
                  <td className="px-4 py-3 border-r border-slate-200 text-center text-slate-500">
                    {item.rawatib_bada_zhuhur}
                  </td>
                  <td className="px-4 py-3 border-r border-slate-200 text-center text-slate-500">
                    {item.rawatib_qabliyah_ashar}
                  </td>
                  <td className="px-4 py-3 border-r border-slate-200 text-center text-slate-500">
                    {item.rawatib_bada_maghrib}
                  </td>
                  <td className="px-4 py-3 border-r border-slate-200 text-center text-slate-500">
                    {item.rawatib_bada_isya}
                  </td>

                  {/* Shalat Sunnah */}
                  <td className="px-4 py-3 border-r border-slate-200 text-center text-slate-500">
                    {item.sunnah_dhuha}
                  </td>
                  <td className="px-4 py-3 border-r border-slate-200 text-center text-slate-500">
                    {item.sunnah_witir}
                  </td>
                  <td className="px-4 py-3 border-r border-slate-200 text-center text-slate-500">
                    {item.sunnah_tahajud}
                  </td>
                  <td className="px-4 py-3 border-r border-slate-200 text-center text-slate-500">
                    {item.sunnah_tarawih}
                  </td>

                  {/* Shaum */}
                  <td className="px-4 py-3 border-r border-slate-200 text-center text-slate-500">
                    {item.shaum_sunnah}
                  </td>
                  <td
                    className="px-4 py-3 border-r border-slate-200 text-slate-500 max-w-[200px] truncate"
                    title={item.keterangan_shaum_sunnah}
                  >
                    {item.keterangan_shaum_sunnah}
                  </td>

                  {/* Itikaf */}
                  <td className="px-4 py-3 border-r border-slate-200 text-center text-slate-500">
                    {item.itikaf}
                  </td>
                  <td className="px-4 py-3 border-r border-slate-200 text-center text-slate-500">
                    {item.lokasi_itikaf}
                  </td>

                  {/* Ramadhan */}
                  <td className="px-4 py-3 border-r border-slate-200 text-center text-slate-500">
                    {item.shaum_ramadhan}
                  </td>
                  <td className="px-4 py-3 border-r border-slate-200 text-center text-slate-500">
                    {item.shaum_yaumul_bidh}
                  </td>
                  <td className="px-4 py-3 border-r border-slate-200 text-center text-slate-500">
                    {item.shaum_lainnya}
                  </td>
                  <td className="px-4 py-3 border-r border-slate-200 text-center text-slate-500">
                    {item.keterangan_puasa}
                  </td>

                  {/* Literasi */}
                  <td className="px-4 py-3 border-r border-slate-200 text-center text-slate-500">
                    {item.literasi_membaca}
                  </td>
                  <td
                    className="px-4 py-3 border-r border-slate-200 text-slate-500 max-w-[200px] truncate"
                    title={item.keterangan_membaca}
                  >
                    {item.keterangan_membaca}
                  </td>

                  {/* Kajian */}
                  <td className="px-4 py-3 border-r border-slate-200 text-center text-slate-500">
                    {item.kajian_media}
                  </td>
                  <td className="px-4 py-3 border-r border-slate-200 text-slate-500">
                    {item.kajian_judul}
                  </td>

                  {/* Amalan Lain */}
                  <td className="px-4 py-3 border-r border-slate-200 text-center text-slate-500">
                    {item.al_matsurat_pagi}
                  </td>
                  <td className="px-4 py-3 border-r border-slate-200 text-center text-slate-500">
                    {item.al_matsurat_petang}
                  </td>
                  <td className="px-4 py-3 border-r border-slate-200 text-center text-slate-500">
                    {item.infaq}
                  </td>
                  <td className="px-4 py-3 border-r border-slate-200 text-center text-slate-500">
                    {item.bersosialisasi_dengan_tetangga}
                  </td>
                  <td className="px-4 py-3 border-r border-slate-200 text-center text-slate-500">
                    {item.tidur_dalam_keadaan_berwudhu}
                  </td>
                  <td className="px-4 py-3 border-r border-slate-200 text-center text-slate-500">
                    {item.olahraga_mandiri}
                  </td>

                  {/* Interaksi Quran */}
                  <td className="px-4 py-3 border-r border-slate-200 text-center text-slate-500">
                    {item.tilawah_halaman || "-"}
                  </td>
                  <td className="px-4 py-3 border-r border-slate-200 text-center text-slate-500">
                    {item.murojaah_halaman || "-"}
                  </td>
                  <td className="px-4 py-3 border-r border-slate-200 text-center text-slate-500">
                    {item.ziyadah_juz} - {item.ziyadah_surah}
                  </td>
                  <td className="px-4 py-3 border-r border-slate-200 text-center text-slate-500">
                    {item.ziyadah_ayat}
                  </td>
                  <td className="px-4 py-3 border-slate-200 text-center text-slate-500">
                    {item.membaca_terjemah_halaman}
                  </td>
                </tr>
              ))}
              {paginatedData.length === 0 && (
                <tr>
                  <td
                    colSpan={50}
                    className="px-4 py-8 text-center text-slate-400 italic"
                  >
                    Tidak ada data mutabaah pada rentang tanggal ini.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-2">
          <div className="text-xs text-slate-500">
            Menampilkan{" "}
            <span className="font-medium">
              {(currentPage - 1) * itemsPerPage + 1}
            </span>{" "}
            sampai{" "}
            <span className="font-medium">
              {Math.min(currentPage * itemsPerPage, data.length)}
            </span>{" "}
            dari <span className="font-medium">{data.length}</span> data
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="p-1 rounded hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-slate-600" />
            </button>
            <span className="text-xs font-medium text-slate-600">
              Halaman {currentPage} dari {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="p-1 rounded hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
