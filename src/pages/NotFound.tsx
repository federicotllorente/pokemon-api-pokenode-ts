import { FunctionComponent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography, Button } from '@mui/material'
import { Layout } from '../components/Layout'

export const NotFound: FunctionComponent = () => {
  const navigate = useNavigate()

  return (
    <Layout>
      <Typography variant='h3' component='h3'>
        Sorry, the page was not found
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate('/')}
        sx={{ width: 'fit-content', marginTop: 2 }}
      >
        Return to the Homepage
      </Button>
    </Layout>
  )
}
