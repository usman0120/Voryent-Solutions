import * as React from "react"
import { cn } from "@/lib/utils"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts"

export interface ChartDataPoint {
  [key: string]: string | number
}

export interface ChartsWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig
  data: ChartDataPoint[]
  xAxisKey: string
  areas: { key: string; colorVar: string }[]
  height?: number | string
}

export function ChartsWrapper({ 
  config, 
  data, 
  xAxisKey, 
  areas,
  height = 350,
  className, 
  ...props 
}: ChartsWrapperProps) {
  return (
    <div 
      className={cn("w-full rounded-lg border bg-card p-6 shadow-sm", className)} 
      role="region"
      aria-label="Data visualization chart"
      {...props}
    >
      <ChartContainer config={config} className="w-full" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart accessibilityLayer data={data} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey={xAxisKey} 
              tickLine={false} 
              axisLine={false} 
              tickMargin={12} 
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              tickFormatter={(value) => typeof value === 'string' ? value.slice(0, 3) : value} 
            />
            <ChartTooltip cursor={{ stroke: 'hsl(var(--muted-foreground))', strokeWidth: 1, strokeDasharray: '4 4' }} content={<ChartTooltipContent indicator="line" />} />
            {areas.map((area, i) => (
              <Area 
                key={area.key}
                dataKey={area.key} 
                type="monotone" 
                fill={`var(--color-${area.key})`} 
                fillOpacity={0.2} 
                stroke={`var(--color-${area.key})`} 
                strokeWidth={2}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}