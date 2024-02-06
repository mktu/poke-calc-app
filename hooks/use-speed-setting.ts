import { SpeedCalcMode } from "@/logics/speed-setting"
import { useCallback, useState } from "react"

export const useSpeedSetting = () => {
    const [mode, setMode] = useState<SpeedCalcMode>('vs')
    const onChangeMode = useCallback((mode: SpeedCalcMode) => {
        setMode(mode)
    }, [])
    return {
        onChangeMode,
        mode
    }
}