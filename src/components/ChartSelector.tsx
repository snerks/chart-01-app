import React from 'react';

export type MetricKey =
  | 'soc'
  | 'pv_power'
  | 'battery_power'
  | 'grid_power'
  | 'temperature';
export const METRICS: { key: MetricKey; label: string }[] = [
  { key: 'soc', label: 'State of Charge (%)' },
  { key: 'pv_power', label: 'PV Power (W)' },
  { key: 'battery_power', label: 'Battery Power (W)' },
  { key: 'grid_power', label: 'Grid Power (W)' },
  { key: 'temperature', label: 'Battery Temperature (°C)' },
];

export type ChartType = 'line' | 'area' | 'bar';

type Props = {
  selected: MetricKey[];
  onToggle: (k: MetricKey) => void;
  chartType: ChartType;
  onChartType: (t: ChartType) => void;
};

export default function ChartSelector({
  selected,
  onToggle,
  chartType,
  onChartType,
}: Props) {
  return (
    <div className="card selector">
      <h3>Charts & Metrics</h3>
      <div style={{ marginBottom: 8 }}>
        <label>Chart type:&nbsp;</label>
        <select
          value={chartType}
          onChange={(e) => onChartType(e.target.value as ChartType)}
        >
          <option value="line">Line</option>
          <option value="area">Area</option>
          <option value="bar">Bar</option>
        </select>
      </div>
      <div>
        {METRICS.map((m) => (
          <label key={m.key} style={{ display: 'block', marginBottom: 6 }}>
            <input
              type="checkbox"
              checked={selected.includes(m.key)}
              onChange={() => onToggle(m.key)}
            />
            &nbsp;{m.label}
          </label>
        ))}
      </div>
    </div>
  );
}
