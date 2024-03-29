
import { api } from "@/convex/_generated/api";
import { toKatakana } from 'wanakana'
import { useQuery } from "convex/react";
import { useCallback, useState } from "react";

export const usePokeSearch = (init?: string) => {
    const [searchname, setSearchName] = useState('')
    const [inputText, setInputText] = useState(init)
    const pokemons = useQuery(api.pokemon.seearchList, { name: searchname });
    const onInputChange = useCallback((search: string) => {
        setSearchName(toKatakana(search))
        setInputText(search)
    }, [])
    return {
        onInputChange,
        pokemons,
        inputText
    }
}