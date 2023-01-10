import * as React from "react"
import { useMetricsApi } from "./hooks/useMetricsApi"
import { useMetricsGenerator } from "./hooks/useMetricsGenerator"
import { DataTable } from "./components/widgets/DataTable"
import Grid from "@mui/material/Unstable_Grid2"
import Paper from "@mui/material/Paper"
import { MetricsChart } from "./components/widgets/Charts"
import { ConversionsChart } from "./components/widgets/Charts/ConversionsChart"
import { Box } from "@mui/system"
//import './App.css'

function App() {
  const { metrics, loading, error, setMetrics } = useMetricsApi()
  const { generateMetrics } = useMetricsGenerator(setMetrics)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="App">
      <Grid container spacing={2} sx={{ p: 2, backgroundColor: "grey.200" }}>
        <Grid xs={12}>
          <button onClick={() => generateMetrics()}>Generate Metrics</button>
        </Grid>
        <Grid sm={8}>
          <Paper sx={{ p: 2 }}>
            <DataTable rows={metrics} />
          </Paper>
        </Grid>
        <Grid sm={4}>
          <Paper sx={{ p: 2 }}>
            <ConversionsChart metrics={metrics} />
          </Paper>
        </Grid>
        <Grid xs={12}>
          <Paper sx={{ p: 2 }}>
            <MetricsChart metrics={metrics} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default App
