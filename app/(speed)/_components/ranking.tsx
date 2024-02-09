import { api } from "@/convex/_generated/api"
import { Doc } from "@/convex/_generated/dataModel"
import { useRankFilter } from "@/hooks/use-rank-filter"
import { SpeedParams } from "@/logics/calc"
import { SpeedTypeLabel, calcSpeedRanking } from "@/logics/speed-rank"
import { useQuery } from "convex/react"
import { FC, useMemo } from "react"
import RankFilter from "./rank-filter"

type Props = {
    selected: Doc<'pokemon'>,
    parameters: SpeedParams
}

const Ranking: FC<Props> = ({
    selected,
    parameters
}) => {
    const ranking = useQuery(api.ranking.getRanking)
    const speedRanks = useMemo(() => calcSpeedRanking(selected, parameters, ranking || []), [parameters, ranking, selected])
    const { onChangeRankFilter, rankFilter } = useRankFilter()
    return (
        <div>
            <RankFilter rankFilter={rankFilter} onChangeFilter={onChangeRankFilter} />
            <div className="max-h-[500px] overflow-auto">
                {speedRanks.map(v => (
                    <div className="flex items-center gap-2" key={v.speedRank}>
                        {v.type === 'selected' ? (
                            <>
                                <div className="my-2">👉👉👉👉</div>
                                <div className="font-semibold text-foreground">{v.name}</div>
                                <div>({v.speed})</div>
                            </>
                        ) : (
                            <>
                                <div className={`font-semibold ${v.type === 'none' ? 'text-muted-foreground' :
                                    v.type === 'fastest' ? 'text-red-500' :
                                        v.type === 'second-speed' ? 'text-blue-500' : ''
                                    }`}>{SpeedTypeLabel[v.type]}</div>
                                <div className="text-muted-foreground">{v.name}</div>
                                <div>({v.speed})</div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Ranking