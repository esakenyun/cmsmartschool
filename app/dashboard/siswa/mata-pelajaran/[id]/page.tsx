import { ContentLayout } from "@/components/dashboard-panel/content-layout";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import DetailMataPelajaranClient from "./client-view";

export default function DetailMataPelajaran() {
  return (
    <ContentLayout title="Ruang Belajar">
      <main>
        <div className="flex justify-between items-center text-sm">
          <Link
            href={"/dashboard/siswa/mata-pelajaran"}
            className="flex items-center gap-2 bg-white rounded-lg shadow-lg p-3 hover:bg-rose-500 hover:text-white"
          >
            <ArrowLeft className="w-6 h-6" />
            <span>Kembali</span>
          </Link>
          {/* <Link
            href={
              "https://sites.google.com/cendekiamuda.sch.id/science82526/home?read_current=1"
            }
            className="flex items-center gap-2 bg-rose-500 text-white rounded-lg shadow-lg p-3 hover:bg-rose-600 hover:text-white"
            target="_blank"
          >
            <ExternalLink />
            <span className="font-medium">Akses Dashboard Eksternal</span>
          </Link> */}
        </div>
        <div className="mt-5">
          <div className="bg-white rounded-2xl p-10 border border-slate-200 text-center mb-10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-rose-500/5 rounded-full -ml-24 -mb-24"></div>
            <div className="relative z-0">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-500 mb-4">
                Mata Pelajaran: IPA
              </span>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Selamat Datang di Mata Pelajaran IPA
              </h1>
              <p className="text-slate-500 max-w-lg mx-auto">
                Eksplorasi dunia sains mulai dari biologi hingga fisika. Temukan
                materi pembelajaran dan kumpulkan tugasmu di sini.
              </p>
            </div>
          </div>

          <DetailMataPelajaranClient />
        </div>
      </main>
    </ContentLayout>
  );
}
