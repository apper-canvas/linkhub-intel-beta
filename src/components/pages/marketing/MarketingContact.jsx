import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import Card from "@/components/atoms/Card";
import { contactService } from "@/services/api/contactService";

const MarketingContact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await contactService.submitContact(formData);
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: "Mail",
      title: "Email us",
      description: "Get in touch and we'll get back to you within 24 hours.",
      contact: "hello@linkhub.com"
    },
    {
      icon: "MessageCircle",
      title: "Live chat",
      description: "Chat with our team during business hours.",
      contact: "Available 9am-5pm EST"
    },
    {
      icon: "FileText",
      title: "Help Center",
      description: "Find answers to common questions and tutorials.",
      contact: "Browse articles"
    }
  ];

  return (
    <div className="py-20 space-y-20">
      {/* Header */}
      <section className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
            Get in touch
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Have a question about LinkHub? Need help getting started? 
            We're here to help and would love to hear from you.
          </p>
        </motion.div>
      </section>

      {/* Contact Options */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-6 text-center h-full card-hover cursor-pointer">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name={info.icon} className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{info.title}</h3>
                <p className="text-slate-600 text-sm mb-3">{info.description}</p>
                <p className="text-primary font-medium text-sm">{info.contact}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="p-8">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    Send us a message
                  </h2>
                  <p className="text-slate-600">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    label="Full Name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />

                  <Input
                    type="email"
                    label="Email Address"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter your email address"
                    required
                  />

                  <Textarea
                    label="Message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="Tell us how we can help you..."
                    rows={6}
                    required
                  />

                  <Button
                    type="submit"
                    variant="gradient"
                    className="w-full"
                    size="lg"
                    loading={isSubmitting}
                    loadingText="Sending..."
                  >
                    <ApperIcon name="Send" className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </div>
            </Card>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-slate-900 mb-1">
                    How quickly can I set up my page?
                  </h4>
                  <p className="text-slate-600 text-sm">
                    You can create and customize your LinkHub page in under 5 minutes. 
                    It's that simple!
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 mb-1">
                    Can I use my own custom domain?
                  </h4>
                  <p className="text-slate-600 text-sm">
                    Yes! Pro users can connect their own custom domain to their LinkHub page.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 mb-1">
                    Do you offer customer support?
                  </h4>
                  <p className="text-slate-600 text-sm">
                    Absolutely. We provide email support for all users and priority support 
                    for Pro subscribers.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-6">
              <h3 className="font-semibold text-slate-900 mb-3">
                Looking for help?
              </h3>
              <p className="text-slate-600 text-sm mb-4">
                Check out our comprehensive help center with tutorials, 
                guides, and answers to common questions.
              </p>
              <Button variant="outline" size="sm">
                <ApperIcon name="BookOpen" className="h-4 w-4 mr-2" />
                Visit Help Center
              </Button>
            </div>

            <div className="bg-gradient-to-br from-accent/5 to-secondary/5 rounded-xl p-6">
              <h3 className="font-semibold text-slate-900 mb-3">
                Follow us
              </h3>
              <p className="text-slate-600 text-sm mb-4">
                Stay updated with the latest features and creator tips.
              </p>
              <div className="flex space-x-3">
                <button className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <ApperIcon name="Twitter" className="h-4 w-4 text-slate-600" />
                </button>
                <button className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <ApperIcon name="Instagram" className="h-4 w-4 text-slate-600" />
                </button>
                <button className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <ApperIcon name="Linkedin" className="h-4 w-4 text-slate-600" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default MarketingContact;