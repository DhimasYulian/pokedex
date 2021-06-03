import React from "react"
import { ChakraProvider } from "@chakra-ui/react"
import Home from "./components/Home";
import PokemonDetails from "./components/PokemonDetails";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import SavedPokemon from "./components/SavedPokemon";

function App() {
  return (
    <ChakraProvider>
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home/>
        </Route>
        <Route path="/saved" exact>
          <SavedPokemon/>
        </Route>
        <Route path="/pokemon/:name">
          <PokemonDetails />
        </Route>
      </Switch>
    </Router>
    </ChakraProvider>
  )
}

export default App;