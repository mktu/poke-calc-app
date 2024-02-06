import { Doc } from "@/convex/_generated/dataModel";

export const linkRankToPokemon = (pokemons: Doc<'pokemon'>[], rankins: Doc<'ranking'>[]) => {
    return rankins.map(r => {
        if (r.pokeId) {
            return r
        }
        const p = pokemons.find(p => p.name === r.name)
        if (p) {
            return {
                ...r,
                pokeId: p._id,
            }
        }
        return r
    })
}