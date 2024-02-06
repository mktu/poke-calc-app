"use client"
import { useSpeedSettingContext } from "@/components/providers/speed-setting-provider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { SpeedCalcModeLabel } from "@/logics/speed-setting";
import { FC } from "react";

const Header: FC = () => {
    const { mode, onChangeMode } = useSpeedSettingContext()

    return (
        <header className='flex w-full items-center p-2'>
            <div className="ml-auto flex items-center gap-1">
                <Switch id='speed-calc-mode' checked={mode === 'ranking'} value='aa' onCheckedChange={(checked) => {
                    onChangeMode(checked ? 'ranking' : 'vs')
                }} />
                <Label htmlFor="speed-calc-mode" className="text-muted-foreground">{SpeedCalcModeLabel['ranking']}</Label>
            </div>
        </header>
    )
}

export default Header