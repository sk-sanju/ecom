import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-light px-4">
      <AlertCircle className="w-16 h-16 text-accent mb-6" />
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        We couldn't find the page you were looking for. It might have been moved or doesn't exist.
      </p>
      <Link 
        to="/" 
        className="px-8 py-3 bg-secondary hover:bg-yellow-400 border border-yellow-500 text-gray-900 font-bold rounded-lg shadow-sm transition-colors"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default NotFound;
