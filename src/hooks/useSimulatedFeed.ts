import { useEffect, useRef, useState } from 'react';

export type BESSDataPoint = {
  ts: number;
  soc: number;
  pv_power: number;
  battery_power: number;
  grid_power: number;
  temperature: number;
};

function clamp(v: number, a = 0, b = 100) {
  return Math.max(a, Math.min(b, v));
}

export default function useSimulatedFeed(rateMs = 1000) {
  const [data, setData] = useState<BESSDataPoint[]>(() => []);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    // initialize with a few points
    let soc = 60;
    let pv = 0;
    let batt = 0;
    let grid = 0;
    let temp = 25;

    const push = () => {
      const ts = Date.now();
      // simulate simple patterns
      pv = Math.max(
        0,
        Math.round((Math.sin(ts / 20000) + Math.random() * 0.3) * 500),
      );
      batt = Math.round((Math.sin(ts / 5000) + Math.random() * 0.6) * 200);
      grid = Math.round((Math.cos(ts / 17000) + Math.random() * 0.4) * 200);
      soc = clamp(
        soc + (batt - grid) / 500 + (Math.random() - 0.5) * 0.5,
        0,
        100,
      );
      temp = clamp(temp + (Math.random() - 0.5) * 0.1, -10, 60);

      const point: BESSDataPoint = {
        ts,
        soc: Number(soc.toFixed(2)),
        pv_power: Math.round(pv),
        battery_power: Math.round(batt),
        grid_power: Math.round(grid),
        temperature: Number(temp.toFixed(2)),
      };

      setData((d) => {
        const out = [...d, point].slice(-300); // keep last 300 points
        return out;
      });
    };

    push();
    timer.current = window.setInterval(push, rateMs);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [rateMs]);

  return { data };
}
