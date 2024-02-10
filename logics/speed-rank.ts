import { Doc } from "@/convex/_generated/dataModel";
import { SpeedParams, calcSpeed } from "./calc";

export type SpeedType = 'selected' | 'none' | 'second-speed' | 'fastest'

export const SpeedTypeLabel: { [key in SpeedType]: string } = {
    'selected': '選択中',
    'none': '無振',
    'second-speed': '準速',
    'fastest': '最速'
}

export type SpeedRank = {
    name: string,
    speedRank: number,
    speed: number,
    type: SpeedType
}

const baseSetting: Parameters<typeof calcSpeed>[0] = {
    scarf: false,
    paralysis: false,
    weather: false,
    tailwind: false,
    evs: 0,
    ivs: 31,
    baseStats: 0,
    nature: 'none',
    rank: 0
}

export const calcSpeedRanking = (selected: Doc<'pokemon'>, parameters: SpeedParams, ranking: Doc<'ranking'>[]) => {
    const ranks: SpeedRank[] = []
    ranks.push({
        name: selected.name,
        speed: calcSpeed(parameters),
        speedRank: 0,
        type: 'selected'
    })
    ranking.forEach((p) => {
        const noneSpeedRank = calcSpeed({
            ...baseSetting,
            evs: 0,
            baseStats: p.s
        })
        const secondSpeedRank = calcSpeed({
            ...baseSetting,
            evs: 252,
            baseStats: p.s
        })
        const fastestSpeedRank = calcSpeed({
            ...baseSetting,
            evs: 252,
            nature: 'up',
            baseStats: p.s
        })
        ranks.push({
            name: p.name,
            speed: noneSpeedRank,
            speedRank: 0,
            type: 'none'
        })
        ranks.push({
            name: p.name,
            speed: secondSpeedRank,
            speedRank: 0,
            type: 'second-speed'
        })
        ranks.push({
            name: p.name,
            speed: fastestSpeedRank,
            speedRank: 0,
            type: 'fastest'
        })
    })
    return ranks.sort((v1, v2) => v2.speed - v1.speed).map((v, idx) => ({ ...v, speedRank: idx + 1 }))
}