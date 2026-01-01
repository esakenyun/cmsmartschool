import { ChevronDown, School } from "lucide-react";

export function PrincipalHeader() {
  return (
    <header className="flex justify-between items-center mb-6">
      <div>
        <p className="text-sm text-slate-500">
          Update terakhir: Senin, 19 Des 2024 - 08:00 WIB
        </p>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <School className="h-4 w-4 text-slate-500" />
        </div>
        <select className="pl-10 pr-8 py-2.5 bg-white border border-slate-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium text-slate-700 appearance-none cursor-pointer">
          <option value="all">Semua Unit Sekolah</option>
          <option value={"smp"}>SMP Cendekia Muda</option>
          <option value={"sd"}>SD Cendekia Muda</option>
          <option value={"tk"}>TK Cendekia Muda</option>
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <ChevronDown className="h-4 w-4 text-slate-500" />
        </div>
      </div>
    </header>
  );
}
