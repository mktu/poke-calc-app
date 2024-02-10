import Header from './_components/header'

type Props = {
    children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => (
    <>
        <Header />
        <main className="w-full">
            {children}
        </main>
    </>
)

export default Layout


