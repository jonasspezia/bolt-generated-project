import { useState } from 'react'
import { Box, Button, Paper, Typography, LinearProgress } from '@mui/material'
import { useDropzone } from 'react-dropzone'
import { GoogleGenerativeAI } from '@google/generative-ai'
import VideoPreviewGrid from '../components/VideoPreview/VideoPreviewGrid'

function VideoAnalysis() {
  const [analyzing, setAnalyzing] = useState(false)
  const [results, setResults] = useState(null)
  const [selectedFiles, setSelectedFiles] = useState([])

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'video/*': ['.mp4', '.avi', '.mov']
    },
    onDrop: (acceptedFiles) => {
      setSelectedFiles(prev => [...prev, ...acceptedFiles])
    }
  })

  const handleDelete = (fileToDelete) => {
    setSelectedFiles(prev => 
      prev.filter(file => file !== fileToDelete)
    )
  }

  const handleAnalyze = async (file) => {
    setAnalyzing(true)
    // Initialize Gemini API (replace with your API key)
    const genAI = new GoogleGenerativeAI('YOUR_API_KEY')
    
    try {
      // Process video with Gemini
      // This is a placeholder for actual implementation
      setTimeout(() => {
        setResults({
          objects: ['Person', 'Car', 'Building'],
          scenes: ['Urban', 'Outdoor'],
          sentiment: 'Positive',
          transcript: 'Sample transcript...'
        })
        setAnalyzing(false)
      }, 2000)
    } catch (error) {
      console.error('Analysis failed:', error)
      setAnalyzing(false)
    }
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Video Analysis
      </Typography>

      <Paper
        {...getRootProps()}
        sx={{
          p: 3,
          textAlign: 'center',
          cursor: 'pointer',
          bgcolor: 'background.default',
          '&:hover': {
            bgcolor: 'action.hover',
          },
        }}
      >
        <input {...getInputProps()} />
        <Typography>
          Drag and drop video files here, or click to select files
        </Typography>
      </Paper>

      <VideoPreviewGrid 
        files={selectedFiles}
        onDelete={handleDelete}
        onAnalyze={handleAnalyze}
      />

      {analyzing && (
        <Box sx={{ mt: 2 }}>
          <Typography>Analyzing video...</Typography>
          <LinearProgress />
        </Box>
      )}

      {results && (
        <Paper sx={{ mt: 2, p: 2 }}>
          <Typography variant="h6">Analysis Results</Typography>
          <Typography>Objects: {results.objects.join(', ')}</Typography>
          <Typography>Scenes: {results.scenes.join(', ')}</Typography>
          <Typography>Sentiment: {results.sentiment}</Typography>
          <Typography>Transcript: {results.transcript}</Typography>
        </Paper>
      )}
    </Box>
  )
}

export default VideoAnalysis
