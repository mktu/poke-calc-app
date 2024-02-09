import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Doc } from "@/convex/_generated/dataModel"
import { SpeedParams, calcEvs, calcSpeed } from "@/logics/calc"
import { MinusIcon, PlusIcon } from "lucide-react"
import { FC } from "react"

type Props = {
    pokemon: Doc<'pokemon'>,
    parameters: SpeedParams,
    onChangeParam: (parameters: SpeedParams) => void
    onCalcTargetPlus1?: () => void
}

const Parameters: FC<Props> = ({
    pokemon,
    parameters,
    onChangeParam,
    onCalcTargetPlus1
}) => {
    const booleanValues = [{
        label: 'スカーフ',
        id: 'scarf',
        value: parameters.scarf,
        onChange: (checked: boolean) => onChangeParam({ ...parameters, scarf: checked })
    },
    {
        label: 'まひ',
        id: 'paralysis',
        value: parameters.paralysis,
        onChange: (checked: boolean) => onChangeParam({ ...parameters, paralysis: checked })
    },
    {
        label: '追い風',
        id: 'tailwind',
        value: parameters.tailwind,
        onChange: (checked: boolean) => onChangeParam({ ...parameters, tailwind: checked })
    },
    {
        label: '天候',
        id: 'weather',
        value: parameters.weather,
        onChange: (checked: boolean) => onChangeParam({ ...parameters, weather: checked })
    }]
    const speed = calcSpeed(parameters)
    const paramsOnlyEvs: SpeedParams = { ...parameters, scarf: false, paralysis: false, tailwind: false, weather: false, rank: 0, nature: 'none' }
    const speedOnlyEvs = calcSpeed(paramsOnlyEvs)
    return (
        <div className="flex w-full flex-col gap-4 p-2">
            <div className="flex items-center gap-4">
                <div className='text-muted-foreground'>種族値: {pokemon.s}</div>
                <div className='text-muted-foreground'>実数値: {speed}</div>
            </div>
            <div className='flex items-center gap-4'>
                {booleanValues.map(v => (
                    <div className="flex items-center gap-1" key={v.id}>
                        <Checkbox id={v.id} checked={v.value} onCheckedChange={(checked) => {
                            checked !== 'indeterminate' && v.onChange(checked)
                        }} />
                        <label className='text-foreground' htmlFor={v.id}>{v.label}</label>
                    </div>
                ))}
            </div>
            <div className="flex items-end gap-1">
                <div>
                    <label className='text-sm text-muted-foreground' htmlFor="evs">努力値</label>
                    <Input className="w-auto" id='evs' type='number' min={0} max={252} value={parameters.evs} onChange={(e) => {
                        const num = Number(e.target.value)
                        onChangeParam({ ...parameters, evs: num })
                    }} />
                </div>
                <Button variant='outline' size='icon' onClick={() => onChangeParam({ ...parameters, evs: 0 })}>
                    0
                </Button>
                <Button variant='outline' size='icon' onClick={() => onChangeParam({ ...parameters, evs: calcEvs(paramsOnlyEvs, speedOnlyEvs - 1) })}>
                    <MinusIcon className="size-4" />
                </Button>
                <Button variant='outline' size='icon' onClick={() => onChangeParam({ ...parameters, evs: calcEvs(paramsOnlyEvs, speedOnlyEvs + 1) })}>
                    <PlusIcon className="size-4" />
                </Button>
                <Button variant='outline' size='icon' onClick={() => onChangeParam({ ...parameters, evs: 252 })}>
                    252
                </Button>

                {onCalcTargetPlus1 && (
                    <Button onClick={onCalcTargetPlus1}>
                        相手+1
                    </Button>
                )}

            </div>
            <div>
                <label className="text-sm text-muted-foreground" htmlFor="nature">性格補正</label>
                <ToggleGroup className="justify-start" id='nature' value={parameters.nature} type="single" onValueChange={(value) => {
                    onChangeParam({ ...parameters, nature: value as SpeedParams['nature'] })
                }}>
                    <ToggleGroupItem value={'up'}>1.1</ToggleGroupItem>
                    <ToggleGroupItem value={'none'}>1.0</ToggleGroupItem>
                    <ToggleGroupItem value={'down'}>0.9</ToggleGroupItem>
                </ToggleGroup>
            </div>
            <div className="flex items-end gap-1">
                <div>
                    <label className='text-sm text-muted-foreground' htmlFor="rank">補正ランク</label>
                    <Input className="w-auto" id='rank' type='number' max={6} min={-6} value={parameters.rank} onChange={(e) => {
                        const num = Number(e.target.value)
                        onChangeParam({ ...parameters, rank: num })
                    }} />
                </div>
                <Button variant='outline' size='icon' onClick={() => onChangeParam({ ...parameters, rank: Math.max(parameters.rank - 1, -6) })}>
                    <MinusIcon className="size-4" />
                </Button>
                <Button variant='outline' size='icon' onClick={() => onChangeParam({ ...parameters, rank: 0 })}>
                    0
                </Button>
                <Button variant='outline' size='icon' onClick={() => onChangeParam({ ...parameters, rank: Math.min(parameters.rank + 1, 6) })}>
                    <PlusIcon className="size-4" />
                </Button>

            </div>
        </div>
    )
}

export default Parameters