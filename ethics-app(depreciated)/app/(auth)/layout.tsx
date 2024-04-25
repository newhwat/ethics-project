const AuthLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="h-full flex items-center md:h-screen md:items-center mb-6 justify-center">
            {children}
        </div>
    );
}

export default AuthLayout;