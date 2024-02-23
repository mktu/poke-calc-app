import { cn } from "@/lib/utils"
import { FC } from "react"
import { useInView } from 'react-intersection-observer'
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
        <div className='h-[40px] w-full md:rounded'>
            {diff > 0 ? (
                <div className="flex size-full items-center justify-center bg-teal-100 font-semibold text-teal-500 md:rounded">
                    早い(↑{diff})
                </div>
            ) : diff === 0 ? (
                <div className="flex size-full items-center justify-center bg-gray-50 font-semibold text-gray-500 md:rounded">同速</div>
            ) : (
                <div className='flex size-full items-center justify-center bg-red-100 font-semibold text-red-500 md:rounded'>
                    遅い(↓{diff * -1})
                </div>
            )}
        </div>
    )
}

export default Result