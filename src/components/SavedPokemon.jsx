import React from 'react'
import { Box, Flex, Spacer } from "@chakra-ui/react"
import { Container } from "@chakra-ui/react"
import { ArrowNarrowLeftIcon } from '@heroicons/react/solid'
import SavedPokemonList from './SavedPokemonList'
import { Link } from 'react-router-dom'

const SavedPokemon = () => {
    return (
        <Container>
        <Flex className=" pt-5 z-20">
          <Box className="py-4 bg-transparent">
              <Link to="/">
                <ArrowNarrowLeftIcon className="h-7 w-7" />
              </Link>
          </Box>
          <Spacer />
          <Box className="py-4 bg-transparent">
          </Box>
        </Flex>
        <h1 className="font-bold mb-7 text-3xl">My Pokemon List</h1>
        <SavedPokemonList />
      </Container>
    )
}

export default SavedPokemon