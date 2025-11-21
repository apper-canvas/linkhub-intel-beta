import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Button = forwardRef(({ 
  className, 
  variant = "default", 
  size = "default", 
  children,
  loading = false,
  loadingText = "Loading...",
  icon,
  iconPosition = "left",
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    default: "bg-primary hover:bg-primary/90 text-white focus:ring-primary/50 btn-hover",
    secondary: "bg-secondary hover:bg-secondary/90 text-white focus:ring-secondary/50 btn-hover",
    accent: "bg-accent hover:bg-accent/90 text-white focus:ring-accent/50 btn-hover",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary/50 btn-hover",
    ghost: "text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:ring-slate-500/50",
    gradient: "bg-gradient-to-r from-primary via-secondary to-accent text-white hover:shadow-lg hover:scale-105",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500/50 btn-hover",
    success: "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500/50 btn-hover"
  };

  const sizes = {
    sm: "h-8 px-3 text-sm",
    default: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
    xl: "h-14 px-8 text-lg"
  };

  const IconComponent = icon ? ApperIcon : null;

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <>
          <ApperIcon name="Loader2" className="h-4 w-4 animate-spin mr-2" />
          {loadingText}
        </>
      ) : (
        <>
          {IconComponent && iconPosition === "left" && (
            <IconComponent name={icon} className="h-4 w-4 mr-2" />
          )}
          {children}
          {IconComponent && iconPosition === "right" && (
            <IconComponent name={icon} className="h-4 w-4 ml-2" />
          )}
        </>
      )}
    </button>
  );
});

Button.displayName = "Button";

export default Button;