import { FunctionComponent, useEffect, useState } from "react"
import { useLoaderData } from "react-router-dom"
import {
  Container,
  Box,
  Typography,
  Grid,
  useMediaQuery,
  Pagination
} from '@mui/material'
import { NamedAPIResource, NamedAPIResourceList, Pokemon } from "pokenode-ts"
import { Layout } from "../components/Layout"
import { PokemonCard } from "../components/PokemonCard"
import { getPokemonList } from "../features/pokemon/services/pokemonApi"

export const PokemonListPage: FunctionComponent<{ isSearchPage?: boolean }> = ({
  isSearchPage = false
}) => {
  const { pokemonListAPIResponse, searchInput } = useLoaderData() as {
    pokemonListAPIResponse: Partial<NamedAPIResourceList>
    searchInput?: string
  }

  const [currentPage, setCurrentPage] = useState<number>(0)
  const [currentPageResults, setCurrentPageResults] = useState<Partial<NamedAPIResourceList> | null>(null)

  const {
    count,
    results: pokemonList
  } = pokemonListAPIResponse

  const fetchNewPokemonList = async (offset?: number, limit?: number) => {
    const response = await getPokemonList(offset, limit)

    try {
      if (response) setCurrentPageResults(response)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (currentPage > 0) fetchNewPokemonList(currentPage * 20, 20)
  }, [currentPage])

  const isMobileOrLarger = useMediaQuery('(min-width:425px)')
  const isTabletOrLarger = useMediaQuery('(min-width:768px)')
  const isDesktopOrLarger = useMediaQuery('(min-width:1024px)')

  const renderPokemonList = (pokemon: NamedAPIResource) => (
    <Grid
      key={pokemon.name}
      item
      xs={isDesktopOrLarger ? 3 : isTabletOrLarger ? 4 : isMobileOrLarger ? 6 : 12}
    >
      <PokemonCard name={pokemon.name} />
    </Grid>
  )

  return (
    <Layout>
      <Container>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
          <Typography variant='h4' component='h1'>
            {isSearchPage ? `Results for '${searchInput}'` : 'All Pokémon'}
          </Typography>
          <Typography variant='caption' component='span'>
            {`(${count})`}
          </Typography>
        </Box>
        <Grid container spacing={2} sx={{ my: 4 }}>
          {currentPageResults && currentPage > 0 && !isSearchPage
            ? currentPageResults.results?.map(renderPokemonList)
            : pokemonList?.map(renderPokemonList)
          }
        </Grid>
        {!isSearchPage && (
          <Pagination count={10} onChange={(e) => {
            e.preventDefault()
            // @ts-expect-error
            setCurrentPage(Number(e.target.textContent - 1))
          }} />
        )}
      </Container>
    </Layout>
  )
}
