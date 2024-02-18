"use client"
import Speed from "@/components/icons/speed";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FC } from "react";
import { M_PLUS_1 } from "next/font/google";

const font = M_PLUS_1({
    subsets: ["latin"],
    weight: ["400", "600"]
});

const Header: FC = () => {
    return (
        <header className='flex w-full items-center p-2 shadow'>
            <div className="flex items-center gap-2">
                <Speed className="size-8" />
                <p className={font.className}>ポケモン素早さ比較</p>
            </div>
            {process.env["NEXT_PUBLIC_SHOW_RANKING"] && (
                <div className="ml-auto flex items-center gap-2">
                    <Button variant={'link'} asChild className="text-muted-foreground">
                        <Link href='/ranking' >ランキング設定</Link>
                    </Button>
                </div>
            )}
        </header>
    )
}

export default Header