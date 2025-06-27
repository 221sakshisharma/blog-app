const AuthLayout = ({ title, description, children, reverse=false, imageUrl = ""}) => {
  return (
    <div className="bg-cover" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1602409202595-e665845ca58c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')` }}>
    <div className="bg-white/50 backdrop-blur-md min-h-screen flex items-center justify-center">
      <div className={`w-full flex ${reverse && "flex-row-reverse"} max-w-4xl bg-white shadow-none rounded-none overflow-hidden my-4 md:rounded-lg md:shadow-lg`}>
        {/* Left Side: Form Content */}
        <div className="w-full md:w-1/2 p-8 space-y-6 bg-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            <p className="text-gray-600 mt-2">{description}</p>
          </div>
          {children}
        </div>

        {/* Right Side: Image */}
        <div
          className="hidden md:block md:w-1/2 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1602409202595-e665845ca58c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')` }}
        >
          {/* Background image is set here */}
        </div>
      </div>
    </div>
    </div>
  );
};

export default AuthLayout;