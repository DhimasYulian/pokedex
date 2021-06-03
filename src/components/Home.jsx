import React from 'react'
import { Box, Flex, Spacer } from "@chakra-ui/react"
import { Container } from "@chakra-ui/react"
import { ArrowNarrowLeftIcon, MenuIcon} from '@heroicons/react/solid'
import { AdjustmentsIcon } from '@heroicons/react/outline'
import PokemonList from "./PokemonList"
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <Container style={{overflowX:"hidden", position: "relative"}}>
        <div className="absolute w-56 h-56 bg-gray-100  -top-10 -right-10 rounded-full z-1"></div>
        <Flex className=" pt-5 z-20">
          <Box className="py-4 bg-transparent">
            <ArrowNarrowLeftIcon className="h-7 w-7" />
          </Box>
          <Spacer />
          <Box className="py-4 bg-transparent z-20">
            <Link to="/saved">
              <MenuIcon className="h-7 w-7" />
            </Link>
          </Box>
        </Flex>
        <h1 className="font-bold mb-7 text-3xl">Pokedex</h1>
        <PokemonList />
        <button className="rounded-full shadow-xl z-50 bg-indigo-700 p-3 fixed bottom-4 right-4">
            <AdjustmentsIcon className="h-7 w-7 text-white transform rotate-90"/>
        </button>
      </Container>
    )
}

export default Home
