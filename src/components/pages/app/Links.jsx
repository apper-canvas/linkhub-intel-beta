import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Card from "@/components/atoms/Card";
import Modal from "@/components/molecules/Modal";
import Loading from "@/components/ui/Loading";
import ErrorView from "@/components/ui/ErrorView";
import Empty from "@/components/ui/Empty";
import { linkService } from "@/services/api/linkService";

const Links = () => {
  const { user } = useOutletContext();
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingLink, setEditingLink] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: "", url: "" });
  const [formErrors, setFormErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      loadLinks();
    }
  }, [user]);

  const loadLinks = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError("");
      const userLinks = await linkService.getUserLinks(user.id);
      setLinks(userLinks);
    } catch (err) {
      setError(err.message || "Failed to load links");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (link = null) => {
    setEditingLink(link);
    setFormData(link ? { title: link.title, url: link.url } : { title: "", url: "" });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingLink(null);
    setFormData({ title: "", url: "" });
    setFormErrors({});
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.title.trim()) {
      errors.title = "Title is required";
    }
    
    if (!formData.url.trim()) {
      errors.url = "URL is required";
    } else if (!/^https?:\/\/.+/.test(formData.url)) {
      errors.url = "URL must start with http:// or https://";
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setSaving(true);
    try {
      if (editingLink) {
        const updated = await linkService.updateLink(editingLink.Id, formData);
        setLinks(prev => prev.map(link => 
          link.Id === editingLink.Id ? updated : link
        ));
        toast.success("Link updated successfully!");
      } else {
        const created = await linkService.createLink({
          ...formData,
          userId: user.id,
          order: links.length,
          visible: true,
          clicks: 0
        });
        setLinks(prev => [...prev, created]);
        toast.success("Link added successfully!");
      }
      closeModal();
    } catch (error) {
      toast.error(error.message || "Failed to save link");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (linkId) => {
    if (!window.confirm("Are you sure you want to delete this link?")) {
      return;
    }
    
    try {
      await linkService.deleteLink(linkId);
      setLinks(prev => prev.filter(link => link.Id !== linkId));
      toast.success("Link deleted successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to delete link");
    }
  };

  const handleToggleVisibility = async (linkId, visible) => {
    try {
      const updated = await linkService.updateLink(linkId, { visible: !visible });
      setLinks(prev => prev.map(link => 
        link.Id === linkId ? updated : link
      ));
      toast.success(`Link ${!visible ? "shown" : "hidden"}!`);
    } catch (error) {
      toast.error(error.message || "Failed to update link visibility");
    }
  };

  const handleReorder = (dragIndex, hoverIndex) => {
    const reorderedLinks = [...links];
    const draggedLink = reorderedLinks[dragIndex];
    reorderedLinks.splice(dragIndex, 1);
    reorderedLinks.splice(hoverIndex, 0, draggedLink);
    
    // Update order numbers
    const updatedLinks = reorderedLinks.map((link, index) => ({
      ...link,
      order: index
    }));
    
    setLinks(updatedLinks);
    
    // Save new order to backend
    updatedLinks.forEach(async (link, index) => {
      try {
        await linkService.updateLink(link.Id, { order: index });
      } catch (error) {
        console.error("Failed to update link order:", error);
      }
    });
  };

  if (loading) {
    return <Loading type="links" />;
  }

  if (error) {
    return <ErrorView error={error} onRetry={loadLinks} />;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Manage Links</h1>
          <p className="text-slate-600">Add, edit, and organize your links</p>
        </div>
        <Button onClick={() => openModal()}>
          <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
          Add Link
        </Button>
      </motion.div>

      {/* Links List */}
      {links.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-4"
        >
          <AnimatePresence>
            {links
              .sort((a, b) => a.order - b.order)
              .map((link, index) => (
                <motion.div
                  key={link.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="p-4">
                    <div className="flex items-center space-x-4">
                      {/* Drag Handle */}
                      <button
                        className="text-slate-400 hover:text-slate-600 cursor-grab active:cursor-grabbing"
                        onMouseDown={(e) => {
                          // Simple reordering logic for demo
                          e.preventDefault();
                        }}
                      >
                        <ApperIcon name="GripVertical" className="h-5 w-5" />
                      </button>

                      {/* Link Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium text-slate-900 truncate">
                            {link.title}
                          </h3>
                          {!link.visible && (
                            <span className="px-2 py-1 text-xs bg-slate-100 text-slate-600 rounded">
                              Hidden
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-500 truncate">{link.url}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center space-x-1 text-xs text-slate-500">
                            <ApperIcon name="MousePointer" className="h-3 w-3" />
                            <span>{link.clicks || 0} clicks</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleVisibility(link.Id, link.visible)}
                          title={link.visible ? "Hide link" : "Show link"}
                        >
                          <ApperIcon 
                            name={link.visible ? "Eye" : "EyeOff"} 
                            className="h-4 w-4" 
                          />
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openModal(link)}
                          title="Edit link"
                        >
                          <ApperIcon name="Edit3" className="h-4 w-4" />
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(link.Id)}
                          title="Delete link"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <ApperIcon name="Trash2" className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <Empty
          title="No links yet"
          description="Create your first link to get started with your LinkHub page"
          icon="Link2"
          action={() => openModal()}
          actionText="Add Your First Link"
        />
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingLink ? "Edit Link" : "Add New Link"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Link Title"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            error={formErrors.title}
            placeholder="e.g., My Website, Instagram, etc."
            required
          />

          <Input
            label="URL"
            value={formData.url}
            onChange={(e) => handleInputChange("url", e.target.value)}
            error={formErrors.url}
            placeholder="https://example.com"
            required
          />

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
            <Button
              type="button"
              variant="ghost"
              onClick={closeModal}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="gradient"
              loading={saving}
              loadingText="Saving..."
            >
              {editingLink ? "Update Link" : "Add Link"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Links;