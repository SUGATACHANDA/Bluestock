import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft, LifeBuoy, HelpCircle, Map } from "lucide-react";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4 py-8">
      <div className="max-w-xl w-full text-center space-y-8">
        {/* 404 */}
        <div>
          <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            404
          </h1>
          <p className="mt-4 text-2xl font-semibold text-gray-800">
            Page Not Found
          </p>
          <p className="mt-2 text-gray-500">
            The page you’re looking for doesn’t exist or has been moved.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-indigo-600 text-white font-medium shadow-md hover:bg-indigo-700 transition"
          >
            <Home className="w-5 h-5" />
            Home
          </button>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>

        {/* Help Links */}
        <div className="border-t pt-6 mt-8 space-y-2">
          <p className="text-sm text-gray-500">Need assistance? Try these:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-indigo-600 font-medium">
            <a href="/contact" className="inline-flex items-center gap-1 hover:underline">
              <LifeBuoy className="w-4 h-4" />
              Contact Support
            </a>
            <a href="/help" className="inline-flex items-center gap-1 hover:underline">
              <HelpCircle className="w-4 h-4" />
              Help Center
            </a>
            <a href="/sitemap" className="inline-flex items-center gap-1 hover:underline">
              <Map className="w-4 h-4" />
              Site Map
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
