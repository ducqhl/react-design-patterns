import { FC, Suspense } from 'react'
import useSWR from 'swr'
import { REACT_APP_POKEAPI_URL } from '../../constants'
import LoadingSkeleton from './LoadingSkeleton'
import Pokemon from './Pokemon'
import { StyledGrid } from './Pokemon.styled'

const Pokedex: FC = () => {
  const {
    data: { results }
  } = useSWR(`${REACT_APP_POKEAPI_URL}?limit=150`)

  return (
    <>
      {results.map((pokemon: { name: string }) => (
        <Suspense
          fallback={
            <StyledGrid>
              <LoadingSkeleton />
            </StyledGrid>
          }
        >
          <Pokemon key={pokemon.name} pokemonName={pokemon.name} />
        </Suspense>
      ))}
    </>
  )
}

export default Pokedex
