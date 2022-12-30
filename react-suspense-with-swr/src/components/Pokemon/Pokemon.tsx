import { FC } from 'react'
import useSWR from 'swr'
import { REACT_APP_POKEAPI_URL } from '../../constants'
import { PokemonResponse } from '../../models'
import {
  StyledCard,
  StyledHeader,
  StyledType,
  StyledTypes
} from './Pokemon.styled'

type PokemonProps = {
  pokemonName: string
}

const Pokemon: FC<PokemonProps> = ({ pokemonName }) => {
  const { data, error } = useSWR<PokemonResponse, any>(
    `${REACT_APP_POKEAPI_URL.replace(/\/$/, '')}/${pokemonName}`
  )

  if (error || data?.error) {
    return <div />
  }

  if (!data) {
    return <div>Loading...</div>
  }

  const { id, name, sprites, types } = data
  const pokemonTypes = types?.map(pokemonType => pokemonType.type.name)

  return (
    <StyledCard pokemonType={pokemonTypes[0]}>
      <StyledHeader>
        <h2>{name}</h2>
        <div>#{id}</div>
      </StyledHeader>

      <img src={sprites.front_default} alt={name} />

      <StyledTypes>
        {pokemonTypes.map((pokemonType: string) => (
          <StyledType key={pokemonType}>{pokemonType}</StyledType>
        ))}
      </StyledTypes>
    </StyledCard>
  )
}

export default Pokemon
