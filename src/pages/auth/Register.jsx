import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  MenuItem,
} from '@mui/material'
import { useAuth } from '../../contexts/AuthContext'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('student')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { signUp } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { error } = await signUp(email, password)
      if (error) throw error
      navigate('/login')
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
          Create Account
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
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
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            select
            label="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            margin="normal"
            required
          >
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="teacher">Teacher</MenuItem>
          </TextField>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{ mt: 2 }}
          >
            Sign Up
          </Button>
        </form>

        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography>
            Already have an account? <Link to="/login">Sign In</Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  )
}

export default Register
