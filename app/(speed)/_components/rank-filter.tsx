import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { RankFilter } from "@/hooks/use-rank-filter"
import { SpeedType } from "@/logics/speed-rank"
import { MenuIcon, Minimize2Icon } from "lucide-react"
import { FC } from "react"

type Props = {
    rankFilter: RankFilter,
    onChangeFilter: (rankFilter: Partial<RankFilter>) => void,
    onCollapse: () => void
}

const RankFilter: FC<Props> = ({
    rankFilter,
    onChangeFilter,
    onCollapse
}) => {
    return (
        <div className='relative flex flex-col flex-wrap gap-2 bg-background p-4 shadow'>
            <div className="mb-2 flex items-center">
                <div className="font-semibold text-muted-foreground">ポケモンを絞り込む</div>
                <Button size={'icon'} variant='ghost' className="absolute right-0 top-0" onClick={onCollapse}>
                    <Minimize2Icon className="size-4 text-muted-foreground" />
                </Button>
            </div>
            <div className="flex items-center gap-1">
                <Label htmlFor="rankFilter" className="whitespace-nowrap text-muted-foreground">使用率上位⚪︎位まで表示</Label>
                <Input className="w-auto" id='rankFilter' type="number" min={0} max={100} value={rankFilter.rankFilter} onChange={(e) => {
                    onChangeFilter({
                        rankFilter: Number(e.target.value)
                    })
                }} />
            </div>
            <div className="flex items-center gap-1">
                <Label htmlFor="speedTypeFilter" className="whitespace-nowrap text-muted-foreground">種別</Label>
                <ToggleGroup className="justify-start" id='speedTypeFilter' value={rankFilter.speedTypeFilter} type="multiple" onValueChange={(values) => {
                    onChangeFilter({
                        speedTypeFilter: values as SpeedType[]
                    })
                }}>
                    <ToggleGroupItem value={'none'}>無振</ToggleGroupItem>
                    <ToggleGroupItem value={'second-speed'}>準速</ToggleGroupItem>
                    <ToggleGroupItem value={'fastest'}>最速</ToggleGroupItem>
                </ToggleGroup>
            </div>
            <div className='flex items-center gap-1'>
                <Label htmlFor="speedTypeFilter" className="whitespace-nowrap text-muted-foreground">実数値⚪︎以下は表示しない</Label>
                <Input className="w-auto" id='rankFilter' type="number" min={0} max={9999} value={rankFilter.speedFilter.min} onChange={(e) => {
                    onChangeFilter({
                        speedFilter: {
                            min: Number(e.target.value),
                            max: rankFilter.speedFilter.max
                        }
                    })
                }} />
            </div>
        </div>
    )
}

export default RankFilter