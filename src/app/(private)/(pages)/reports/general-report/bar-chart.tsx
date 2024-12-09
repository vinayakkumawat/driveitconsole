"use client"

import React from 'react'
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
    { month: "12/2024", revenue: 7500 },
    { month: "11/2024", revenue: 10500 },
    { month: "10/2024", revenue: 4150 },
    { month: "9/2024", revenue: 6280 },
    { month: "8/2024", revenue: 6650 },
    { month: "7/2024", revenue: 6300 },
    { month: "6/2024", revenue: 12850 },
    { month: "5/2024", revenue: 8000 },
    { month: "4/2024", revenue: 7500 },
    { month: "32024", revenue: 13500 },
    { month: "2/2024", revenue: 5000 },
    { month: "1/2024", revenue: 8130 },
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

const CustomBarChart = () => {
    return (
        <div>
            <ChartContainer config={chartConfig}>
                <BarChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                        top: 20,
                    }}
                >
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={true}
                    />
                    <YAxis
                        dataKey={"revenue"}
                        tickLine={false}
                        tickMargin={30}
                        axisLine={false}
                    />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                    />
                    <Bar dataKey="revenue" fill="var(--color-desktop)" barSize={50}>
                        <LabelList
                            position="insideTop"
                            offset={12}
                            className="fill-foreground"
                            fontSize={12}
                        />
                    </Bar>
                </BarChart>
            </ChartContainer>
        </div>
    )
}

export default CustomBarChart