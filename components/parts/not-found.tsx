import { FC } from "react";
import { M_PLUS_1 } from "next/font/google";
import Note from "../icons/note";

const font = M_PLUS_1({
    subsets: ["latin"],
    weight: ["400", "600"]
});

const NotFound: FC = () => (
    <div className='flex h-[256px] w-full flex-col items-center justify-center gap-4'>
        <Note className="size-10 fill-muted-foreground stroke-muted-foreground" />
        <div className={`${font.className} text-lg text-muted-foreground`}>ポケモンが見つかりません</div>
    </div>
)

export default NotFound