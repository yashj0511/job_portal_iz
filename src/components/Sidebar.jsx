import { NavLink } from "react-router-dom";
import { Home, Briefcase, User, ChevronLeft } from "lucide-react";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-md transition
     ${
       isActive
         ? "bg-purple-700 text-white"
         : "text-gray-300 hover:text-white hover:bg-gray-800"
     }`;

  return (
    <aside
      className={`${
        collapsed ? "w-16" : "w-64"
      } flex-shrink-0 bg-gray-900 text-white flex flex-col h-full transition-all duration-300`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        {!collapsed && (
          <h2 className="text-xl font-bold text-purple-400">
            Recruiter App
          </h2>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-400 hover:text-white transition"
        >
          <ChevronLeft
            size={20}
            className={`${
              collapsed ? "rotate-180" : ""
            } transition-transform duration-300`}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <NavLink to="/" className={linkClasses}>
          <Home size={18} />
          {!collapsed && <span>Dashboard</span>}
        </NavLink>

        <NavLink to="/jobs" className={linkClasses}>
          <Briefcase size={18} />
          {!collapsed && <span>Job Posts</span>}
        </NavLink>

        <NavLink to="/profile" className={linkClasses}>
          <User size={18} />
          {!collapsed && <span>Profile</span>}
        </NavLink>

            <NavLink to="/myrefferals" className={linkClasses}>
          <User size={18} />
          {!collapsed && <span>My refferals</span>}
        </NavLink>
      </nav>

      

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-700 text-sm text-gray-400">
          © 2025 Recruiter App
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
