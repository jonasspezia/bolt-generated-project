import { Box, Typography } from '@mui/material'
import VideoPreview from './VideoPreview'

function VideoPreviewGrid({ files, onDelete, onAnalyze }) {
  if (!files?.length) {
    return (
      <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
        No videos selected for analysis
      </Typography>
    )
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 2,
        mt: 2
      }}
    >
      {files.map((file, index) => (
        <VideoPreview
          key={`${file.name}-${index}`}
          file={file}
          onDelete={onDelete}
          onAnalyze={onAnalyze}
        />
      ))}
    </Box>
  )
}

export default VideoPreviewGrid
