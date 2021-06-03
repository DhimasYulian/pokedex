import { SimpleGrid } from '@chakra-ui/layout'
import React, { useEffect, useState } from 'react'
import PokeCard from './PokeCard'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Spinner } from '@chakra-ui/spinner'

const PokemonList = () => {
    const [pokemons, setPokemons] = useState([])
    const [error, setError] = useState(null)

    const fetchPokemon = async () => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${pokemons.length}`)
            const result = await response.json()
            const pokemonData = result.results
            pokemonData.map(async(item) => {
                let response2 = await fetch(item.url)
                let result2 = await response2.json() 
                let speciesResp = await fetch(result2.species.url)
                let speciesRes = await speciesResp.json()
                if(speciesRes.color.name === "brown"){
                    speciesRes.color.name = "orange"
                }else if(speciesRes.color.name === "white"){
                    speciesRes.color.name = "teal"
                }
                setPokemons(prev => [...prev, {...result2, ...speciesRes} ])
            })
        } catch (error) {
            setError(error.message)
        }
    }

    useEffect(() => {
        fetchPokemon()
    }, [])

    return (
        <InfiniteScroll
            dataLength={pokemons.length}
            next={fetchPokemon}
            hasMore={true}
            loader={<Spinner size="lg" className="mt-5 text-center mx-auto"/>}
        >
        <SimpleGrid columns={2} spacing={2}>
            {error && <p className="mx-auto text-lg">{error}</p> }
            {
                pokemons.length ? 
                pokemons.map(pokemon => (
                    <PokeCard key={pokemon.name} name={pokemon.name} image={pokemon.sprites.other["official-artwork"].front_default} color={pokemon.color.name} types={pokemon.types} /> 
                ))
                : <p className="mx-auto text-lg">Loading...</p>
            }
        </SimpleGrid>
        </InfiniteScroll>
    )
}

export default PokemonList
