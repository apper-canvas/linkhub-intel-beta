import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";

const StatCard = ({ 
  title, 
  value, 
  icon, 
  iconColor = "text-primary",
  trend,
  trendValue,
  className 
}) => {
  return (
    <Card className={cn("p-6", className)}>
      <div className="flex items-center space-x-4">
        <div className={cn("p-3 rounded-full bg-slate-100", iconColor)}>
          <ApperIcon name={icon} className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
          {trend && (
            <div className="flex items-center space-x-1 mt-1">
              <ApperIcon 
                name={trend === "up" ? "TrendingUp" : "TrendingDown"} 
                className={cn(
                  "h-3 w-3",
                  trend === "up" ? "text-green-500" : "text-red-500"
                )} 
              />
              <span className={cn(
                "text-xs font-medium",
                trend === "up" ? "text-green-600" : "text-red-600"
              )}>
                {trendValue}
              </span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default StatCard;