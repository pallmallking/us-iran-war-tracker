export function PageHeader({ title, description, updated }: { title: string; description?: string; updated?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold text-slate-100">{title}</h2>
      {description && <p className="mt-1 text-sm text-slate-400">{description}</p>}
      {updated && <p className="mt-1 text-xs text-slate-600">Last updated: {updated}</p>}
    </div>
  );
}
