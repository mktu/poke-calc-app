"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FC } from "react";

const Header: FC = () => {
    return (
        <header className='flex w-full items-center p-2 shadow'>
            <div className="ml-auto flex items-center gap-2">
                <Button variant={'link'} asChild className="text-muted-foreground">
                    <Link href='/ranking' >ランキング設定</Link>
                </Button>
            </div>
        </header>
    )
}

export default Header