

export type SpeedParams = {
    scarf: boolean,
    paralysis: boolean,
    tailwind: boolean,
    weather: boolean,
    evs: number, //努力値
    ivs: number, // 個体値,
    rank: number,
    baseStats: number,
    nature: 'up' | 'down' | 'none'
}

export const initialParams: SpeedParams = {
    scarf: false,
    paralysis: false,
    tailwind: false,
    weather: false,
    evs: 252,
    ivs: 31, //最高
    baseStats: 0,
    rank: 0,
    nature: 'none'
}

const rankCorrectionFactor: { [key: string]: number } = {
    '6': 8.0 / 2,
    '5': 7.0 / 2,
    '4': 6.0 / 2,
    '3': 5.0 / 2,
    '2': 4.0 / 2,
    '1': 3.0 / 2,
    '0': 1.0,
    '-1': 2.0 / 3,
    '-2': 2.0 / 4,
    '-3': 2.0 / 5,
    '-4': 2.0 / 6,
    '-5': 2.0 / 7,
    '-6': 2.0 / 8
}

export const calcSpeed = ({
    scarf,
    paralysis,
    tailwind,
    weather,
    evs,
    ivs,
    baseStats,
    nature,
    rank
}: SpeedParams) => {
    const weatherCorrection = weather ? 2.0 : 1.0;
    const tailWondCorrection = tailwind ? 2.0 : 1.0;
    const paralysisCorrection = paralysis ? 0.5 : 1.0;
    const scarfCorrection = scarf ? 3.0 / 2 : 1.0;
    const equipmentCorrection = weatherCorrection * tailWondCorrection * paralysisCorrection * scarfCorrection;
    const natureCorretion = nature === 'up' ? 1.1 : nature === 'down' ? 0.9 : 1.0
    const correctionRank = rankCorrectionFactor[String(rank)]
    return Math.floor(Math.floor(((
        baseStats * 2.0 + ivs + evs / 4.0
    ) * (50.0 / 100.0) + 5)) * equipmentCorrection * natureCorretion * correctionRank)
}

export const calcEvs = ({
    scarf,
    paralysis,
    tailwind,
    weather,
    ivs,
    baseStats,
    nature,
    rank
}: SpeedParams, targetSpeed: number) => {
    const weatherCorrection = weather ? 2.0 : 1.0;
    const tailWondCorrection = tailwind ? 2.0 : 1.0;
    const paralysisCorrection = paralysis ? 0.5 : 1.0;
    const scarfCorrection = scarf ? 3.0 / 2 : 1.0;
    const equipmentCorrection = weatherCorrection * tailWondCorrection * paralysisCorrection * scarfCorrection;
    const natureCorretion = nature === 'up' ? 1.1 : nature === 'down' ? 0.9 : 1.0
    const correctionRank = rankCorrectionFactor[String(rank)]
    return Math.min(252, Math.max(0, Math.ceil(((
        targetSpeed * 1.0 / correctionRank / natureCorretion / equipmentCorrection - 5
    ) / (50.0 / 100.0) - ivs - baseStats * 2.0) * 4.0)));
}