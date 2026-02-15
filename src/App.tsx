import React, { useMemo, useState } from 'react';
import useSimulatedFeed from './hooks/useSimulatedFeed';
import ChartSelector, { METRICS, ChartType } from './components/ChartSelector';
import BESSMonitor from './components/BESSMonitor';

export default function App() {
  const { data } = useSimulatedFeed(1000);
  const [selected, setSelected] = useState<string[]>([
    'soc',
    'pv_power',
    'battery_power',
  ]);
  const [chartType, setChartType] = useState<ChartType>('line');

  const metrics = useMemo(() => selected as any, [selected]);

  const toggle = (k: string) => {
    setSelected((s) => (s.includes(k) ? s.filter((x) => x !== k) : [...s, k]));
  };

  return (
    <div className="app">
      <div className="header">
        <h2>Battery Energy Storage System — Live Monitor (PoC)</h2>
        <div className="controls">
          <div className="card">Data points: {data.length}</div>
        </div>
      </div>

      <div className="grid">
        <div>
          <ChartSelector
            selected={selected as any}
            onToggle={(k) => toggle(k)}
            chartType={chartType}
            onChartType={(t) => setChartType(t)}
          />
        </div>
        <div>
          <BESSMonitor data={data} metrics={metrics} chartType={chartType} />
        </div>
      </div>

      <div className="footer">
        This is a simulated feed for demo and testing purposes.
      </div>
    </div>
  );
}
