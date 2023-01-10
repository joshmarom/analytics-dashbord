import {
  CoreChartOptions,
  ElementChartOptions,
  PluginChartOptions,
  DatasetChartOptions,
  ScaleChartOptions,
  LineControllerChartOptions,
  DoughnutControllerChartOptions,
} from "chart.js"
import { _DeepPartialObject } from "chart.js/dist/types/utils"

export type LineChartOptions = _DeepPartialObject<
  CoreChartOptions<"line"> &
    ElementChartOptions<"line"> &
    PluginChartOptions<"line"> &
    DatasetChartOptions<"line"> &
    ScaleChartOptions<"line"> &
    LineControllerChartOptions
>

export type PieChartOptions = _DeepPartialObject<
  CoreChartOptions<"pie"> &
    ElementChartOptions<"pie"> &
    PluginChartOptions<"pie"> &
    DatasetChartOptions<"pie"> &
    ScaleChartOptions<"pie"> &
    DoughnutControllerChartOptions
>
