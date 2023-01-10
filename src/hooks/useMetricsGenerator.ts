import { Metrics } from "../types"

/**
 * Options for the metrics generator hook
 */
type GeneratorOptions = {
  start: string | number
  end: string | number
}

/**
 * Generates a random integer between the given minimum and maximum values
 * @param a The minimum value (inclusive)
 * @param b The maximum value (inclusive)
 */
const randomInt = (a: number, b: number) => Math.floor(Math.random() * (a - b) + b)

/**
 * Returns a new Date object set to 30 days ago from the current date
 */
const thirtyDaysAgo = () =>
  new Date(new Date().setUTCDate(new Date().getUTCDate() - 30))

/**
 * Returns the default options for the metrics generator
 */
const getInitialOptions = () => ({
  start: thirtyDaysAgo().toISOString(),
  end: new Date().toISOString(),
})

/**
 * Generates mock metrics data for the given date range
 * @param options The options for the generator, including the start and end dates
 */
const generateMockMetrics = (
  { start, end }: GeneratorOptions = getInitialOptions(),
) => {
  const metrics: Metrics = []

  const startDate = new Date(start)
  const endDate = new Date(end)

  for (let date = startDate; date <= endDate; date.setUTCDate(date.getUTCDate() + 1)) {
    const impressions = randomInt(20000, 200000)
    const clicks = randomInt(impressions * 0.03, impressions * 0.08)
    const conversions = randomInt(clicks * 0.005, clicks * 0.05)
    const cost = randomInt(clicks * 0.02, clicks * 0.04)
    metrics.push({
      timestamp: date.toISOString().slice(0, 19).replace("T", " "),
      impressions,
      clicks,
      conversions,
      cost,
    })
  }

  return metrics
}

/**
 * A custom hook for generating mock metrics data
 * @param setMetrics A function for setting the generated metrics data
 */
export const useMetricsGenerator = (setMetrics: (metrics: Metrics) => void) => {
  /**
   * Generates mock metrics data based on the given options
   * @param options The options for the generator, including the start and end dates
   */
  const generateMetrics = (options?: GeneratorOptions) => {
    setMetrics(generateMockMetrics(options))
  }

  return { generateMetrics }
}
