import Nav from '@/components/theme/Navbar/page'

const PrivateRootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="">
            <div className="">
                <Nav />
            </div>
            {children}
        </div>
    )
}

export default PrivateRootLayout
