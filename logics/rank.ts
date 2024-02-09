import { Doc } from "@/convex/_generated/dataModel";

export const linkRankToPokemon = (pokemons: Doc<'pokemon'>[], rankins: Doc<'ranking'>[]) => {
    return rankins.map(r => {
        if (r.pokeId) {
            return r
        }
        const p = pokemons.filter(p => p.no === r.no)
        if (p.length === 1) {
            return {
                ...r,
                pokeId: p[0]._id,
                s: p[0].s
            }
        }
        return r
    })
}