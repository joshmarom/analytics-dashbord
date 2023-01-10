import { useEffect, useState } from "react"
import { Metrics } from "../types"

// get env variables
const getEnvVars = (env = import.meta.env) => ({
  URL: decodeURIComponent(env.VITE_API_URL),
  MASTER_KEY: decodeURIComponent(env.VITE_API_MASTER_KEY),
  ACCESS_KEY: decodeURIComponent(env.VITE_API_ACCESS_KEY),
})

// fetch data from API
async function getMetrics() {
  const { URL, MASTER_KEY, ACCESS_KEY } = getEnvVars()
  const response = await fetch(URL, {
    headers: { "X-MASTER-KEY": MASTER_KEY, "X-ACCESS-KEY": ACCESS_KEY },
  })
  const data = await response.json()
  return data.record.data
}

// useMetricsApi hook
export const useMetricsApi = () => {
  const [metrics, setMetrics] = useState([] as Metrics)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    getMetrics()
      .then(setMetrics)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  return { metrics, loading, error, setMetrics }
}
