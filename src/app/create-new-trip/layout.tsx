function CreateNewTripLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="h-screen md:fixed overflow-hidden">
            {children}
        </div>
    );
}

export default CreateNewTripLayout;