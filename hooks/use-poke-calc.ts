import { Doc } from "@/convex/_generated/dataModel"
import { SpeedParams, calcEvs, calcSpeed, initialParams } from "@/logics/calc"
import { useCallback, useMemo, useState } from "react"

export const usePokeCalc = () => {
    const [selected, setSelected] = useState<Doc<'pokemon'>>()
    const [target, setTarget] = useState<Doc<'pokemon'>>()
    const [myParams, setMyParams] = useState<SpeedParams>(initialParams)
    const [targetParams, setTargetParams] = useState<SpeedParams>(initialParams)
    const onSelectMyPokemon = useCallback((pokemon: Doc<'pokemon'> | null) => {
        if (pokemon === null) {
            setSelected(undefined)
            setMyParams(initialParams)
            return
        }
        setSelected(pokemon)
        setMyParams(before => ({
            ...before,
            baseStats: pokemon.s
        }))
    }, [])
    const onSelectTarget = useCallback((pokemon: Doc<'pokemon'> | null) => {
        if (pokemon === null) {
            setTarget(undefined)
            setTargetParams(initialParams)
            return
        }
        setTarget(pokemon)
        setTargetParams(before => ({
            ...before,
            baseStats: pokemon.s
        }))
    }, [])
    const onCalcTargetPlus1 = useCallback(() => {
        const evs = calcEvs(myParams, calcSpeed(targetParams) + 1)
        setMyParams(before => ({
            ...before,
            evs
        }))
    }, [myParams, targetParams])
    const onChangeTargetParams = setTargetParams
    const onChangeMyParams = setMyParams
    const targetSpeed = useMemo(() => calcSpeed(targetParams), [targetParams])
    const mySpeed = useMemo(() => calcSpeed(myParams), [myParams])
    return {
        onSelectMyPokemon,
        onSelectTarget,
        onChangeTargetParams,
        onChangeMyParams,
        onCalcTargetPlus1,
        myParams,
        targetParams,
        selected,
        target,
        targetSpeed,
        mySpeed
    }
}