import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
} from '@mui/material'
import { useAuth } from '../../contexts/AuthContext'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { resetPassword } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')
    setLoading(true)

    try {
      const { error } = await resetPassword(email)
      if (error) throw error
      setMessage('Check your email for password reset instructions')
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Paper sx={{ p: 4, maxWidth: 400, width: '100%' }}>
        <Typography variant="h5" align="center" gutterBottom>
          Reset Password
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {message && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{ mt: 2 }}
          >
            Reset Password
          </Button>
        </form>

        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography>
            <Link to="/login">Back to Login</Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  )
}

export default ForgotPassword
