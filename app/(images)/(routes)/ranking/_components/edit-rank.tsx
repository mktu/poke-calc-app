"use client"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Doc } from "@/convex/_generated/dataModel"
import { Edit3 } from "lucide-react"
import { FC, useState } from "react"
import { toKatakana } from "wanakana"

type Props = {
    pokemons: Doc<'pokemon'>[],
    onSelectPokemon: (pokemon: Doc<'pokemon'>) => void,
    targetNo: number
}

const EditRank: FC<Props> = ({
    pokemons,
    onSelectPokemon,
    targetNo
}) => {
    const [open, setOpen] = useState(false)
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="link"
                    role="combobox"
                    size={'icon'}
                    aria-expanded={open}
                >
                    <Edit3 className="size-4 outline-muted-foreground" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="max-h-[250px] w-[200px] overflow-auto p-0">
                <Command filter={(value, search) => {
                    if (value.includes(toKatakana(search))) {
                        return 1
                    }
                    return 0
                }}>
                    <CommandInput placeholder="Search framework..." className="h-9" />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                        {pokemons.filter(pokemon => pokemon.no === targetNo).map((pokemon) => (
                            <CommandItem
                                key={pokemon._id}
                                value={pokemon.name}
                                onSelect={() => {
                                    onSelectPokemon(pokemon)
                                    setOpen(false)
                                }}
                            >
                                {pokemon.name}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default EditRank