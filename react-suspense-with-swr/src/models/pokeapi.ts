export interface PokemonType {
  type: {
    name: string
  }
}

export interface PokemonResponse {
  id: string
  name: string
  sprites: {
    front_default: string
  }
  types: PokemonType[]
  error: boolean
}