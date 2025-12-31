import {
  CheckCircle2,
  FileText,
  ChevronDown,
  Check,
  ExternalLink,
} from "lucide-react";
import { AdminStatus, AdminItem } from "./types";

interface StatusCellProps {
  teacherId: string;
  category: "planning" | "implementation" | "evaluation";
  item: AdminItem;
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

const StatusIcon = ({ status }: { status: AdminStatus }) => {
  switch (status) {
    case "approved":
      return <CheckCircle2 className="w-3.5 h-3.5" />;
    case "submitted":
      return <FileText className="w-3.5 h-3.5" />;
    default:
      return (
        <div className="w-3.5 h-3.5 border-2 border-slate-300 border-t-slate-500 rounded-full" />
      );
  }
};

export const StatusCell = ({
  teacherId,
  category,
  item,
  openDropdownId,
  setOpenDropdownId,
  handleStatusUpdate,
  setPreviewUrl,
}: StatusCellProps) => {
  const isOpen = openDropdownId === item.id;

  const getStatusStyle = (status: AdminStatus) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700 border-green-200 hover:bg-green-200";
      case "submitted":
        return "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200";
      default:
        return "bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200";
    }
  };

  const getStatusLabel = (status: AdminStatus) => {
    switch (status) {
      case "approved":
        return "Disetujui";
      case "submitted":
        return "Menunggu";
      default:
        return "Belum Ada";
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative status-dropdown min-w-[140px]">
        <button
          onClick={() => setOpenDropdownId(isOpen ? null : item.id)}
          className={`w-full flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${getStatusStyle(
            item.status
          )}`}
        >
          <div className="flex items-center gap-2">
            <StatusIcon status={item.status} />
            {getStatusLabel(item.status)}
          </div>
          <ChevronDown className="w-3 h-3 opacity-60" />
        </button>

        {isOpen && (
          <div className="absolute left-0 top-full mt-1 w-48 bg-white rounded-lg shadow-xl border border-slate-200 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
            <div className="p-1 space-y-0.5">
              {(["null", "submitted", "approved"] as AdminStatus[]).map(
                (option) => (
                  <button
                    key={option}
                    onClick={() =>
                      handleStatusUpdate(teacherId, category, item.id, option)
                    }
                    className={`w-full text-left px-2 py-2 text-xs font-medium rounded-md flex items-center gap-2 ${
                      item.status === option
                        ? "bg-slate-100 text-slate-900"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <StatusIcon status={option} />
                    {getStatusLabel(option)}
                    {item.status === option && (
                      <Check className="w-3 h-3 ml-auto opacity-60" />
                    )}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </div>
      {item.link && (
        <button
          onClick={() => setPreviewUrl(item.link!)}
          className="p-2 text-white hover:text-slate-300 hover:bg-blue-600 rounded-lg transition-colors bg-blue-500"
          title="Lihat Dokumen"
        >
          <ExternalLink className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
