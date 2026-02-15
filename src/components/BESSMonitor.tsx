import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { BESSDataPoint } from '../hooks/useSimulatedFeed';
import { MetricKey } from './ChartSelector';

type Props = {
  data: BESSDataPoint[];
  metrics: MetricKey[];
  chartType: 'line' | 'area' | 'bar';
};

const colorFor = (k: MetricKey) => {
  switch (k) {
    case 'soc':
      return '#60a5fa';
    case 'pv_power':
      return '#34d399';
    case 'battery_power':
      return '#fb7185';
    case 'grid_power':
      return '#f97316';
    case 'temperature':
      return '#fbbf24';
  }
};

export default function BESSMonitor({ data, metrics, chartType }: Props) {
  if (metrics.length === 0)
    return <div className="card">Select at least one metric to display</div>;

  return (
    <div className="card charts">
      {metrics.map((m) => (
        <div key={m} className="chartRow">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'line' ? (
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#0b1220" />
                <XAxis
                  dataKey="ts"
                  tickFormatter={(t) => new Date(t).toLocaleTimeString()}
                  stroke="#9fb0d6"
                />
                <YAxis stroke="#9fb0d6" />
                <Tooltip labelFormatter={(t) => new Date(t).toLocaleString()} />
                <Line
                  type="monotone"
                  dataKey={m}
                  stroke={colorFor(m)}
                  dot={false}
                />
              </LineChart>
            ) : chartType === 'area' ? (
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#0b1220" />
                <XAxis
                  dataKey="ts"
                  tickFormatter={(t) => new Date(t).toLocaleTimeString()}
                  stroke="#9fb0d6"
                />
                <YAxis stroke="#9fb0d6" />
                <Tooltip labelFormatter={(t) => new Date(t).toLocaleString()} />
                <Area
                  type="monotone"
                  dataKey={m}
                  stroke={colorFor(m)}
                  fill={colorFor(m)}
                />
              </AreaChart>
            ) : (
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#0b1220" />
                <XAxis
                  dataKey="ts"
                  tickFormatter={(t) => new Date(t).toLocaleTimeString()}
                  stroke="#9fb0d6"
                />
                <YAxis stroke="#9fb0d6" />
                <Tooltip labelFormatter={(t) => new Date(t).toLocaleString()} />
                <Bar dataKey={m} fill={colorFor(m)} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  );
}
