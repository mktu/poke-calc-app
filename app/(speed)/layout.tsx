import { SpeedSettingProvider } from "@/components/providers/speed-setting-provider";
import Header from './_components/header'

type Props = {
    children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => (
    <SpeedSettingProvider>
        <Header />
        <main className="w-full">
            {children}
        </main>
    </SpeedSettingProvider>
)

export default Layout


