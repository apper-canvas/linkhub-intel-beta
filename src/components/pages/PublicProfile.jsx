import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Avatar from "@/components/atoms/Avatar";
import Loading from "@/components/ui/Loading";
import ErrorView from "@/components/ui/ErrorView";
import { userService } from "@/services/api/userService";
import { linkService } from "@/services/api/linkService";
import { themeService } from "@/services/api/themeService";
import { analyticsService } from "@/services/api/analyticsService";

const PublicProfile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [links, setLinks] = useState([]);
  const [theme, setTheme] = useState({
    background: "#ffffff",
    buttonStyle: "rounded",
    textColor: "#1e293b",
    accentColor: "#6366f1"
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (username) {
      loadProfile();
      // Track page view
      trackPageView();
    }
  }, [username]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError("");
      
      const userData = await userService.getUserByUsername(username);
      if (!userData) {
        setError("Profile not found");
        return;
      }
      
      const [userLinks, userTheme] = await Promise.all([
        linkService.getUserLinks(userData.id),
        themeService.getUserTheme(userData.id)
      ]);
      
      setUser(userData);
      setLinks(userLinks.filter(link => link.visible));
      if (userTheme) {
        setTheme(userTheme);
      }
    } catch (err) {
      setError(err.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const trackPageView = async () => {
    try {
      await analyticsService.trackPageView(username);
    } catch (error) {
      console.error("Failed to track page view:", error);
    }
  };

  const handleLinkClick = async (link) => {
    try {
      await linkService.incrementClicks(link.Id);
      window.open(link.url, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("Failed to track click:", error);
      // Still open the link even if tracking fails
      window.open(link.url, "_blank", "noopener,noreferrer");
    }
  };

  const getPageStyle = () => {
    const isGradient = theme.background.includes("gradient");
    return {
      background: isGradient ? theme.background : theme.background,
      color: theme.textColor,
      minHeight: "100vh"
    };
  };

  const getButtonStyle = () => {
    const buttonStyles = {
      rounded: "rounded-lg",
      square: "rounded-none", 
      pill: "rounded-full"
    };
    return `${buttonStyles[theme.buttonStyle] || "rounded-lg"} transition-all duration-200 hover:scale-105 hover:shadow-lg`;
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto">
            <ApperIcon name="AlertCircle" className="h-8 w-8 text-red-600" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-slate-900">Profile Not Found</h1>
            <p className="text-slate-600">
              {error === "Profile not found" 
                ? `The username "@${username}" doesn't exist.`
                : error
              }
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => window.location.href = "/"}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <ApperIcon name="Home" className="h-4 w-4" />
              <span>Go to LinkHub</span>
            </button>
            
            <p className="text-sm text-slate-500">
              Want to create your own page?{" "}
              <a href="/signup" className="text-primary hover:text-primary/80 font-medium">
                Sign up for free
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={getPageStyle()}>
      <div className="max-w-md mx-auto p-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8 text-center"
        >
          {/* Profile Header */}
          <div className="space-y-4">
            <Avatar
              src={user?.profilePhoto}
              fallback={user?.name?.[0]?.toUpperCase() || "U"}
              size="2xl"
              className="mx-auto"
            />
            
            <div>
              <h1 
                className="text-2xl font-bold mb-1"
                style={{ color: theme.textColor }}
              >
                {user?.name}
              </h1>
              <p 
                className="opacity-75 mb-3"
                style={{ color: theme.textColor }}
              >
                @{user?.username}
              </p>
              {user?.bio && (
                <p 
                  className="text-sm opacity-75 leading-relaxed"
                  style={{ color: theme.textColor }}
                >
                  {user.bio}
                </p>
              )}
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            {links.length > 0 ? (
              links
                .sort((a, b) => a.order - b.order)
                .map((link, index) => (
                  <motion.button
                    key={link.Id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                    onClick={() => handleLinkClick(link)}
                    className={`w-full p-4 font-medium text-white ${getButtonStyle()}`}
                    style={{ backgroundColor: theme.accentColor }}
                  >
                    <div className="flex items-center justify-between">
                      <span>{link.title}</span>
                      <ApperIcon name="ExternalLink" className="h-4 w-4" />
                    </div>
                  </motion.button>
                ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center py-12"
              >
                <ApperIcon 
                  name="Link2" 
                  className="h-8 w-8 mx-auto mb-3 opacity-50" 
                  style={{ color: theme.textColor }}
                />
                <p 
                  className="opacity-75"
                  style={{ color: theme.textColor }}
                >
                  No links available yet
                </p>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-8"
          >
            <a
              href="/"
              className="inline-flex items-center space-x-2 text-sm opacity-50 hover:opacity-75 transition-opacity"
              style={{ color: theme.textColor }}
            >
              <div className="w-4 h-4 bg-current rounded flex items-center justify-center">
                <ApperIcon name="Link" className="h-2 w-2 text-white" />
              </div>
              <span>Create your own with LinkHub</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PublicProfile;