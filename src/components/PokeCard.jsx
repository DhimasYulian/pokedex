import { Box } from '@chakra-ui/layout'
import React from 'react'
import { Link } from 'react-router-dom';

const PokeCard = ({name, types, image, color}) => {
    const formatString = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return (
        <Link to={`/pokemon/${name}`} style={{textDecoration: "none"}}>
            <Box className="rounded-xl relative" bg={`${color}.400`} height="120px">
                <div className="p-3 mt-2">
                    <p className="font-bold text-md text-white">{formatString(name)}</p>
                    {
                        types.map(type => (
                            <div>
                                <p className="inline-flex items-center justify-center px-3 py-1 leading-none text-white bg-white bg-opacity-30 rounded-full" style={{fontSize: "10px"}}>{formatString(type.type.name)}</p>
                            </div>
                        ))
                    }
                </div>
                <div className="w-24 h-24 rounded-full absolute -bottom-3 -right-3 bg-white bg-opacity-20"></div>
                <img src={image} className="h-20 w-20 z-50 absolute bottom-2 right-1" alt="" />
            </Box>
        </Link>
    )
}

export default PokeCard
