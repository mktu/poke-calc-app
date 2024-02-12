import { FC } from "react";

const Footer: FC = () => (
    <footer className="border-t p-4">
        <h4 className="text-lg text-muted-foreground">ツールの説明</h4>
        <ul className='ml-5 list-disc text-muted-foreground'>
            <li>ポケモンのレベルは50想定です</li>
            <li>使用率上位については、2024/02/12の使用率TOP100のポケモンを使用しています</li>
        </ul>
    </footer>
)

export default Footer;