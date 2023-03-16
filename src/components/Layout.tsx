import { FunctionComponent, memo, ReactNode } from 'react'
import {
  Container,
  Box,
  CssBaseline,
  useMediaQuery
} from '@mui/material'
import { BurgerMenu } from './BurgerMenu'

const LayoutForMemo: FunctionComponent<{
  children: ReactNode | ReactNode[]
}> = ({
  children
}) => {
  const isMobileOrLarger = useMediaQuery('(min-width:425px)')
  const isTabletOrLarger = useMediaQuery('(min-width:768px)')

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <BurgerMenu />
      <Container component="main">
        <Box
          sx={{
            marginTop: !isMobileOrLarger ? 16 : isTabletOrLarger ? 12 : 10,
            marginBottom: 4,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {children}
        </Box>
      </Container>
    </Box>
  )
}

export const Layout = memo(LayoutForMemo)
