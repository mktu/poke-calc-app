import { SpeedType } from "@/logics/speed-rank"
import { useCallback, useState } from "react"
const MAX_SPEED = 9999
type SpeedMinMax = {
    min: number,
    max: number
}
export type RankFilter = {
    speedTypeFilter: SpeedType[],
    speedFilter: SpeedMinMax,
    rankFilter: number
}

export const useRankFilter = () => {
    const [rankFilter, setRankFilter] = useState<RankFilter>({
        speedTypeFilter: ['none', 'second-speed', 'fastest'],
        speedFilter: { min: 0, max: MAX_SPEED },
        rankFilter: 100
    })
    const onChangeRankFilter = useCallback((filter: Partial<RankFilter>) => {
        setRankFilter(before => ({
            ...before,
            ...filter
        }))
    }, [])
    return {
        rankFilter,
        onChangeRankFilter
    }
}