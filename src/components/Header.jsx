const Header = () => {
    return (
        <div className="w-full relative">
            <img
                className="w-full object-cover border-15 border-white"
                style={{ height: 'calc(100vh - 65px)' }}
                src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="headerimg"
            />
            <div className="absolute top-5/7 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center px-4">
                <p className="text-[#1D3438] text-3xl font-bold md:text-5xl md:font-extrabold">
                    Begin Your Blogging Journey
                </p>
                <p className="text-[#1D3438] mt-2 md:mt-4 text-lg md:text-xl">
                    Inspire, Connect, and Grow With Us.
                </p>
            </div>
        </div>
    );
};

export default Header;

