import { memo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { styled } from '@mui/material/styles'
import MuiAppBar from '@mui/material/AppBar'
import {
  Typography,
  IconButton,
  Toolbar,
  Divider,
  Box,
  List,
  Link,
  Drawer,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  CircularProgress
} from '@mui/material'
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon
} from '@mui/icons-material'

import { AppBarProps } from '../types'
import { SearchBar } from './SearchBar'

const BurgerMenuForMemo = () => {
  const navigate = useNavigate()
  const isMobileOrLarger = useMediaQuery('(min-width:425px)')
  const isTabletOrLarger = useMediaQuery('(min-width:768px)')

  const [isOpen, setIsOpen] = useState<boolean>(isTabletOrLarger)

  const toggleDrawer = () => setIsOpen(v => !v)

  const drawerWidth = isTabletOrLarger ? '180px' : '100vw'

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'isOpen',
  })<AppBarProps>(({ theme, isOpen }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(isOpen && {
      width: `calc(100% - ${drawerWidth})`,
      marginLeft: `${drawerWidth}`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }))

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }))

  return (
    <>
      <AppBar position="fixed" isOpen={isOpen}>
        <Toolbar sx={{
          width: '100%',
          display: 'flex',
          flexDirection: isMobileOrLarger ? 'row' : 'column',
          justifyContent: 'space-between',
          alignItems: isMobileOrLarger ? 'center' : 'start'
        }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 0.5,
            ...(!isMobileOrLarger && { marginTop: 1 })
          }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              edge="start"
              sx={{
                marginRight: 0.5,
                ...(isOpen && { display: 'none' })
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" noWrap>
              <Link href="/" color="inherit" underline="none">
                PokémonPedia
              </Link>
            </Typography>
          </Box>
          <SearchBar />
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: isOpen ? drawerWidth : 0,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={isOpen}
      >
        <DrawerHeader>
          <Typography component="h2" variant="h6" sx={{ flexGrow: 1, marginLeft: 1 }}>
            Menu
          </Typography>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItemButton onClick={() => navigate(`/`)}>
            <ListItemText primary="Homepage" />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  )
}

export const BurgerMenu = memo(BurgerMenuForMemo)
