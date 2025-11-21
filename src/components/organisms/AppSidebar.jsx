import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Avatar from "@/components/atoms/Avatar";
import NavLink from "@/components/molecules/NavLink";
import { authService } from "@/services/api/authService";

const AppSidebar = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/app", icon: "LayoutDashboard", exact: true },
    { name: "Profile", href: "/app/profile", icon: "User" },
    { name: "Links", href: "/app/links", icon: "Link2" },
    { name: "Theme", href: "/app/theme", icon: "Palette" }
  ];

  const handleLogout = async () => {
    try {
      await authService.logout();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  const handleViewProfile = () => {
    if (user?.username) {
      window.open(`/u/${user.username}`, "_blank");
    }
  };

  return (
    <div className="w-64 bg-white border-r border-slate-200 h-full flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
            <ApperIcon name="Link" className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold gradient-text">LinkHub</span>
        </div>
      </div>

      {/* User Info */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <Avatar 
            src={user?.profilePhoto} 
            fallback={user?.name?.[0]?.toUpperCase() || "U"}
            size="lg"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 truncate">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-slate-500 truncate">
              @{user?.username || "username"}
            </p>
          </div>
        </div>
        
        <button
          onClick={handleViewProfile}
          className="mt-3 w-full flex items-center justify-center space-x-2 px-3 py-2 text-sm text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-200"
        >
          <ApperIcon name="ExternalLink" className="h-4 w-4" />
          <span>View Profile</span>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            icon={item.icon}
            exact={item.exact}
            className="w-full"
          >
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 font-medium"
        >
          <ApperIcon name="LogOut" className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AppSidebar;