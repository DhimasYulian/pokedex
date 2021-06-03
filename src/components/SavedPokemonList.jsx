import { SimpleGrid } from '@chakra-ui/layout'
import React from 'react'
import PokeCard from './PokeCard'

const SavedPokemonList = () => {
        let pokemons = JSON.parse(localStorage.getItem("savedPokemon"))
    return (
        <SimpleGrid columns={2} spacing={2}>
            {
                pokemons.length ? 
                pokemons.map(pokemon => (
                    <PokeCard key={pokemon.name} name={pokemon.name} color={pokemon.color.name} image={pokemon.sprites.other["official-artwork"].front_default} types={pokemon.types} /> 
                ))
                : <p className="mx-auto text-lg">No Pokemon Available</p>
            }
        </SimpleGrid>
    )
}

export default SavedPokemonList
