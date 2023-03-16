import { FunctionComponent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CircularProgress,
  CardActionArea,
} from '@mui/material'
import { Pokemon } from 'pokenode-ts'
import { getPokemonDetails } from '../features/pokemon/services/pokemonApi'

export const PokemonCard: FunctionComponent<{ name: string }> = ({ name }) => {
  const navigate = useNavigate()
  const [pokemonDetails, setPokemonDetails] = useState<Pokemon | null>(null)

  const fetchPokemonDetails = async (pokemonName: string) => {
    const response = await getPokemonDetails(pokemonName)

    try {
      if (response) setPokemonDetails(response)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchPokemonDetails(name)
  }, [])

  if (!pokemonDetails) return <CircularProgress /> // TODO Use a Skeleton
  return (
    <Card sx={{ height: '100%' }}>
      <CardActionArea onClick={() => navigate(`/pokemon/${pokemonDetails.id}`)}>
        {pokemonDetails.sprites.front_default && (
          <CardMedia
            component="img"
            alt={pokemonDetails.name}
            height="200"
            image={pokemonDetails.sprites.front_default}
          />
        )}
        <CardContent>
          {/* NAME */}
          <Typography gutterBottom variant="h5" component="div">
            {`${pokemonDetails.name.charAt(0).toUpperCase()}${pokemonDetails.name.substring(1)}`}
          </Typography>

          {/* TYPES */}
          <Typography variant="subtitle1" component="div">
             {pokemonDetails.types.length > 1 ? 'Types' : 'Type'}
          </Typography>
          <Typography gutterBottom variant="body2" component="div">
            {pokemonDetails.types.map(({ type }, idx, array) =>
              `${
                idx == 0
                  ? `${type.name.charAt(0).toUpperCase()}${type.name.substring(1).split('-').join(' ')}`
                  : `${type.name.split('-').join(' ')}`
              }${idx < array.length - 1 ? ', ' : ''}`
            )}
          </Typography>

          {/* MOVES */}
          <Typography variant="subtitle1" component="div">
            Top 5 Moves
          </Typography>
          <Typography gutterBottom variant="body2" component="div">
            {pokemonDetails.moves.slice(0, 5).map(({ move }, idx, array) =>
              `${
                idx == 0
                  ? `${move.name.charAt(0).toUpperCase()}${move.name.substring(1).split('-').join(' ')}`
                  : `${move.name.split('-').join(' ')}`
              }${idx < array.length - 1 ? ', ' : ''}`
            )}
          </Typography>

          {/* HEIGHT */}
          <Typography variant="subtitle1" component="div">
            Height
          </Typography>
          <Typography gutterBottom variant="body2" component="div">
            {pokemonDetails.height}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}
