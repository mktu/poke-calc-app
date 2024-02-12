import { FC } from "react"

type Props = {
    diff: number,
    valid: boolean,
    isVs: boolean
}

const Result: FC<Props> = ({
    diff,
    valid,
    isVs
}) => {
    if (!valid || !isVs) {
        return (<div className="hidden h-[40px] w-full items-center justify-center rounded text-muted-foreground md:flex">
            ▷▷▷ ポケモンの素早さを比較します ◁◁◁
        </div>)
    }
    return (
        <div className='h-[40px] w-full rounded'>
            {diff > 0 ? (
                <div className="flex size-full items-center justify-center rounded bg-teal-100 font-semibold text-teal-500">
                    早い(↑{diff})
                </div>
            ) : diff === 0 ? (
                <div className="size-full">同速</div>
            ) : (
                <div className='flex size-full items-center justify-center rounded bg-red-100 font-semibold text-red-500'>
                    遅い(↓{diff * -1})
                </div>
            )}
        </div>
    )
}

export default Result