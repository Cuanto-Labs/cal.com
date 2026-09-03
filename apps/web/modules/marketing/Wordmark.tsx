import styles from "./marketing.module.css";

type LensMarkProps = {
  size?: number;
  onDark?: boolean;
  className?: string;
};

export function LensMark({ size = 28, onDark = false, className }: LensMarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <circle cx="24" cy="32" r="17" fill="#FF6B35" />
      <circle cx="40" cy="32" r="17" fill="#2DD4BF" />
      <path d="M32 17A17 17 0 0 0 32 47A17 17 0 0 0 32 17Z" fill={onDark ? "#FFFFFF" : "#0A0A0A"} />
    </svg>
  );
}

export function Wordmark({ onDark = false }: { onDark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LensMark onDark={onDark} />
      <span
        className={`${styles.display} text-[1.35rem] font-bold leading-none ${
          onDark ? "text-white" : "text-(--ms-ink)"
        }`}>
        MeetSynq
      </span>
    </span>
  );
}
