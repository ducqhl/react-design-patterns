import { SWRConfig } from 'swr'
import { StyledPokedex, StyledTitle } from './Pokemon/Pokemon.styled'
import fetcher from './Pokemon/fetcher'
import PokeContainer from './Pokemon/PokeContainer'

const App = () => {
  return (
    <>
      <StyledTitle>Pokedex</StyledTitle>
      <SWRConfig
        value={{
          fetcher,
          suspense: true
        }}
      >
        <StyledPokedex>
          <PokeContainer />
        </StyledPokedex>
      </SWRConfig>
    </>
  )
}

export default App
