import { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import StatCard from "@/components/molecules/StatCard";
import Card from "@/components/atoms/Card";
import Loading from "@/components/ui/Loading";
import ErrorView from "@/components/ui/ErrorView";
import { analyticsService } from "@/services/api/analyticsService";
import { linkService } from "@/services/api/linkService";

const Dashboard = () => {
  const { user } = useOutletContext();
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState(null);
  const [recentLinks, setRecentLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [analyticsData, linksData] = await Promise.all([
        analyticsService.getUserAnalytics(user.id),
        linkService.getUserLinks(user.id)
      ]);
      
      setAnalytics(analyticsData);
      setRecentLinks(linksData.slice(0, 3)); // Show only recent 3 links
    } catch (err) {
      setError(err.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading type="dashboard" />;
  }

  if (error) {
    return <ErrorView error={error} onRetry={loadDashboardData} />;
  }

  const quickActions = [
    {
      title: "Edit Profile",
      description: "Update your name, bio, and photo",
      icon: "User",
      onClick: () => navigate("/app/profile"),
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Manage Links",
      description: "Add, edit, or reorder your links",
      icon: "Link2",
      onClick: () => navigate("/app/links"),
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Customize Theme",
      description: "Change colors and button styles",
      icon: "Palette",
      onClick: () => navigate("/app/theme"),
      color: "from-pink-500 to-pink-600"
    }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-2"
      >
        <h1 className="text-3xl font-bold text-slate-900">
          Welcome back, {user?.name?.split(" ")[0] || "User"}! 👋
        </h1>
        <p className="text-slate-600">
          Here's how your LinkHub page is performing
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <StatCard
          title="Total Views"
          value={analytics?.totalViews?.toLocaleString() || "0"}
          icon="Eye"
          iconColor="text-blue-600"
          trend="up"
          trendValue="+12%"
        />
        <StatCard
          title="Total Clicks"
          value={analytics?.totalClicks?.toLocaleString() || "0"}
          icon="MousePointer"
          iconColor="text-green-600"
          trend="up"
          trendValue="+8%"
        />
        <StatCard
          title="Active Links"
          value={recentLinks.length.toString()}
          icon="Link2"
          iconColor="text-purple-600"
        />
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-6"
      >
        <h2 className="text-xl font-semibold text-slate-900">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              <Card className="p-6 card-hover cursor-pointer" onClick={action.onClick}>
                <div className="space-y-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center`}>
                    <ApperIcon name={action.icon} className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{action.title}</h3>
                    <p className="text-sm text-slate-600">{action.description}</p>
                  </div>
                  <div className="flex items-center text-primary text-sm font-medium">
                    <span>Get started</span>
                    <ApperIcon name="ArrowRight" className="h-4 w-4 ml-1" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Links & Profile Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Links */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-900">Recent Links</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/app/links")}
              >
                View all
                <ApperIcon name="ArrowRight" className="h-4 w-4 ml-1" />
              </Button>
            </div>
            
            {recentLinks.length > 0 ? (
              <div className="space-y-3">
                {recentLinks.map((link) => (
                  <div key={link.Id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-slate-900 truncate">{link.title}</h4>
                      <p className="text-sm text-slate-500 truncate">{link.url}</p>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-slate-500">
                      <ApperIcon name="MousePointer" className="h-3 w-3" />
                      <span>{link.clicks || 0}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <ApperIcon name="Link2" className="h-8 w-8 text-slate-400 mx-auto mb-3" />
                <p className="text-slate-600 mb-4">No links yet</p>
                <Button
                  size="sm"
                  onClick={() => navigate("/app/links")}
                >
                  Add your first link
                </Button>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Profile Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-900">Your Profile</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open(`/u/${user?.username}`, "_blank")}
              >
                <ApperIcon name="ExternalLink" className="h-4 w-4 mr-1" />
                View live
              </Button>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto">
                {user?.profilePhoto ? (
                  <img
                    src={user.profilePhoto}
                    alt={user.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-white font-bold text-2xl">
                    {user?.name?.[0]?.toUpperCase() || "U"}
                  </span>
                )}
              </div>
              
              <div>
                <h4 className="font-semibold text-slate-900">{user?.name || "Your Name"}</h4>
                <p className="text-slate-600">@{user?.username || "username"}</p>
                {user?.bio && (
                  <p className="text-sm text-slate-500 mt-1">{user.bio}</p>
                )}
              </div>
              
              <div className="text-xs text-slate-500 bg-slate-50 rounded-lg p-2">
                <strong>Your URL:</strong> linkhub.com/u/{user?.username || "username"}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => navigate("/app/profile")}
              >
                <ApperIcon name="Edit3" className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;