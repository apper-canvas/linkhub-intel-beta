import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Avatar = forwardRef(({ 
  className,
  src,
  alt,
  fallback,
  size = "default",
  ...props 
}, ref) => {
  const sizes = {
    sm: "h-8 w-8",
    default: "h-10 w-10", 
    lg: "h-16 w-16",
    xl: "h-24 w-24",
    "2xl": "h-32 w-32"
  };

  const textSizes = {
    sm: "text-xs",
    default: "text-sm",
    lg: "text-lg", 
    xl: "text-2xl",
    "2xl": "text-4xl"
  };

  return (
    <div
      ref={ref}
      className={cn(
        "relative inline-flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white font-medium overflow-hidden",
        sizes[size],
        className
      )}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt || "Avatar"}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className={cn("font-semibold", textSizes[size])}>
          {fallback || "?"}
        </span>
      )}
    </div>
  );
});

Avatar.displayName = "Avatar";

export default Avatar;