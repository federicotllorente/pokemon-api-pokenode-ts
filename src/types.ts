import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'

export type AppBarProps = MuiAppBarProps & {
  isOpen?: boolean
}
