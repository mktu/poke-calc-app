import { api } from "@/convex/_generated/api"
import { Doc } from "@/convex/_generated/dataModel"
import { useRankFilter } from "@/hooks/use-rank-filter"
import { SpeedParams } from "@/logics/calc"
import { SpeedRank, SpeedTypeLabel, calcSpeedRanking } from "@/logics/speed-rank"
import { useQuery } from "convex/react"
import { FC, Fragment, useEffect, useMemo, useRef, useState } from "react"
import RankFilter from "./rank-filter"
import { Button } from "@/components/ui/button"
import { MenuIcon } from "lucide-react"

type Props = {
    selected: Doc<'pokemon'>,
    parameters: SpeedParams,
    onCalcPlus1: (target: number) => void
}

const Presenter: FC<{
    speedRanks: SpeedRank[],
    selectedSpeed: number,
    onCalcPlus1: (target: number) => void
}> = ({
    speedRanks,
    selectedSpeed,
    onCalcPlus1
}) => {
        const selectedRef = useRef<HTMLLIElement>(null)
        useEffect(() => {
            if (selectedRef.current) {
                selectedRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                })
            }
        }, [selectedSpeed])
        return (
            <ul className="h-full overflow-auto">
                {speedRanks.map(v => (
                    <Fragment key={v.speedRank}>
                        {v.type === 'selected' ? (
                            <li ref={selectedRef} className="flex items-center gap-2">
                                <div className="my-2">👉👉👉👉</div>
                                <div className="font-semibold text-foreground">{v.name}</div>
                                <div>({v.speed})</div>
                            </li>
                        ) : (
                            <li className="group flex items-center gap-2 hover:bg-stone-50">
                                <div className={`font-semibold ${v.type === 'none' ? 'text-muted-foreground' :
                                    v.type === 'fastest' ? 'text-red-400' :
                                        v.type === 'second-speed' ? 'text-blue-400' : ''
                                    }`}>{SpeedTypeLabel[v.type]}</div>
                                <div className="text-muted-foreground">{v.name}</div>
                                <div className="text-muted-foreground">({v.speed})</div>
                                <Button
                                    onClick={() => {
                                        onCalcPlus1(v.speed)
                                    }}
                                    className="ml-auto hidden h-auto group-hover:block" size='sm' variant='outline' >+1 調整</Button>
                            </li>
                        )}
                    </Fragment>
                ))}
            </ul>
        )
    }

const Ranking: FC<Props> = ({
    selected,
    parameters,
    onCalcPlus1
}) => {
    const ranking = useQuery(api.ranking.getRanking)
    const { onChangeRankFilter, rankFilter } = useRankFilter()
    const [isCollapsed, setIsCollapsed] = useState(true)


    const speedRanks = useMemo(() =>
        calcSpeedRanking(selected, parameters, ranking?.filter(v => {
            return v.rank < rankFilter.rankFilter &&
                v.s > rankFilter.speedFilter.min &&
                v.s < rankFilter.speedFilter.max
        }) || []).filter(v => v.type === 'selected' || rankFilter.speedTypeFilter.includes(v.type)), [parameters, ranking, rankFilter, selected])
    const selectedSpeed = speedRanks.find(v => v.name === selected.name && v.type === 'selected')?.speed
    return (
        <div className="relative h-full overflow-hidden">
            {isCollapsed ? (
                <Button size={'icon'} variant='ghost' className="absolute right-0 top-0" onClick={() => {
                    setIsCollapsed(false)
                }}>
                    <MenuIcon className="size-5 text-muted-foreground" />
                </Button>
            ) : (
                <div className="absolute right-0 top-0">
                    <RankFilter rankFilter={rankFilter} onChangeFilter={onChangeRankFilter} onCollapse={() => {
                        setIsCollapsed(true)
                    }} />
                </div>
            )}

            {selectedSpeed && ranking && (
                <Presenter
                    onCalcPlus1={onCalcPlus1}
                    speedRanks={speedRanks}
                    selectedSpeed={selectedSpeed}
                />
            )}
        </div>
    )
}

export default Ranking