import { ChangeEvent, useMemo, useState } from "react"
import { Stack } from "@mui/system"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import type { Metrics } from "../../../types"
import type { LineChartOptions } from "./types"
import { LineChart } from "./ChartJS"
import { getChartData } from "./utils"

type ScaleType = "linear" | "logarithmic"

const chartOptions: LineChartOptions = {
  responsive: true,
  scales: {
    y: {
      type: "linear",
      display: true,
      position: "left",
    },
    cost: {
      type: "linear",
      display: true,
      position: "right",
      suggestedMin: 0,
      suggestedMax: 6000,
      grid: {
        drawOnChartArea: false,
      },
    },
  },
  interaction: {
    mode: "nearest",
    axis: "x",
    intersect: false,
  },
}

export const MetricsChart = ({ metrics }: { metrics: Metrics }) => {
  const [scaleType, setScaleType] = useState<ScaleType>("linear")
  const options = useMemo(
    () => ({ ...chartOptions, scales: { y: { type: scaleType } } }),
    [scaleType],
  )
  const handleScaleTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setScaleType(e.target.value as ScaleType)
  }

  return (
    <Stack spacing={2}>
      <RadioGroup name="scale-type" value={scaleType} onChange={handleScaleTypeChange}>
        <Stack direction="row">
          <FormControlLabel value="linear" label="Linear" control={<Radio />} />
          <FormControlLabel
            value="logarithmic"
            label="Logarithmic"
            control={<Radio />}
          />
        </Stack>
      </RadioGroup>
      <LineChart options={options} data={getChartData(metrics)} />
    </Stack>
  )
}
