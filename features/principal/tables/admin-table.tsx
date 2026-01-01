import { LucideIcon } from "lucide-react";
import { AdminStatus, AdminItem } from "../types/types";
import { StatusCell } from "./status-cell";

// Interface for the flattened item passed to the table
export interface AdminTableItem extends AdminItem {
  teacherId: string;
  teacherName: string;
  teacherSubject: string;
  teacherClass: string;
}

interface AdminTableProps {
  title: string;
  icon: LucideIcon;
  category: "planning" | "implementation" | "evaluation";
  colorClass: string;
  currentPage: number;
  onPageChange: (page: number) => void;
  items: AdminTableItem[];
  openDropdownId: string | null;
  setOpenDropdownId: (id: string | null) => void;
  handleStatusUpdate: (
    teacherId: string,
    category: "planning" | "implementation" | "evaluation",
    itemId: string,
    newStatus: AdminStatus
  ) => void;
  setPreviewUrl: (url: string) => void;
}

const ITEMS_PER_PAGE = 5;

export const AdminTable = ({
  title,
  icon: Icon,
  category,
  colorClass,
  currentPage,
  onPageChange,
  items,
  openDropdownId,
  setOpenDropdownId,
  handleStatusUpdate,
  setPreviewUrl,
}: AdminTableProps) => {
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div
        className={`p-4 border-b border-slate-100 flex items-center gap-3 ${colorClass}`}
      >
        <div className="p-2 bg-white/50 rounded-lg backdrop-blur-sm shadow-sm">
          <Icon className="w-5 h-5" />
        </div>
        <h4 className="font-bold text-lg">{title}</h4>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-bold border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 w-1/3">Nama Guru</th>
              <th className="px-6 py-4 w-1/3">Item Dokumen</th>
              <th className="px-6 py-4 w-1/3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginatedItems.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-slate-50 transition-colors group"
              >
                <td className="px-6 py-4">
                  <div>
                    <div className="font-bold text-slate-800">
                      {item.teacherName}
                    </div>
                    <div className="text-xs text-slate-500">
                      {item.teacherSubject} - {item.teacherClass}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-700 font-medium">
                  {item.title}
                </td>
                <td className="px-6 py-4">
                  <StatusCell
                    teacherId={item.teacherId}
                    category={category}
                    item={item}
                    openDropdownId={openDropdownId}
                    setOpenDropdownId={setOpenDropdownId}
                    handleStatusUpdate={handleStatusUpdate}
                    setPreviewUrl={setPreviewUrl}
                  />
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-8 text-center text-slate-400 italic"
                >
                  Tidak ada data untuk ditampilkan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-slate-100 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Menampilkan {startIndex + 1}-
            {Math.min(startIndex + ITEMS_PER_PAGE, items.length)} dari{" "}
            {items.length} data
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-xs font-medium rounded-md border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="px-3 py-1 text-xs font-medium text-slate-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                onPageChange(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-xs font-medium rounded-md border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
