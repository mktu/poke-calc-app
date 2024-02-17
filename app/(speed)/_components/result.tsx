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
    const { ref, inView } = useInView({ initialInView: true })
    if (!valid || !isVs) {
        return (<div className="hidden h-[40px] w-full items-center justify-center rounded text-muted-foreground md:flex">
            ▷▷▷ ポケモンの素早さを比較します ◁◁◁
        </div>)
    }
    return (
        <>
            <div ref={ref} />
            <div className={cn(`h-[40px] w-full rounded`, inView ? 'relative' : 'fixed top-0 left-0 shadow')}>
                {diff > 0 ? (
                    <div className="flex size-full items-center justify-center rounded bg-teal-100 font-semibold text-teal-500">
                        早い(↑{diff})
                    </div>
                ) : diff === 0 ? (
                    <div className="flex size-full items-center justify-center rounded bg-gray-50 font-semibold text-gray-500">同速</div>
                ) : (
                    <div className='flex size-full items-center justify-center rounded bg-red-100 font-semibold text-red-500'>
                        遅い(↓{diff * -1})
                    </div>
                )}
            </div>
        </>
    )
}

export default Result