import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-8 max-w-md"
      >
        <div className="space-y-4">
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-3xl">404</span>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-slate-900">Page Not Found</h1>
            <p className="text-slate-600">
              Sorry, we couldn't find the page you're looking for. 
              It might have been moved or doesn't exist.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="gradient"
              onClick={() => navigate("/")}
            >
              <ApperIcon name="Home" className="h-4 w-4 mr-2" />
              Go Home
            </Button>
            
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
            >
              <ApperIcon name="ArrowLeft" className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-slate-500 mb-4">
              Looking to create your own link-in-bio page?
            </p>
            <Button
              variant="ghost"
              onClick={() => navigate("/signup")}
              className="text-primary hover:text-primary/80"
            >
              Sign up for free →
            </Button>
          </div>
        </div>

        {/* Helpful links */}
        <div className="border-t border-slate-200 pt-6">
          <p className="text-sm text-slate-500 mb-3">Helpful links:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <button
              onClick={() => navigate("/pricing")}
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              Pricing
            </button>
            <button
              onClick={() => navigate("/about")}
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              About
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;