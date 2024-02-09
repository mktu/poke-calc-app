"use client"

import { Doc } from "@/convex/_generated/dataModel"
import { FC, useState } from "react"
import EditRank from "./edit-rank"
import { Button } from "@/components/ui/button"
import { copyToClipboard } from "@/lib/clipboard"
import { toast } from "sonner";

type Props = {
    pokemons: Doc<'pokemon'>[],
    ranking: Doc<'ranking'>[],
}

const Ranks: FC<Props> = ({
    pokemons,
    ranking
}) => {
    const [pokemonsWithRank, setPokemonsWithRank] = useState(ranking)
    return (
        <div className="p-4">
            {pokemonsWithRank.map(v => (
                <div className="flex items-center gap-2" key={v._id}>
                    <div className="text-muted-foreground">{v.rank}</div>
                    <div className="">{v.name}</div>
                    {v.s === 0 && (
                        <div className="text-destructive">⚠️未設定</div>
                    )}

                    <EditRank
                        pokemons={pokemons}
                        targetNo={v.no}
                        onSelectPokemon={(pokemon) => {
                            setPokemonsWithRank(before => before.map(r => {
                                if (r.rank === v.rank) {
                                    return {
                                        ...r,
                                        pokeId: pokemon._id,
                                        name: pokemon.name,
                                        s: pokemon.s
                                    }
                                }
                                return r
                            }))
                        }}
                    />
                </div>
            ))}
            <Button onClick={() => {
                copyToClipboard(pokemonsWithRank.map(v => ({
                    name: v.name,
                    pokeId: v.pokeId,
                    rank: v.rank,
                    s: v.s,
                    no: v.no
                })))
                toast.success('クリップボードにコピーしました!')
            }}>COPY</Button>
        </div>
    )
}

export default Ranks


