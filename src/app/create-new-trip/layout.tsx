function CreateNewTripLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="h-screen relative w-full md:overflow-hidden">
            {children}
        </div>
    );
}

export default CreateNewTripLayout;