import Nav from '@/components/theme/Navbar/page'
import Header from '@/components/theme/Header/page'

const PrivateRootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="">
            <div className="">
                <Nav />
                <Header />
            </div>
            {children}
        </div>
    )
}

export default PrivateRootLayout
