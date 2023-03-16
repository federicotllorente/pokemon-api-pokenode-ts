import { FunctionComponent } from 'react'
import { useLoaderData } from 'react-router-dom'
import {
  Container,
  Box,
  Typography,
  useMediaQuery
} from '@mui/material'
import { Layout } from '../components/Layout'
import { Pokemon } from 'pokenode-ts'

export const PokemonDetailsPage: FunctionComponent = () => {
  const { pokemonDetailsAPIResponse } = useLoaderData() as {
    pokemonDetailsAPIResponse: Partial<Pokemon>
  }

  const isMobileOrLarger = useMediaQuery('(min-width:425px)')
  const isTabletOrLarger = useMediaQuery('(min-width:768px)')

  return (
    <Layout>
      <Container
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: isTabletOrLarger ? 'row-reverse' : 'column',
          gap: 3, justifyContent: 'space-between'
        }}
      >
        <Box>
          {/* IMAGE */}
          {pokemonDetailsAPIResponse.sprites?.front_default && (
            <Box sx={{
              width: isMobileOrLarger ? 300 : 200,
              height: isMobileOrLarger ? 300 : 200,
              backgroundColor: '#00000010',
              borderRadius: 2
            }}>
              <img
                src={pokemonDetailsAPIResponse.sprites.front_default}
                alt={pokemonDetailsAPIResponse.name}
                width={isMobileOrLarger ? 300 : 200}
                />
            </Box>
          )}
        </Box>
        <Box>
          {/* NAME */}
          {pokemonDetailsAPIResponse.name && (
            <Typography variant='h4' component='h1' sx={{ marginBottom: 2 }}>
              {`${pokemonDetailsAPIResponse.name.charAt(0).toUpperCase()}${pokemonDetailsAPIResponse.name.substring(1)}`}
            </Typography>
          )}

          {/* TYPES */}
          {pokemonDetailsAPIResponse.types && (
            <>
              <Typography variant="h6" component="div">
                  {pokemonDetailsAPIResponse.types.length > 1 ? 'Types' : 'Type'}
              </Typography>
              <ul style={{ marginTop: 0 }}>
                {pokemonDetailsAPIResponse.types.map(({ type }) =>
                  <li key={type.name}>
                    {`${type.name.charAt(0).toUpperCase()}${type.name.substring(1).split('-').join(' ')}`}
                  </li>
                )}
              </ul>
            </>
          )}

          {/* MOVES */}
          {pokemonDetailsAPIResponse.moves && (
            <>
              <Typography variant="h6" component="div">
                Top 5 Moves
              </Typography>
              <ul style={{ marginTop: 0 }}>
                {pokemonDetailsAPIResponse.moves.slice(0, 5).map(({ move }) =>
                  <li key={move.name}>
                    {`${move.name.charAt(0).toUpperCase()}${move.name.substring(1).split('-').join(' ')}`}
                  </li>
                )}
              </ul>
            </>
          )}

          {/* ABILITIES */}
          {pokemonDetailsAPIResponse.abilities && (
            <>
              <Typography variant="h6" component="div">
                Abilities
              </Typography>
              <ul style={{ marginTop: 0 }}>
                {pokemonDetailsAPIResponse.abilities.slice(0, 5).map(({ ability }) =>
                  <li key={ability.name}>
                    {`${ability.name.charAt(0).toUpperCase()}${ability.name.substring(1).split('-').join(' ')}`}
                  </li>
                )}
              </ul>
            </>
          )}

          {/* HEIGHT */}
          <Typography variant="h6" component="div">
            Height
          </Typography>
          <Typography gutterBottom variant="body1" component="div">
            {pokemonDetailsAPIResponse.height}
          </Typography>

          {/* WEIGHT */}
          <Typography variant="h6" component="div">
            Weight
          </Typography>
          <Typography gutterBottom variant="body1" component="div">
            {pokemonDetailsAPIResponse.weight}
          </Typography>
        </Box>
      </Container>
    </Layout>
  )
}
