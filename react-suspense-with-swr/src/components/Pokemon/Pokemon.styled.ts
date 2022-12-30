import styled from 'styled-components'

// Type colors
const types: any = {
  bug: '#2ADAB1',
  dark: '#636363',
  dragon: '#E9B057',
  electric: '#ffeb5b',
  fairy: '#ffdbdb',
  fighting: '#90a4b5',
  fire: '#F7786B',
  flying: '#E8DCB3',
  ghost: '#755097',
  grass: '#2ADAB1',
  ground: '#dbd3a2',
  ice: '#C8DDEA',
  normal: '#ccc',
  poison: '#cc89ff',
  psychic: '#705548',
  rock: '#b7b7b7',
  steel: '#999',
  water: '#58ABF6'
}

type Props = {
  pokemonType: string
}

export const StyledPokedex = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-flow: row wrap;
  margin: 0 auto;
  width: 90%;

  &::after {
    content: '';
    flex: auto;
  }
`

export const StyledCard = styled.div<Props>`
  position: relative;

  ${({ pokemonType }) => `
    background: ${types[pokemonType]} url('./pokeball.png') no-repeat;
    background-size: 65%;
    background-position: center;
  `}

  color: #000;
  font-size: 0.8rem;
  border-radius: 1.25rem;
  margin: 0.325rem;
  width: 200px;

  img {
    margin-left: auto;
    margin-right: auto;
    display: block;
  }
`

export const StyledTypes = styled.div`
  display: flex;
  margin-left: 0.35rem;
  margin-bottom: 0.5rem;
`

export const StyledType = styled.span`
  display: inline-block;
  background-color: black;
  border-radius: 20px;
  font-weight: bold;
  padding: 0.375rem 0.6rem;
  color: white;
  margin-right: 0.2rem;
  opacity: 0.4;
  text-transform: capitalize;
`

export const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;

  h2 {
    margin-left: 0.625rem;
    margin-top: 0.235rem;
    color: white;
    text-transform: capitalize;
  }

  div {
    color: white;
    font-size: 1.25rem;
    font-weight: bold;
    margin-top: 0.325rem;
  }
`

export const StyledTitle = styled.h1`
  text-align: center;
`

export const StyledGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-flow: row wrap;

  div {
    margin-right: 5px;
    margin-bottom: 5px;
  }
`
