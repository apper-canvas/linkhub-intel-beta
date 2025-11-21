import { useState } from "react";
import ApperIcon from "@/components/ApperIcon";

const ErrorView = ({ error = "Something went wrong", onRetry, showRetry = true }) => {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    if (!onRetry) return;
    setIsRetrying(true);
    try {
      await onRetry();
    } finally {
      setIsRetrying(false);
    }
  };

  return (
    <div className="min-h-[400px] flex items-center justify-center p-6">
      <div className="text-center space-y-6 max-w-md">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center">
          <ApperIcon name="AlertCircle" className="h-8 w-8 text-red-600" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-slate-900">Oops! Something went wrong</h3>
          <p className="text-slate-600">{error}</p>
        </div>

        {showRetry && onRetry && (
          <button
            onClick={handleRetry}
            disabled={isRetrying}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRetrying ? (
              <>
                <ApperIcon name="Loader2" className="h-4 w-4 animate-spin" />
                <span>Retrying...</span>
              </>
            ) : (
              <>
                <ApperIcon name="RefreshCw" className="h-4 w-4" />
                <span>Try Again</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorView;