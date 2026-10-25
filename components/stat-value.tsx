import type { Stat } from "@/data/experience";

/** Big stat number with its unit ("+", "%", "/100", "s", " days") set smaller so the figure itself leads. */
export const StatValue = ({ value, className = "" }: { value: string; className?: string }) => {
  const [, num, unit] = value.match(/^([^\d]*[\d.,]+[KMk]?)(.*)$/) ?? [value, value, ""];
  return (
    <dd
      className={`font-semibold leading-none tracking-[-0.04em] text-blue-600 dark:text-blue-400 ${className}`}
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {num}
      {unit && <span className="text-[0.5em] align-[0.6em] ml-0.5">{unit}</span>}
    </dd>
  );
};

/** Row of stats; each label names the project it measures when `project` is set. */
export const StatList = ({ stats, size, className = "" }: { stats: Stat[]; size: string; className?: string }) => (
  <dl className={`grid grid-cols-3 gap-x-4 gap-y-6 ${className}`}>
    {stats.map((s) => (
      <div key={s.label + s.value} className="flex flex-col-reverse gap-1.5">
        <dt className="text-xs leading-snug text-zinc-600 dark:text-zinc-500">
          {s.label}
          {s.project && <span className="block font-mono text-[11px] text-zinc-500 dark:text-zinc-600">{s.project}</span>}
        </dt>
        <StatValue value={s.value} className={size} />
      </div>
    ))}
  </dl>
);
