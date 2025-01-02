import { useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from '@mui/material'

function Reports() {
  const [reports] = useState([
    {
      id: 1,
      name: 'Video Analysis Report 1',
      date: '2023-12-20',
      type: 'Object Detection',
      status: 'Completed',
    },
    {
      id: 2,
      name: 'Sentiment Analysis Report',
      date: '2023-12-19',
      type: 'Sentiment',
      status: 'Completed',
    },
  ])

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Analysis Reports
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Report Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{report.name}</TableCell>
                <TableCell>{report.date}</TableCell>
                <TableCell>{report.type}</TableCell>
                <TableCell>{report.status}</TableCell>
                <TableCell>
                  <Button variant="contained" size="small">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Reports
