import { api } from "@/convex/_generated/api";
import { linkRankToPokemon } from "@/logics/rank";
import { ConvexHttpClient } from "convex/browser";
import { FC } from "react";
import Ranks from "./_components/Ranks";

if (!process.env["NEXT_PUBLIC_CONVEX_URL"]) {
    console.error('env variables is not defined for convex')
}
const client = new ConvexHttpClient(process.env["NEXT_PUBLIC_CONVEX_URL"] || '');

const Page: FC = async () => {
    const pokemons = await client.query(api.pokemon.getList)
    const ranking = linkRankToPokemon(pokemons, await client.query(api.ranking.getRanking))
    return (
        <div>
            <Ranks pokemons={pokemons} ranking={ranking} />
        </div>
    )
}

export default Page