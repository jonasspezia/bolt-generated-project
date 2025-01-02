import { Outlet } from 'react-router-dom'
import { Box, Container } from '@mui/material'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

function Layout() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
          pt: 8,
          px: 3,
        }}
      >
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>
    </Box>
  )
}

export default Layout
