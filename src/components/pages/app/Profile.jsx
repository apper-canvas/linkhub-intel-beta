import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import Card from "@/components/atoms/Card";
import Avatar from "@/components/atoms/Avatar";
import Loading from "@/components/ui/Loading";
import ErrorView from "@/components/ui/ErrorView";
import { userService } from "@/services/api/userService";

const Profile = () => {
  const { user, setUser } = useOutletContext();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    bio: "",
    profilePhoto: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        username: user.username || "",
        bio: user.bio || "",
        profilePhoto: user.profilePhoto || ""
      });
      setPhotoPreview(user.profilePhoto || "");
      setLoading(false);
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("File size must be less than 5MB");
        return;
      }
      
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }
      
      setPhotoFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = "Username can only contain letters, numbers, and underscores";
    }
    
    if (formData.bio.length > 160) {
      newErrors.bio = "Bio must be 160 characters or less";
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setSaving(true);
    try {
      // Simulate photo upload if there's a new photo
      let photoUrl = formData.profilePhoto;
      if (photoFile) {
        // In a real app, this would upload to a service like AWS S3
        photoUrl = photoPreview; // Use preview as the URL for demo
      }
      
      const updateData = {
        ...formData,
        profilePhoto: photoUrl
      };
      
      const updatedUser = await userService.updateProfile(user.id, updateData);
      setUser(updatedUser);
      setFormData({
        name: updatedUser.name,
        username: updatedUser.username,
        bio: updatedUser.bio || "",
        profilePhoto: updatedUser.profilePhoto || ""
      });
      
      toast.success("Profile updated successfully!");
    } catch (error) {
      if (error.message.includes("username")) {
        setErrors({ username: error.message });
      } else {
        toast.error(error.message || "Failed to update profile");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loading type="profile" />;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-2"
      >
        <h1 className="text-3xl font-bold text-slate-900">Edit Profile</h1>
        <p className="text-slate-600">
          Update your profile information and customize how others see you
        </p>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Photo */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-700">
                Profile Photo
              </label>
              
              <div className="flex items-center space-x-6">
                <Avatar
                  src={photoPreview}
                  fallback={formData.name?.[0]?.toUpperCase() || "U"}
                  size="2xl"
                />
                
                <div className="space-y-2">
                  <input
                    type="file"
                    id="photo-upload"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("photo-upload").click()}
                  >
                    <ApperIcon name="Upload" className="h-4 w-4 mr-2" />
                    Upload Photo
                  </Button>
                  <p className="text-xs text-slate-500">
                    JPG, PNG or GIF. Max size 5MB.
                  </p>
                </div>
              </div>
            </div>

            {/* Name */}
            <Input
              label="Full Name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              error={errors.name}
              placeholder="Enter your full name"
              required
            />

            {/* Username */}
            <Input
              label="Username"
              value={formData.username}
              onChange={(e) => handleInputChange("username", e.target.value.toLowerCase())}
              error={errors.username}
              placeholder="Choose a username"
              helperText={`Your URL: linkhub.com/u/${formData.username || "username"}`}
              required
            />

            {/* Bio */}
            <Textarea
              label="Bio"
              value={formData.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              error={errors.bio}
              placeholder="Tell people a bit about yourself..."
              rows={4}
              helperText={`${formData.bio.length}/160 characters`}
            />

            {/* Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-200">
              <div className="flex items-center space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => window.open(`/u/${user?.username}`, "_blank")}
                  disabled={!user?.username}
                >
                  <ApperIcon name="ExternalLink" className="h-4 w-4 mr-2" />
                  Preview Profile
                </Button>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setFormData({
                      name: user.name || "",
                      username: user.username || "",
                      bio: user.bio || "",
                      profilePhoto: user.profilePhoto || ""
                    });
                    setPhotoPreview(user.profilePhoto || "");
                    setPhotoFile(null);
                    setErrors({});
                  }}
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  variant="gradient"
                  loading={saving}
                  loadingText="Saving..."
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </motion.div>

      {/* Profile Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Profile Preview</h3>
          <div className="text-center space-y-4 max-w-sm mx-auto">
            <Avatar
              src={photoPreview}
              fallback={formData.name?.[0]?.toUpperCase() || "U"}
              size="xl"
            />
            
            <div>
              <h4 className="font-semibold text-slate-900">
                {formData.name || "Your Name"}
              </h4>
              <p className="text-slate-600">
                @{formData.username || "username"}
              </p>
              {formData.bio && (
                <p className="text-sm text-slate-500 mt-2">
                  {formData.bio}
                </p>
              )}
            </div>
            
            <div className="text-xs text-slate-500 bg-slate-50 rounded-lg p-3">
              This is how your profile will appear to visitors
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Profile;