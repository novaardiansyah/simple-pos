"use client"

import * as React from "react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { Separator } from "@/components/ui/separator"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

const chartData = [
  { date: "2026-01-22", amount: 150000 },
  { date: "2026-01-23", amount: 120000 },
  { date: "2026-01-24", amount: 80000 },
  { date: "2026-01-25", amount: 150000 },
  { date: "2026-01-26", amount: 90000 },
  { date: "2026-01-27", amount: 110000 },
  { date: "2026-01-28", amount: 130000 },
]

const chartConfig = {
  views: {
    label: "Pendapatan",
  },
  amount: {
    label: "amount",
    color: "#8ec7ff",
  },
} satisfies ChartConfig

export function ChartLineInteractive() {
  const activeChart = 'amount'

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value)
  }

  return (
    <Card className="py-4 sm:py-0">
      <CardHeader className="pb-0 pt-0 md:pt-5">
        <CardTitle className="text-base mb-[-5px]">
          Grafik Pendapatan
        </CardTitle>
        <CardDescription className="text-sm">
          Menampilkan total pendapatan 7 hari terakhir
        </CardDescription>
        <Separator className="mt-3" />
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ScrollArea>
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-[40rem] md:w-full"
          >
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 32,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <YAxis
                dataKey="amount"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  return formatCurrency(value || 0)
                }}
              />

              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return date.toLocaleDateString("id-ID", {
                    month: "short",
                    day: "numeric",
                  })
                }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="views"
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("id-ID", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    }}
                    formatter={(value) => {
                      return formatCurrency(parseInt(value.toString()))
                    }}
                  />
                }
              />
              <Line
                dataKey={activeChart}
                type="monotone"
                stroke={`var(--color-${activeChart})`}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>

          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
