const HomePage = () => {
    return (
      <div className="home-page">
        {/* Banner */}
        <div 
          className="relative h-80 bg-cover bg-center text-white flex items-center justify-center shadow-md rounded-lg"
          style={{
            backgroundImage: "url('http://localhost:8080/uploads/banner.jpg')", // Đường dẫn ảnh
          }}
        >
          <h1 className="text-4xl font-bold bg-opacity-50 px-4 py-2 rounded-md">
            Welcome to Camera Management Website
          </h1>
        </div>
  
        {/* Introduction Section */}
        <div className="mt-8 px-6 md:px-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Your all-in-one solution for managing cameras efficiently!
          </h2>
          <p className="text-gray-700 text-lg">
            Easily monitor, configure, and maintain your camera systems with our intuitive interface. 
            Whether you're managing a single device or a complex network, our platform is here to 
            simplify your workflow.
          </p>
        </div>
      </div>
    );
  };
  
  export default HomePage;
  