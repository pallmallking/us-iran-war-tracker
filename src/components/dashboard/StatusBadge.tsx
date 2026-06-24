import { cn } from "@/lib/utils";

export function StatusBadge({ label, tone = "neutral" }: { label: string; tone?: "positive" | "negative" | "neutral" | "alert" }) {
  return (
    <span className={cn(
      "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium",
      tone === "positive" && "bg-emerald-500/20 text-emerald-300",
      tone === "negative" && "bg-red-500/20 text-red-300",
      tone === "alert" && "bg-amber-500/20 text-amber-300",
      tone === "neutral" && "bg-slate-600/40 text-slate-300"
    )}>{label}</span>
  );
}
