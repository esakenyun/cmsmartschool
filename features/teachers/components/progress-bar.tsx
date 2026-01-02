const ProgressBar = ({
  label,
  value,
  target,
  colorClass,
}: {
  label: string;
  value: number;
  target: number;
  colorClass: string;
}) => {
  const percent = Math.min(100, Math.round((value / target) * 100));
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="text-slate-500 font-medium">
          {value} / {target}
        </span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full ${colorClass}`}
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
