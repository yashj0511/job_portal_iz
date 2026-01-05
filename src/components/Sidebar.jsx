import { Link } from "react-router-dom";
import { Home, Briefcase, User } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col h-screen">
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-2xl font-bold text-purple-400">
          Recruiter App
        </h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-4">
        <Link
          to="/"
          className="flex items-center gap-3 text-gray-300 hover:text-white"
        >
          <Home size={18} />
          Dashboard
        </Link>

        <Link
          to="/jobs"
          className="flex items-center gap-3 text-gray-300 hover:text-white"
        >
          <Briefcase size={18} />
          Job Listings
        </Link>

        <Link
          to="/profile"
          className="flex items-center gap-3 text-gray-300 hover:text-white"
        >
          <User size={18} />
          Profile
        </Link>
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-gray-700 text-sm text-gray-400">
        © 2025 Recruiter App
      </div>
    </aside>
  );
};

export default Sidebar;
