import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import { authService } from "@/services/api/authService";

const AppMobileNav = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/app", icon: "LayoutDashboard" },
    { name: "Profile", href: "/app/profile", icon: "User" },
    { name: "Links", href: "/app/links", icon: "Link2" },
    { name: "Theme", href: "/app/theme", icon: "Palette" }
  ];

  const isActive = (href) => {
    if (href === "/app") {
      return location.pathname === "/app";
    }
    return location.pathname.startsWith(href);
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  return (
    <div className="bg-white border-t border-slate-200 safe-area-inset-bottom">
      <div className="flex justify-around items-center py-2">
        {navigation.map((item) => (
          <button
            key={item.name}
            onClick={() => navigate(item.href)}
            className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-200 ${
              isActive(item.href)
                ? "text-primary bg-primary/10"
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
            }`}
          >
            <ApperIcon name={item.icon} className="h-5 w-5" />
            <span className="text-xs font-medium">{item.name}</span>
          </button>
        ))}
        
        <button
          onClick={handleLogout}
          className="flex flex-col items-center space-y-1 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200"
        >
          <ApperIcon name="LogOut" className="h-5 w-5" />
          <span className="text-xs font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AppMobileNav;