import { useEffect, useState } from "react";
import { useInView } from "@client/lib/useInView";

type CountUpProps = {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
};

export default function CountUp({
  end,
  prefix = "",
  suffix = "",
  duration = 2200,
}: CountUpProps) {
  const [ref, inView] = useInView<HTMLSpanElement>(0);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let frame: number;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // ease-out cuadrático (menos front-loaded que el cúbico)
      const eased = 1 - Math.pow(1 - progress, 2);
      setValue(Math.round(eased * end));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {value.toLocaleString("es-CO")}
      {suffix}
    </span>
  );
}
