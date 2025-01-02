import { Grid, Paper, Typography } from '@mui/material'
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar, Doughnut } from 'react-chartjs-2'

function Dashboard() {
  const analysisData = {
    labels: ['Objects', 'Scenes', 'Sentiments', 'Tags'],
    datasets: [{
      data: [65, 45, 30, 80],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0'
      ],
    }]
  }

  const timelineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Videos Analyzed',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: '#36A2EB',
    }]
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Analytics Dashboard
        </Typography>
      </Grid>
      
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Analysis Timeline
          </Typography>
          <Bar data={timelineData} />
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Analysis Distribution
          </Typography>
          <Doughnut data={analysisData} />
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Dashboard
