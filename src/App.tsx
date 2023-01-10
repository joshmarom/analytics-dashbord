import * as React from "react"
import { useMetricsApi } from "./hooks/useMetricsApi"
import { useMetricsGenerator } from "./hooks/useMetricsGenerator"
import { DataTable } from "./components/widgets/DataTable"
import Grid from "@mui/material/Unstable_Grid2"
import Paper from "@mui/material/Paper"
import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
import { MetricsChart } from "./components/widgets/Charts"
import { ConversionsChart } from "./components/widgets/Charts/ConversionsChart"

//import './App.css'

function App() {
  const { metrics, loading, error, setMetrics } = useMetricsApi()
  const { generateMetrics } = useMetricsGenerator(setMetrics)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="App">
      <Container maxWidth="lg" sx={{ p: 2, backgroundColor: "grey.200" }}>
        <Grid container spacing={2}>
          <Grid xs={12}>
            <Button variant="contained" onClick={() => generateMetrics()}>
              Generate Metrics
            </Button>
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
      </Container>
    </div>
  )
}

export default App
