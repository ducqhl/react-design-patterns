import { FC, Suspense } from 'react'
import Pokedex from './Pokedex'

const PokeContainer: FC = () => {
  return (
    <Suspense fallback={<h2>Loading pokedex...</h2>}>
      <Pokedex />
    </Suspense>
  )
}

export default PokeContainer
