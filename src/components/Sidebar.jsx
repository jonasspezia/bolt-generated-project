import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'
import AssessmentIcon from '@mui/icons-material/Assessment'
import SettingsIcon from '@mui/icons-material/Settings'

function Sidebar() {
  const navigate = useNavigate()
  const drawerWidth = 240

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Video Analysis', icon: <VideoLibraryIcon />, path: '/analysis' },
    { text: 'Reports', icon: <AssessmentIcon />, path: '/reports' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ]

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          top: '64px',
          height: 'calc(100% - 64px)',
        },
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => navigate(item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  )
}

export default Sidebar
