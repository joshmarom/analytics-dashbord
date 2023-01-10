import { ChartData } from "chart.js"
import { colord } from "colord"
import type { Metrics } from "../../../types"
import { PieChart } from "./ChartJS"
import type { PieChartOptions } from "./types"

const getChartData = (metrics: Metrics) => {
  const colors = [
    { r: 255, g: 99, b: 132 },
    { r: 53, g: 162, b: 235 },
    { r: 75, g: 192, b: 192 },
  ]

  const impressions = metrics.reduce((acc, metric) => acc + metric.impressions, 0)
  const clicks = metrics.reduce((acc, metric) => acc + metric.clicks, 0)
  const conversions = metrics.reduce((acc, metric) => acc + metric.conversions, 0)

  const nonConversionsPercentage =
    Math.round(((impressions - clicks) / impressions) * 10000) / 100
  const clicksPercentage = Math.round((clicks / impressions) * 10000) / 100
  const conversionsPercentage = Math.round((conversions / clicks) * 10000) / 100

  return {
    labels: [
      `Non-Conversions (${nonConversionsPercentage}% of impressions)`,
      `Clicks (${clicksPercentage}% of impressions)`,
      `Conversions (${conversionsPercentage}% of clicks)`,
    ],
    datasets: [
      {
        data: [impressions - clicks, clicks - conversions, conversions],
        borderColor: colors.map(color => colord(color).toRgbString()),
        backgroundColor: colors.map(color =>
          colord({ ...color, a: 0.5 }).toRgbString(),
        ),
      },
    ],
  } satisfies ChartData<"pie">
}

export const ConversionsChart = ({ metrics }: { metrics: Metrics }) => {
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  } satisfies PieChartOptions

  return <PieChart data={getChartData(metrics)} options={chartOptions} />
}
