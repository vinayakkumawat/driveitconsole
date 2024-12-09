"use client"

import React from 'react'
import { Pie, PieChart } from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
    { label: "משלוחים", percentage: 65, fill: "var(--color-first)" },
    { label: "נסיעות", percentage: 15, fill: "var(--color-second)" },
    { label: "שליחויות", percentage: 20, fill: "var(--color-third)" },
]

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    first: {
        label: "משלוחים",
        color: "#F39800",
    },
    second: {
        label: "נסיעות",
        color: "#B6CD63",
    },
    third: {
        label: "שליחויות",
        color: "#C08AAB",
    },
} satisfies ChartConfig

const CustomPieChart = () => {
    return (
        <div className='w-80 h-80 flex flex-col justify-center items-center'>
            <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square px-0 flex-1"
            >
                <PieChart>
                    <ChartTooltip
                        content={<ChartTooltipContent nameKey="percentage" hideLabel />}
                    />
                    <Pie
                        data={chartData}
                        dataKey="percentage"
                        labelLine={false}
                        label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                            const RADIAN = Math.PI / 180;
                            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                            const x = cx + radius * Math.cos(-midAngle * RADIAN);
                            const y = cy + radius * Math.sin(-midAngle * RADIAN);

                            return (
                                <text
                                    x={x}
                                    y={y}
                                    fill="hsla(var(--foreground))"
                                    textAnchor="middle"
                                    dominantBaseline="central"
                                    className='text-lg'
                                >
                                    {`${(percent * 100).toFixed(0)}%`}
                                </text>
                            );
                        }}
                        nameKey="label"
                    />
                </PieChart>
            </ChartContainer>
            <div className='flex gap-4'>
                <div className='flex items-center gap-2'>
                    <div className='w-3 h-3 rounded-full bg-[#F39800]' />
                    <span>משלוחים</span>
                </div>
                <div className='flex items-center gap-2'>
                    <div className='w-3 h-3 rounded-full bg-[#B6CD63]' />
                    <span>נסיעות</span>
                </div>
                <div className='flex items-center gap-2'>
                    <div className='w-3 h-3 rounded-full bg-[#C08AAB]' />
                    <span>שליחויות</span>
                </div>
            </div>
        </div>
    )
}

export default CustomPieChart