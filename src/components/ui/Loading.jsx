import ApperIcon from "@/components/ApperIcon";

const Loading = ({ type = "default" }) => {
  if (type === "dashboard") {
    return (
      <div className="p-6 space-y-6 animate-pulse">
        {/* Header skeleton */}
        <div className="space-y-2">
          <div className="h-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-64"></div>
          <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-48"></div>
        </div>
        
        {/* Stats cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-20"></div>
                  <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-16"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Action buttons skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-12 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "profile") {
    return (
      <div className="max-w-2xl mx-auto p-6 space-y-6 animate-pulse">
        {/* Profile photo skeleton */}
        <div className="flex justify-center">
          <div className="w-32 h-32 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full"></div>
        </div>
        
        {/* Form fields skeleton */}
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-20"></div>
              <div className="h-10 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "links") {
    return (
      <div className="p-6 space-y-4 animate-pulse">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="h-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-32"></div>
          <div className="h-10 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-24"></div>
        </div>
        
        {/* Links list skeleton */}
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg p-4 border space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-3/4"></div>
                <div className="h-3 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-1/2"></div>
              </div>
              <div className="flex space-x-2">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="w-8 h-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center space-y-4">
        <ApperIcon 
          name="Loader2" 
          className="h-12 w-12 text-primary mx-auto animate-spin" 
        />
        <p className="text-slate-600 font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;