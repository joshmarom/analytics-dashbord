import * as React from "react"
import Box from "@mui/material/Box"
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid"
import { Metrics } from "../../../types"

interface DataTableProps {
  rows: Metrics
}

const columns: GridColDef[] = [
  {
    field: "timestamp",
    headerName: "Date",
    flex: 1,
    valueFormatter: ({ value }) => new Date(value).toLocaleDateString(),
  },
  {
    field: "impressions",
    headerName: "Impressions",
    type: "number",
    flex: 1,
  },
  {
    field: "clicks",
    headerName: "Clicks",
    type: "number",
    flex: 1,
  },
  {
    field: "conversions",
    headerName: "Conversions",
    type: "number",
    flex: 1,
  },
  {
    field: "cost",
    headerName: "Cost",
    type: "number",
    flex: 1,
  },
  {
    field: "costPerConversion",
    headerName: "Cost Per Conversion",
    type: "number",
    valueGetter: ({ row }: GridValueGetterParams) => row.cost / row.conversions,
    flex: 1,
  },
]

export const DataTable = ({ rows }: DataTableProps) => {
  // Add an id to each row by converting the timestamp to a number
  const rowsWithId = React.useMemo(
    () => rows.map(row => ({ ...row, id: new Date(row.timestamp).getTime() / 1000 })),
    [rows],
  )

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rowsWithId}
        columns={columns}
        pageSize={50}
        rowsPerPageOptions={[10, 25, 50, 100]}
        disableSelectionOnClick
      />
    </Box>
  )
}
