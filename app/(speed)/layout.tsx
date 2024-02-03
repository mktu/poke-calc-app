import Image from "next/image";

type Props = {
    children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => (
    <main className="w-full">
        {children}
    </main>
)

export default Layout


