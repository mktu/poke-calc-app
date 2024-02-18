import { FC } from "react";

const Footer: FC = () => (
    <footer className="border-t">
        <div className='p-4'>
            <h4 className="text-lg text-muted-foreground">ツールの説明</h4>
            <ul className='ml-5 list-disc text-muted-foreground'>
                <li>ポケモンのレベルは50想定です</li>
                <li>使用率上位については、2024/02/12の使用率TOP100のポケモンを使用しています</li>
            </ul>
        </div>
        <hr />
        <div className='flex items-center justify-center p-4 text-muted-foreground'>
            <span className='mr-1'>©︎</span>
            <a href={'https://twitter.com/mktu13'} target='_blank' rel='noopener noreferrer'>mktu 2024</a>
        </div>
    </footer>
)

export default Footer;