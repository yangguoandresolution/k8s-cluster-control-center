
import React from 'react';
import { AreaChart as RechartsArea, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';
import TransitionWrapper from './TransitionWrapper';

type AreaChartProps = {
  data: Array<{ [key: string]: any }>;
  dataKey: string;
  xAxisKey?: string;
  stroke?: string;
  fill?: string;
  height?: number;
  className?: string;
  showGrid?: boolean;
  showAxis?: boolean;
  showTooltip?: boolean;
  gradientFrom?: string;
  gradientTo?: string;
  color?: string; // Added color prop for convenience
};

export const AreaChart = ({
  data,
  dataKey,
  xAxisKey = 'name',
  stroke = '#2673E5',
  fill = '#2673E5',
  height = 200,
  className,
  showGrid = true,
  showAxis = true,
  showTooltip = true,
  gradientFrom = 'rgba(38, 115, 229, 0.4)',
  gradientTo = 'rgba(38, 115, 229, 0.0)',
  color, // Added color prop
}: AreaChartProps) => {
  const uniqueId = React.useId();
  const gradientId = `areaGradient-${uniqueId}`;

  // If color is provided, use it to derive stroke and gradient colors
  if (color) {
    stroke = color;
    // Note: In a real implementation, we might convert this to proper rgba values
  }

  return (
    <TransitionWrapper animation="fade" className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsArea
          data={data}
          margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={gradientFrom} />
              <stop offset="100%" stopColor={gradientTo} />
            </linearGradient>
          </defs>
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgba(0,0,0,0.05)"
            />
          )}
          {showAxis && (
            <>
              <XAxis
                dataKey={xAxisKey}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#9CA3AF' }}
                padding={{ left: 10, right: 10 }}
                dy={5}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#9CA3AF' }}
                dx={-5}
              />
            </>
          )}
          {showTooltip && (
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                backgroundColor: 'rgba(255, 255, 255, 0.97)',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                padding: '8px 12px',
                fontSize: '12px',
              }}
              labelStyle={{ fontWeight: 'bold', marginBottom: 4 }}
              cursor={{ stroke: 'rgba(0, 0, 0, 0.1)', strokeWidth: 1 }}
            />
          )}
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={stroke}
            strokeWidth={2}
            fill={`url(#${gradientId})`}
            animationDuration={1500}
          />
        </RechartsArea>
      </ResponsiveContainer>
    </TransitionWrapper>
  );
};

export default AreaChart;
