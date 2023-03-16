import { FunctionComponent } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { getPokemonDetails, getPokemonList } from './features/pokemon/services/pokemonApi'
import { PokemonListPage } from './pages/PokemonListPage'
import { NotFound } from './pages/NotFound'
import { PokemonDetailsPage } from './pages/PokemonDetailsPage'

export type AppProps = {}

export const App: FunctionComponent<AppProps> = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <PokemonListPage />,
      errorElement: <NotFound />,
      loader: async () => {
        const pokemonListAPIResponse = await getPokemonList()
        return { pokemonListAPIResponse: pokemonListAPIResponse ?? {} }
      }
    },
    {
      path: 'pokemon/:pokemonId',
      element: <PokemonDetailsPage />,
      errorElement: <NotFound />,
      loader: async ({ params }) => {
        if (!params.pokemonId) throw new Error
        const pokemonDetailsAPIResponse = await getPokemonDetails(params.pokemonId)
        return { pokemonDetailsAPIResponse: pokemonDetailsAPIResponse ?? {} }
      }
    },
    {
      path: 'search/:searchInput',
      element: <PokemonListPage isSearchPage />,
      errorElement: <NotFound />,
      loader: async ({ params }) => {
        if (!params.searchInput) throw new Error
        const pokemonListAPIResponse = await getPokemonList()
        const searchResults = pokemonListAPIResponse?.results.filter(v => v.name.includes(decodeURI(params.searchInput ?? '')))

        return {
          pokemonListAPIResponse: pokemonListAPIResponse
            ? {
              count: searchResults?.length,
              results: searchResults
            }
            : {},
          searchInput: decodeURI(params.searchInput ?? '')
        }
      }
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}
