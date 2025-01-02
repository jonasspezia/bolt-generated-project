import { useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Chip,
  Stack,
  LinearProgress,
} from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import DeleteIcon from '@mui/icons-material/Delete'
import InfoIcon from '@mui/icons-material/Info'
import MovieIcon from '@mui/icons-material/Movie'

function VideoPreview({ file, onDelete, onAnalyze }) {
  const [preview, setPreview] = useState(null)
  const [metadata, setMetadata] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!file) return

    const loadPreview = async () => {
      try {
        // Create video element
        const videoElement = document.createElement('video')
        videoElement.preload = 'metadata'
        
        // Create object URL for the file
        const objectUrl = URL.createObjectURL(file)
        videoElement.src = objectUrl

        // Wait for metadata to load
        await new Promise((resolve, reject) => {
          videoElement.onloadedmetadata = resolve
          videoElement.onerror = reject
          // Timeout after 5 seconds
          setTimeout(reject, 5000)
        })

        // Seek to first frame
        videoElement.currentTime = 0.1
        
        // Wait for frame to load
        await new Promise((resolve) => {
          videoElement.onseeked = resolve
        })

        // Create canvas and draw video frame
        const canvas = document.createElement('canvas')
        canvas.width = 320
        canvas.height = 180
        const ctx = canvas.getContext('2d')
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height)
        
        // Get thumbnail
        const thumbnail = canvas.toDataURL()
        setPreview(thumbnail)
        
        // Extract metadata
        setMetadata({
          duration: Math.round(videoElement.duration),
          size: (file.size / (1024 * 1024)).toFixed(2),
          type: file.type,
          name: file.name,
          lastModified: new Date(file.lastModified).toLocaleDateString(),
          resolution: `${videoElement.videoWidth}x${videoElement.videoHeight}`
        })

        // Cleanup
        URL.revokeObjectURL(objectUrl)
      } catch (err) {
        console.error('Failed to generate preview:', err)
        setError(true)
        // Set basic metadata even if preview fails
        setMetadata({
          size: (file.size / (1024 * 1024)).toFixed(2),
          type: file.type,
          name: file.name,
          lastModified: new Date(file.lastModified).toLocaleDateString()
        })
      } finally {
        setLoading(false)
      }
    }

    loadPreview()
  }, [file])

  if (loading) {
    return (
      <Card sx={{ maxWidth: 345, m: 1 }}>
        <CardContent>
          <LinearProgress />
          <Typography sx={{ mt: 1 }}>Loading preview...</Typography>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card sx={{ maxWidth: 345, m: 1 }}>
      {error ? (
        <Box
          sx={{
            height: 180,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'action.selected'
          }}
        >
          <MovieIcon sx={{ fontSize: 60, color: 'text.secondary' }} />
        </Box>
      ) : (
        <CardMedia
          component="img"
          height="180"
          image={preview}
          alt={metadata?.name}
          sx={{ objectFit: 'cover' }}
        />
      )}
      
      <CardContent>
        <Typography variant="h6" noWrap title={metadata?.name}>
          {metadata?.name}
        </Typography>
        
        <Stack direction="row" spacing={1} sx={{ mb: 1, flexWrap: 'wrap', gap: 0.5 }}>
          {metadata?.duration && (
            <Chip 
              label={`${metadata.duration}s`} 
              size="small" 
              variant="outlined"
            />
          )}
          <Chip 
            label={`${metadata?.size}MB`} 
            size="small" 
            variant="outlined"
          />
          {metadata?.resolution && (
            <Chip 
              label={metadata.resolution} 
              size="small" 
              variant="outlined"
            />
          )}
        </Stack>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <IconButton 
            color="primary" 
            onClick={() => onAnalyze(file)}
            title="Analyze video"
          >
            <PlayArrowIcon />
          </IconButton>
          
          <IconButton 
            color="info"
            onClick={() => {
              const details = {
                ...metadata,
                error: error ? 'Preview generation failed' : undefined
              }
              alert(JSON.stringify(details, null, 2))
            }}
            title="View metadata"
          >
            <InfoIcon />
          </IconButton>

          <IconButton 
            color="error"
            onClick={() => onDelete(file)}
            title="Remove video"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  )
}

export default VideoPreview
