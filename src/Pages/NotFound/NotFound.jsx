const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-lg mb-4">
        Oops! The page you are looking for does not exist.
      </p>
      <a href="/" className="text-blue-500 hover:underline">
        Go to Home
      </a>
    </div>
  );
};

export default NotFound;
