import { RgbColor, colord } from "colord"
import { Metrics } from "../../../types"

/**
 * The keys for the datasets in a chart
 */
type DatasetsKeys = Exclude<keyof Metrics[0], "timestamp">

/**
 * A map of colors to use for each dataset in a chart
 */
type MetricsColorsMap = {
  [key in DatasetsKeys[number]]: RgbColor
}

/**
 * Returns the data for a chart given an array of metrics
 * @param metrics The array of metrics to use as data for the chart
 */
export const getChartData = (metrics: Metrics) => {
  /**
   * Returns an array of values for the given key in the metrics array
   * @param key The key to use for extracting values from the metrics array
   */
  const mapOf = (key: keyof Metrics[0]) => metrics.map(item => item[key])

  const colors: MetricsColorsMap = {
    impressions: { r: 255, g: 99, b: 132 },
    clicks: { r: 53, g: 162, b: 235 },
    conversions: { r: 75, g: 192, b: 192 },
    cost: { r: 255, g: 206, b: 86 },
  }

  return {
    labels: mapOf("timestamp").map(timestamp =>
      new Date(timestamp).toLocaleDateString("en-US"),
    ),
    datasets: Object.keys(colors).map((key: DatasetsKeys[number]) => ({
      label: key.charAt(0).toUpperCase() + key.slice(1),
      data: mapOf(key as keyof Metrics[0]),
      borderColor: colord(colors[key]).toRgbString(),
      backgroundColor: colord({ ...colors[key], a: 0.5 }).toRgbString(),
      yAxisID: key === "cost" ? "cost" : "y",
      fill: key === "cost" ? true : false,
      tension: 0.3,
    })),
  }
}
