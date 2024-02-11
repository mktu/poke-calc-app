"use client"
import { usePokeCalc } from "@/hooks/use-poke-calc";
import PokemonSelector from "./_components/pokemon-selector";
import Parameters from './_components/parameters'
import Ranking from "./_components/ranking";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Result from "./_components/result";

const SpeedPage: React.FC = () => {
  const { selected,
    onSelectMyPokemon,
    target,
    onSelectTarget,
    targetParams,
    myParams,
    targetSpeed,
    mySpeed,
    onChangeMyParams,
    onChangeTargetParams,
    onCalcTargetPlus1
  } = usePokeCalc()
  return (
    <div className="flex w-full gap-2 p-4">
      <div className="flex flex-1 flex-col justify-start">
        <div className="mb-2">
          <Result diff={mySpeed - targetSpeed} valid={Boolean(selected && target)} />
        </div>
        <PokemonSelector onSelect={onSelectMyPokemon} selected={selected} />
        {selected && <Parameters
          speed={mySpeed}
          onCalcTargetPlus1={onCalcTargetPlus1}
          pokemon={selected}
          parameters={myParams}
          onChangeParam={onChangeMyParams} />}
      </div>
      <div className="min-h-[250px] w-[1px] self-stretch bg-border" />
      <div className="flex-1">
        <Tabs defaultValue="vs">
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='vs'>相手のポケモンを指定</TabsTrigger>
            <TabsTrigger value='ranking'>使用率上位と比較</TabsTrigger>
          </TabsList>
          <TabsContent value='vs'>
            <PokemonSelector onSelect={onSelectTarget} selected={target} />
            {target && <Parameters speed={targetSpeed}
              pokemon={target}
              parameters={targetParams}
              onChangeParam={onChangeTargetParams} />}
          </TabsContent>
          <TabsContent value='ranking'>
            {selected && <Ranking selected={selected} parameters={myParams} />}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default SpeedPage