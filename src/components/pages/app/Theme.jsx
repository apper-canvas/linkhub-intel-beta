import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Avatar from "@/components/atoms/Avatar";
import Loading from "@/components/ui/Loading";
import ErrorView from "@/components/ui/ErrorView";
import { themeService } from "@/services/api/themeService";
import { linkService } from "@/services/api/linkService";

const Theme = () => {
  const { user } = useOutletContext();
  const [theme, setTheme] = useState({
    background: "#ffffff",
    buttonStyle: "rounded",
    textColor: "#1e293b",
    accentColor: "#6366f1"
  });
  const [previewLinks, setPreviewLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const buttonStyles = [
    { id: "rounded", name: "Rounded", class: "rounded-lg" },
    { id: "square", name: "Square", class: "rounded-none" },
    { id: "pill", name: "Pill", class: "rounded-full" }
  ];

  const presetColors = [
    { name: "Blue", value: "#6366f1" },
    { name: "Purple", value: "#8b5cf6" },
    { name: "Pink", value: "#ec4899" },
    { name: "Green", value: "#10b981" },
    { name: "Orange", value: "#f59e0b" },
    { name: "Red", value: "#ef4444" }
  ];

  const backgroundPresets = [
    { name: "White", value: "#ffffff" },
    { name: "Light Gray", value: "#f8fafc" },
    { name: "Dark", value: "#1e293b" },
    { name: "Gradient Blue", value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
    { name: "Gradient Pink", value: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
    { name: "Gradient Green", value: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" }
  ];

  useEffect(() => {
    if (user) {
      loadThemeData();
    }
  }, [user]);

  const loadThemeData = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError("");
      
      const [userTheme, userLinks] = await Promise.all([
        themeService.getUserTheme(user.id),
        linkService.getUserLinks(user.id)
      ]);
      
      if (userTheme) {
        setTheme(userTheme);
      }
      
      setPreviewLinks(userLinks.slice(0, 3)); // Show max 3 for preview
    } catch (err) {
      setError(err.message || "Failed to load theme data");
    } finally {
      setLoading(false);
    }
  };

  const handleThemeChange = (field, value) => {
    setTheme(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    if (!user) return;
    
    setSaving(true);
    try {
      await themeService.updateUserTheme(user.id, theme);
      toast.success("Theme saved successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to save theme");
    } finally {
      setSaving(false);
    }
  };

  const getPreviewStyle = () => {
    const isGradient = theme.background.includes("gradient");
    return {
      background: isGradient ? theme.background : theme.background,
      color: theme.textColor,
      minHeight: "500px"
    };
  };

  const getButtonStyle = () => {
    const selectedStyle = buttonStyles.find(s => s.id === theme.buttonStyle);
    return `${selectedStyle?.class || "rounded-lg"} transition-all duration-200 hover:scale-105`;
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorView error={error} onRetry={loadThemeData} />;
  }

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Customize Theme
          </h1>
          <p className="text-slate-600">
            Personalize your page colors and style to match your brand
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Background Color */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Background
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {backgroundPresets.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => handleThemeChange("background", preset.value)}
                      className={`aspect-square rounded-lg border-2 transition-all ${
                        theme.background === preset.value
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                      style={{ 
                        background: preset.value.includes("gradient") 
                          ? preset.value 
                          : preset.value 
                      }}
                      title={preset.name}
                    >
                      {theme.background === preset.value && (
                        <ApperIcon name="Check" className="h-4 w-4 text-white drop-shadow-sm" />
                      )}
                    </button>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Custom Color
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={theme.background.startsWith("#") ? theme.background : "#ffffff"}
                      onChange={(e) => handleThemeChange("background", e.target.value)}
                      className="w-10 h-10 rounded border border-slate-300"
                    />
                    <input
                      type="text"
                      value={theme.background}
                      onChange={(e) => handleThemeChange("background", e.target.value)}
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm"
                      placeholder="#ffffff or gradient..."
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Button Style */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Button Style
              </h3>
              
              <div className="grid grid-cols-3 gap-3">
                {buttonStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => handleThemeChange("buttonStyle", style.id)}
                    className={`p-3 border-2 transition-all ${
                      theme.buttonStyle === style.id
                        ? "border-primary bg-primary/5"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div
                      className={`w-full h-8 bg-slate-300 ${style.class}`}
                    />
                    <p className="text-xs font-medium mt-2">{style.name}</p>
                  </button>
                ))}
              </div>
            </Card>

            {/* Colors */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Colors
              </h3>
              
              <div className="space-y-4">
                {/* Text Color */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Text Color
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={theme.textColor}
                      onChange={(e) => handleThemeChange("textColor", e.target.value)}
                      className="w-10 h-10 rounded border border-slate-300"
                    />
                    <input
                      type="text"
                      value={theme.textColor}
                      onChange={(e) => handleThemeChange("textColor", e.target.value)}
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    />
                  </div>
                </div>

                {/* Accent Color */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Accent Color
                  </label>
                  <div className="grid grid-cols-6 gap-2 mb-3">
                    {presetColors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => handleThemeChange("accentColor", color.value)}
                        className={`w-8 h-8 rounded border-2 ${
                          theme.accentColor === color.value
                            ? "border-slate-400"
                            : "border-slate-200"
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      />
                    ))}
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={theme.accentColor}
                      onChange={(e) => handleThemeChange("accentColor", e.target.value)}
                      className="w-10 h-10 rounded border border-slate-300"
                    />
                    <input
                      type="text"
                      value={theme.accentColor}
                      onChange={(e) => handleThemeChange("accentColor", e.target.value)}
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => window.open(`/u/${user?.username}`, "_blank")}
                disabled={!user?.username}
              >
                <ApperIcon name="ExternalLink" className="h-4 w-4 mr-2" />
                View Live Page
              </Button>
              
              <Button
                variant="gradient"
                onClick={handleSave}
                loading={saving}
                loadingText="Saving..."
              >
                <ApperIcon name="Save" className="h-4 w-4 mr-2" />
                Save Theme
              </Button>
            </div>
          </motion.div>

          {/* Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="sticky top-6"
          >
            <Card className="overflow-hidden">
              <div className="p-4 border-b border-slate-200">
                <h3 className="font-semibold text-slate-900">Preview</h3>
                <p className="text-sm text-slate-500">Live preview of your page</p>
              </div>
              
              <div className="relative">
                <div
                  className="p-8 flex flex-col items-center space-y-6"
                  style={getPreviewStyle()}
                >
                  {/* Profile Section */}
                  <Avatar
                    src={user?.profilePhoto}
                    fallback={user?.name?.[0]?.toUpperCase() || "U"}
                    size="xl"
                  />
                  
                  <div className="text-center">
                    <h2 
                      className="text-xl font-bold mb-1"
                      style={{ color: theme.textColor }}
                    >
                      {user?.name || "Your Name"}
                    </h2>
                    <p 
                      className="opacity-75"
                      style={{ color: theme.textColor }}
                    >
                      @{user?.username || "username"}
                    </p>
                    {user?.bio && (
                      <p 
                        className="mt-2 text-sm opacity-75"
                        style={{ color: theme.textColor }}
                      >
                        {user.bio}
                      </p>
                    )}
                  </div>

                  {/* Links Preview */}
                  <div className="w-full max-w-sm space-y-3">
                    {previewLinks.length > 0 ? (
                      previewLinks.map((link) => (
                        <button
                          key={link.Id}
                          className={`w-full p-3 font-medium text-white ${getButtonStyle()}`}
                          style={{ backgroundColor: theme.accentColor }}
                        >
                          {link.title}
                        </button>
                      ))
                    ) : (
                      <>
                        <button
                          className={`w-full p-3 font-medium text-white ${getButtonStyle()}`}
                          style={{ backgroundColor: theme.accentColor }}
                        >
                          Sample Link 1
                        </button>
                        <button
                          className={`w-full p-3 font-medium text-white ${getButtonStyle()}`}
                          style={{ backgroundColor: theme.accentColor }}
                        >
                          Sample Link 2
                        </button>
                      </>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="text-center">
                    <p 
                      className="text-xs opacity-50"
                      style={{ color: theme.textColor }}
                    >
                      Powered by LinkHub
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Theme;