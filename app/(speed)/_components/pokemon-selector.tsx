"use client"
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { usePokeSearch } from "@/hooks/usePokeSearch"
import { Doc } from "@/convex/_generated/dataModel";
import { FC, useCallback, useRef, useState } from "react"

type Props = {
    onSelect: (id: Doc<'pokemon'> | null) => void,
    selected?: Doc<'pokemon'>
}

const PokemonSelector: FC<Props> = ({
    onSelect,
    selected
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [open, setOpen] = useState(false);
    const { onInputChange, pokemons, inputText } = usePokeSearch()
    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
        const input = inputRef.current
        if (input) {
            if (e.key === "Delete" || e.key === "Backspace") {

            }
            // This is not a default behaviour of the <input /> field
            if (e.key === "Escape") {
                input.blur();
            }
        }
    }, [])
    return (
        <Command onKeyDown={handleKeyDown} value={selected?._id} shouldFilter={false} className='overflow-visible'>
            <label className="text-sm text-muted-foreground">ポケモン</label>
            <CommandInput value={inputText} ref={inputRef} placeholder='ポケモンを検索' onValueChange={(text) => {
                onInputChange(text)
                if (selected) {
                    onSelect(null)
                }
            }}
                onBlur={() => setOpen(false)}
                onFocus={() => {
                    setOpen(true)
                    if (selected) {
                        inputRef.current?.select()
                    }
                }}
            />
            <div className="relative mt-2">
                {!selected && open && (
                    <CommandList className="absolute left-0 top-0 w-full rounded bg-background shadow-md">
                        <CommandEmpty>ポケモンが見つかりません</CommandEmpty>
                        {pokemons?.map(v => (
                            <CommandItem
                                className="flex items-center gap-2"
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                }}
                                onSelect={() => {
                                    onSelect(v)
                                    onInputChange(v.name)
                                }}
                                value={v._id} key={v._id}>
                                {/* <Image src={v.img} width={50} height={50} alt={v.name} /> */}
                                {v.name}
                            </CommandItem>
                        ))}
                    </CommandList>
                )}
            </div>
        </Command>
    )
}

export default PokemonSelector