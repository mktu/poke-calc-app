export type SpeedCalcMode = 'vs' | 'ranking'
export const SpeedCalcModeLabel: { [key in SpeedCalcMode]: string } = {
    vs: '1 vs 1形式',
    ranking: '使用率上位と比較する'
}