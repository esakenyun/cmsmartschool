"use client";

import { ArrowRight, Book, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Tab = "materi-ajar" | "dashboard-eksternal" | "classroom";

export default function DetailMataPelajaranClient() {
  const [tab, setTab] = useState<Tab>("materi-ajar");

  return (
    <>
      {/* TAB HEADER */}
      <div className="border-b border-slate-200 mb-6">
        <nav aria-label="Tabs" className="flex space-x-8">
          <button
            onClick={() => setTab("materi-ajar")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-all
              ${
                tab === "materi-ajar"
                  ? "border-rose-500 text-rose-500"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }
            `}
          >
            Materi Ajar
          </button>

          <button
            onClick={() => setTab("dashboard-eksternal")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-all
              ${
                tab === "dashboard-eksternal"
                  ? "border-rose-500 text-rose-500"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }
            `}
          >
            Dashboard Eksternal
          </button>

          <button
            onClick={() => setTab("classroom")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-all
              ${
                tab === "classroom"
                  ? "border-rose-500 text-rose-500"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }
            `}
          >
            Classroom
          </button>
        </nav>
      </div>

      {/* TAB CONTENT */}
      {tab === "materi-ajar" && (
        <div id="materi-ajar">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-lg flex items-center justify-center mb-4">
                <Book className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 mb-1">
                Struktur Sel Hewan
              </h3>
              <p className="text-xs text-slate-500 mb-4 line-clamp-2">
                Mempelajari bagian-bagian terkecil dari makhluk hidup dan
                fungsinya.
              </p>
              <button className="text-xs font-semibold text-rose-500 flex items-center gap-1">
                Pelajari Materi
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {tab === "dashboard-eksternal" && (
        <div id="dashboard-eksternal">
          <div className="flex gap-2 justify-center items-center w-full">
            <Link
              href={
                "https://sites.google.com/cendekiamuda.sch.id/science82526/home?read_current=1"
              }
              className="flex items-center gap-2 bg-rose-500 text-white rounded-lg shadow-lg p-3 hover:bg-rose-600 hover:text-white"
              target="_blank"
            >
              <ExternalLink />
              <span className="font-medium">Akses Dashboard Eksternal</span>
            </Link>
          </div>
        </div>
      )}

      {tab === "classroom" && (
        <div id="classroom">
          <div className="flex gap-2 justify-center items-center w-full">
            <Link
              href={
                "https://sites.google.com/cendekiamuda.sch.id/science82526/home?read_current=1"
              }
              className="flex items-center gap-2 bg-green-500 text-white rounded-lg shadow-lg p-3 hover:bg-green-600 hover:text-white"
              target="_blank"
            >
              <ExternalLink />
              <span className="font-medium">Akses Google Classroom</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
