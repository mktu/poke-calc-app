"use client";
import { useSpeedSetting } from "@/hooks/use-speed-setting";
import { FC, ReactNode, createContext, useContext } from "react";

export type SpeedSettingContextType = ReturnType<typeof useSpeedSetting>

const context = createContext<SpeedSettingContextType>({
    onChangeMode: () => { },
    mode: 'vs'
})

export const useSpeedSettingContext = () => useContext(context)

export const SpeedSettingProvider: FC<{ children: ReactNode }> = ({
    children
}) => {
    const value = useSpeedSetting()
    return (
        <context.Provider value={value}>
            {children}
        </context.Provider>
    )
}