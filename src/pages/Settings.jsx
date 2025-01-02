import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
} from '@mui/material'

function Settings() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          API Configuration
        </Typography>
        <TextField
          fullWidth
          label="Gemini API Key"
          type="password"
          margin="normal"
        />
        
        <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
          Analysis Settings
        </Typography>
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Enable Object Detection"
        />
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Enable Scene Recognition"
        />
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Enable Sentiment Analysis"
        />
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Enable Audio Transcription"
        />

        <Box sx={{ mt: 3 }}>
          <Button variant="contained" color="primary">
            Save Settings
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}

export default Settings
