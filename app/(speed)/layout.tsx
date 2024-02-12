import Footer from './_components/footer';
import Header from './_components/header'

type Props = {
    children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => (
    <div className='flex h-screen w-full flex-col'>
        <Header />
        <main className="flex-1 md:size-full md:overflow-hidden">
            {children}
        </main>
        <Footer />
    </div>
)

export default Layout


