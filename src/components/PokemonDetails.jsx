import { Box, Container, Flex, Grid, GridItem, Spacer } from '@chakra-ui/layout'
import { Progress } from '@chakra-ui/progress'
import { Spinner } from '@chakra-ui/spinner'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs'
import { HeartIcon } from '@heroicons/react/outline'
import { ArrowNarrowLeftIcon, HeartIcon as HeartIconSolid } from '@heroicons/react/solid'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'

const PokemonDetails = () => {
    const [pokemon, setPokemon] = useState(null)
    const [error, setError] = useState(null)
    const [savedId, setSavedId] = useState(JSON.parse(localStorage.getItem("savedId")))
    const [savedPokemon, setSavedPokemon] = useState(JSON.parse(localStorage.getItem("savedPokemon")))

    const formatString = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const formatNumber = (number) => {
        const str = number.toString()
        let num = ""
        if(str.length === 1) num = "00"
        if(str.length === 2) num = "0"
        return `${num}${str}`
    }

    const {name} = useParams()
    const history = useHistory()
    const fetchPokemon = async() => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            const result = await response.json()
            const speciesResp = await fetch(result.species.url)
            const speciesRes = await speciesResp.json()
            if(speciesRes.color.name === "brown"){
                speciesRes.color.name = "orange"
            }else if(speciesRes.color.name === "white"){
                speciesRes.color.name = "teal"
            }
            console.log(speciesRes.color)
            setPokemon({...result, ...speciesRes})
        } catch (error) {
            setError(error.message)
        }
    }

    const savePokemon = () => {
        if(!savedPokemon) {
            localStorage.setItem("savedPokemon", JSON.stringify([pokemon]))
            localStorage.setItem("savedId", JSON.stringify([pokemon.id]))
        }else{
            localStorage.setItem("savedPokemon", JSON.stringify([...savedPokemon, pokemon]))
            localStorage.setItem("savedId", JSON.stringify([...savedId, pokemon.id]))
        }
        setSavedId(JSON.parse(localStorage.getItem("savedId")))
        setSavedPokemon(JSON.parse(localStorage.getItem("savedPokemon")))
    }

    const removePokemon = () => {
        if(savedPokemon.length === 1) {
            localStorage.clear()
        }else{
            let filData = savedPokemon.filter(item => item.id !== pokemon.id)
            let filId = savedId.filter(item => item !== pokemon.id)
            localStorage.setItem("savedPokemon", JSON.stringify(filData))
            localStorage.setItem("savedId", JSON.stringify(filId))
        }
        setSavedId(JSON.parse(localStorage.getItem("savedId")))
        setSavedPokemon(JSON.parse(localStorage.getItem("savedPokemon")))
    }

    useEffect(() => {
        fetchPokemon()
    }, [])

    return (
        <Box bg={`${ pokemon && pokemon.color.name}.400`} className={`min-h-screen`}>
        {
        pokemon ? 
        <Container>
            <div className="fixed -top-10 z-1 -left-8 bg-white bg-opacity-10 h-32 w-32 rounded-2xl"></div>
            <div className="fixed top-1/4 -right-10 bg-white bg-opacity-20 h-64 w-64 rounded-full"></div>
            <Flex className="pt-5 z-20">
                <Box className="py-4 px-1 bg-transparent z-50">
                        <ArrowNarrowLeftIcon onClick={() => history.goBack()} className="h-7 w-7 text-white z-50" />
                </Box>
                <Spacer />
                <Box className="py-4 px-1 bg-transparent">
                    {
                        savedId ? 
                        savedId.indexOf(pokemon.id) != -1 ?
                        savedPokemon && savedPokemon.map(item => {
                            if(item.id == pokemon.id){
                                return <HeartIconSolid onClick={() => removePokemon()} className="h-7 w-7 text-white" />
                            }
                        }) 
                        : <HeartIcon onClick={() => savePokemon()} className="h-7 w-7 text-white" />
                        : <HeartIcon onClick={() => savePokemon()} className="h-7 w-7 text-white" />
                    }
                </Box>
            </Flex>
            <div className="flex justify-between items-center mt-3 px-1">
                <div>
                    <h1 className="font-bold mb-3 text-3xl text-white">{formatString(pokemon.name)}</h1>
                    {
                        pokemon.types.map(type => (
                            <p className="inline-flex items-center justify-center px-4 py-2 leading-none text-white bg-white bg-opacity-30 rounded-full mr-2 text-sm">{formatString(type.type.name)}</p>
                        ))
                    }
                </div>
                <div>
                    <p className="font-bold text-lg text-white px-1">#{formatNumber(pokemon.id)}</p>
                </div>
            </div>
            <div className="relative w-3/5 mx-auto">
                <img src={pokemon.sprites.other["official-artwork"].front_default} className="absolute z-30" alt="" />
            </div>
            <div className="absolute z-1 bottom-0 min-w-full left-0 h-1/2 rounded-3xl rounded-b-none bg-white overflow-y-scroll hide-scrollbar">
                <Tabs style={{maxWidth: "90%"}} className="mt-8 mx-auto">
                    <TabList className="sticky top-0 bg-white">
                        <Tab><p className="text-sm">About</p></Tab>
                        <Tab><p className="text-sm">Base Stats</p></Tab>
                        <Tab><p className="text-sm">Evolution</p></Tab>
                        <Tab><p className="text-sm">Moves</p></Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Grid
                            className="mt-2"
                            h="fit-content"
                            templateColumns="repeat(3, 1fr)"
                            gap={3}
                            >
                                <GridItem colSpan={1}><p className="text-gray-400 text-sm">Species</p></GridItem>
                                <GridItem colSpan={2}><p className="font-semibold text-sm">{formatString(pokemon.species.name)}</p></GridItem>
                                <GridItem colSpan={1}><p className="text-gray-400 text-sm">Height</p></GridItem>
                                <GridItem colSpan={2}><p className="font-semibold text-sm">{pokemon.height} cm</p></GridItem>
                                <GridItem colSpan={1}><p className="text-gray-400 text-sm">Weight</p></GridItem>
                                <GridItem colSpan={2}><p className="font-semibold text-sm">{pokemon.weight} kg</p></GridItem>
                                <GridItem colSpan={1}><p className="text-gray-400 text-sm">Abilities</p></GridItem>
                                <GridItem colSpan={2}><p className="font-semibold text-sm">{pokemon.abilities.map((ability, idx) => (
                                    <span>{formatString(ability.ability.name)}{idx+1 !== pokemon.abilities.length && ","} </span>
                                ))}</p></GridItem>
                            </Grid>
                            <p className="text-lg font-semibold mt-5">Breeding</p>
                            <Grid
                            className="mt-4"
                            h="fit-content"
                            templateColumns="repeat(3, 1fr)"
                            gap={3}
                            >
                                <GridItem colSpan={1}><p className="text-gray-400 text-sm">Gender</p></GridItem>
                                <GridItem colSpan={2}><p className="text-sm font-semibold flex items-start"><span className="material-icons text-blue-400">male</span><span className="ml-2">{(8 - pokemon.gender_rate) / 8 * 100 }%</span> <span className="material-icons text-red-400 ml-3">female</span><span className="ml-1">{pokemon.gender_rate / 8 * 100}%</span></p></GridItem>
                                <GridItem colSpan={1}><p className="text-gray-400 text-sm">Egg Groups</p></GridItem>
                                <GridItem colSpan={2}><p className="text-sm font-semibold">{pokemon.egg_groups.map((eg, idx) => <span>{formatString(eg.name)}{idx+1 !== pokemon.egg_groups.length && ","} </span> )}</p></GridItem>
                                <GridItem colSpan={1}><p className="text-gray-400 text-sm">Egg Cycle</p></GridItem>
                                <GridItem colSpan={2}><p className="text-sm font-semibold">-</p></GridItem>
                            </Grid>
                        </TabPanel>
                        <TabPanel>
                        <Grid
                            className="mt-2"
                            h="fit-content"
                            templateColumns="repeat(7, 1fr)"
                            gap={3}
                            >
                                <GridItem colSpan={2}><p className="text-gray-400 text-sm">HP</p></GridItem>
                                <GridItem colSpan={1}><p className="font-semibold text-sm">{pokemon.stats[0].base_stat}</p></GridItem>
                                <GridItem colSpan={4}>
                                    <Progress value={pokemon.stats[0].base_stat} className="mt-2" size="xs" colorScheme="pink" />
                                </GridItem>
                                <GridItem colSpan={2}><p className="text-gray-400 text-sm">Attack</p></GridItem>
                                <GridItem colSpan={1}><p className="font-semibold text-sm">{pokemon.stats[1].base_stat}</p></GridItem>
                                <GridItem colSpan={4}>
                                    <Progress value={pokemon.stats[1].base_stat} className="mt-2" size="xs" colorScheme="green" />
                                </GridItem>
                                <GridItem colSpan={2}><p className="text-gray-400 text-sm">Defense</p></GridItem>
                                <GridItem colSpan={1}><p className="font-semibold text-sm">{pokemon.stats[2].base_stat}</p></GridItem>
                                <GridItem colSpan={4}>
                                    <Progress value={pokemon.stats[2].base_stat} className="mt-2" size="xs" colorScheme="pink" />
                                </GridItem>
                                <GridItem colSpan={2}><p className="text-gray-400 text-sm">Sp. Atk</p></GridItem>
                                <GridItem colSpan={1}><p className="font-semibold text-sm">{pokemon.stats[3].base_stat}</p></GridItem>
                                <GridItem colSpan={4}>
                                    <Progress value={pokemon.stats[3].base_stat} className="mt-2" size="xs" colorScheme="green" />
                                </GridItem>
                                <GridItem colSpan={2}><p className="text-gray-400 text-sm">Sp. Def</p></GridItem>
                                <GridItem colSpan={1}><p className="font-semibold text-sm">{pokemon.stats[4].base_stat}</p></GridItem>
                                <GridItem colSpan={4}>
                                    <Progress value={pokemon.stats[4].base_stat} className="mt-2" size="xs" colorScheme="pink" />
                                </GridItem>
                                <GridItem colSpan={2}><p className="text-gray-400 text-sm">Speed</p></GridItem>
                                <GridItem colSpan={1}><p className="font-semibold text-sm">{pokemon.stats[5].base_stat}</p></GridItem>
                                <GridItem colSpan={4}>
                                    <Progress value={pokemon.stats[5].base_stat} className="mt-2" size="xs" colorScheme="green" />
                                </GridItem>
                                <GridItem colSpan={2}><p className="text-gray-400 text-sm">Total</p></GridItem>
                                <GridItem colSpan={1}><p className="font-semibold text-sm">{pokemon.stats.reduce((acc, {base_stat}) => acc + base_stat, 0)}</p></GridItem>
                                <GridItem colSpan={4}>
                                    <Progress value={pokemon.stats.reduce((acc, {base_stat}) => acc + base_stat, 0)}  className="mt-2" size="xs" colorScheme="pink" />
                                </GridItem>
                            </Grid>
                            <p className="text-lg font-semibold mt-5">Type Defenses</p>
                            <p className="text-gray-400 mt-2 text-sm">The effectiveness of each type on {formatString(pokemon.name)}</p>
                        </TabPanel>
                        <TabPanel>
                        <p className="text-center mt-10">Evolution</p>
                        </TabPanel>
                        <TabPanel>
                        <p className="text-center mt-10">Moves</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
        </Container> : (
            <div className="flex justify-center items-center min-h-screen">
                <Spinner size="xl" />
            </div>
        )
        }
        </Box>
    )
}

export default PokemonDetails
