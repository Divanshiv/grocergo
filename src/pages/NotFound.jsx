import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const NotFound = () => (
  <div className="max-w-7xl mx-auto px-4 py-20 text-center">
    <div className="max-w-md mx-auto">
      <div className="text-8xl mb-6">🥕</div>
      <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
        404 — Page Not Found
      </h1>
      <p className="text-gray-500 mb-8">
        Oops! This page seems to have rolled off the shelf. Let's get you back
        to fresh groceries.
      </p>
      <Link to="/" className="btn-primary inline-flex items-center gap-2">
        <Home className="w-5 h-5" />
        Back to Home
      </Link>
    </div>
  </div>
);

export default NotFound;
