import { Link, useLocation } from "react-router-dom";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const NavLink = ({ 
  to, 
  children, 
  icon, 
  className,
  activeClassName = "bg-primary text-white", 
  inactiveClassName = "text-slate-600 hover:text-slate-900 hover:bg-slate-100",
  exact = false
}) => {
  const location = useLocation();
  const isActive = exact 
    ? location.pathname === to
    : location.pathname.startsWith(to);

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 font-medium",
        isActive ? activeClassName : inactiveClassName,
        className
      )}
    >
      {icon && <ApperIcon name={icon} className="h-5 w-5" />}
      <span>{children}</span>
    </Link>
  );
};

export default NavLink;