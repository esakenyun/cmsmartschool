"use client";

import { units } from "@/features/admin/data/mock-data";
import { ArrowRight, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

export default function UnitListView() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Manajemen Banner</h1>
          <p className="text-gray-500 text-sm">
            Pilih tingkat pendidikan untuk mengatur banner
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {units.map((unit) => (
          <Link
            key={unit.id}
            href={`/dashboard/admin/manajemen-banner/${unit.id}`}
            className="group block"
          >
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all h-full flex flex-col">
              <div className={`p-6 ${unit.color} bg-opacity-20`}>
                <div className="flex justify-between items-start mb-2">
                  <div
                    className={`p-3 rounded-xl bg-white bg-opacity-50 backdrop-blur-sm shadow-sm`}
                  >
                    <ImageIcon className="w-8 h-8" />
                  </div>
                  <span className="bg-white bg-opacity-60 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
                    {unit.name}
                  </span>
                </div>
                <h3 className="text-xl font-bold mt-4">{unit.name}</h3>
                <p className="text-sm opacity-80">{unit.description}</p>
              </div>

              <div className="p-4 bg-white grow flex items-end">
                <div className="w-full flex items-center justify-between text-sm font-medium text-gray-600 group-hover:text-blue-600 transition-colors">
                  <span>Kelola Banner</span>
                  <ArrowRight size={18} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
