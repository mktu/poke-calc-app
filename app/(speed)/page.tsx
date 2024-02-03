"use client"
import { usePokeCalc } from "@/hooks/usePokeCalc";
import PokemonSelector from "./_components/pokemon-selector";
import Parameters from './_components/parameters'

const SpeedPage: React.FC = () => {
  const { selected,
    onSelectMyPokemon,
    target,
    onSelectTarget,
    targetParams,
    myParams,
    onChangeMyParams,
    onChangeTargetParams,
    onCalcTargetPlus1
  } = usePokeCalc()
  return (
    <div className="flex w-full gap-2 p-4">
      <div className="flex flex-1 flex-col justify-start">
        <PokemonSelector onSelect={onSelectMyPokemon} selected={selected} />
        {selected && <Parameters onCalcTargetPlus1={onCalcTargetPlus1} pokemon={selected} parameters={myParams} onChangeParam={onChangeMyParams} />}
      </div>
      <div className="min-h-[250px] w-[1px] self-stretch bg-border" />
      <div className="flex-1">
        <PokemonSelector onSelect={onSelectTarget} selected={target} />
        {target && <Parameters pokemon={target} parameters={targetParams} onChangeParam={onChangeTargetParams} />}
      </div>
    </div>
  )
}

export default SpeedPage