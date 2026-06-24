import { cn } from "@/lib/utils";

interface KpiCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  variant?: "default" | "alert" | "success";
}

export function KpiCard({ label, value, subtext, variant = "default" }: KpiCardProps) {
  return (
    <div className={cn(
      "rounded-xl border p-4",
      variant === "alert" && "border-red-500/40 bg-red-500/10",
      variant === "success" && "border-emerald-500/40 bg-emerald-500/10",
      variant === "default" && "border-slate-700 bg-slate-800/60"
    )}>
      <p className="text-xs uppercase tracking-wider text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-slate-100">{value}</p>
      {subtext && <p className="mt-1 text-xs text-slate-500">{subtext}</p>}
    </div>
  );
}
