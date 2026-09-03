import styles from "./marketing.module.css";

function Label({
  who,
  hours,
  className,
  accent,
}: {
  who: string;
  hours: string;
  className: string;
  accent: "orange" | "teal";
}) {
  return (
    <div
      className={`${styles.mono} ${styles.rise} ${styles.rise1} absolute rounded-lg bg-white/95 px-2.5 py-1.5 text-[11px] leading-tight shadow-sm ring-1 ring-black/5 ${className}`}>
      <span className="flex items-center gap-1.5 font-medium text-(--ms-ink)">
        <span
          className={`inline-block h-1.5 w-1.5 rounded-full ${
            accent === "orange" ? "bg-(--ms-orange)" : "bg-(--ms-teal)"
          }`}
        />
        {who}
      </span>
      <span className="mt-0.5 block text-(--ms-slate)">{hours}</span>
    </div>
  );
}

export function OverlapHero() {
  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-[560px]" aria-hidden="true">
      <svg viewBox="0 0 640 480" className="absolute inset-0 h-full w-full overflow-visible">
        <g className={styles.circleLeft}>
          <circle cx="240" cy="240" r="170" fill="#FF6B35" />
        </g>
        <g className={styles.circleRight}>
          <circle cx="400" cy="240" r="170" fill="#2DD4BF" />
        </g>
        <path
          className={styles.lens}
          d="M320 90A170 170 0 0 0 320 390A170 170 0 0 0 320 90Z"
          fill="#0A0A0A"
        />
      </svg>

      <Label who="You · New York" hours="09:00 – 17:00" accent="orange" className="left-[3%] top-[7%]" />
      <Label who="Ana · Berlin" hours="14:00 – 22:00" accent="teal" className="bottom-[9%] right-[3%]" />

      <div
        className={`${styles.rise} ${styles.rise2} absolute left-1/2 top-1/2 w-44 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-3.5 shadow-2xl shadow-black/25`}>
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-(--ms-ink)">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-(--ms-teal)" />
          Confirmed
        </div>
        <p className={`${styles.display} mt-2 text-lg font-bold leading-none`}>Thu, Sep 18</p>
        <p className={`${styles.mono} mt-1.5 text-xs text-(--ms-slate)`}>09:30 – 10:00 ET</p>
        <div className="mt-3 flex items-center justify-between border-t border-(--ms-line) pt-2.5">
          <div className="flex -space-x-1.5">
            <span className="inline-block h-5 w-5 rounded-full bg-(--ms-orange) ring-2 ring-white" />
            <span className="inline-block h-5 w-5 rounded-full bg-(--ms-teal) ring-2 ring-white" />
          </div>
          <span className={`${styles.mono} text-[10px] text-(--ms-slate)`}>Google Meet</span>
        </div>
      </div>

      <p
        className={`${styles.mono} ${styles.rise} ${styles.rise3} absolute -bottom-[4%] left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] text-(--ms-slate)`}>
        overlap · 09:00 – 16:00 ET
      </p>
    </div>
  );
}
