import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";

const MarketingHome = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: "Link2",
      title: "Unlimited Links",
      description: "Add as many links as you want to your page. No restrictions, complete freedom."
    },
    {
      icon: "Palette",
      title: "Custom Themes",
      description: "Personalize your page with custom colors, gradients, and button styles."
    },
    {
      icon: "BarChart3",
      title: "Analytics",
      description: "Track clicks and views to understand your audience better."
    },
    {
      icon: "Smartphone",
      title: "Mobile Optimized",
      description: "Your page looks perfect on all devices, especially mobile."
    },
    {
      icon: "Zap",
      title: "Fast Loading",
      description: "Lightning-fast pages that load instantly for your visitors."
    },
    {
      icon: "Shield",
      title: "Reliable",
      description: "99.9% uptime guarantee. Your links are always accessible."
    }
  ];

  const examples = [
    { username: "creator", name: "Sarah Creator", links: 5 },
    { username: "musician", name: "Jake Music", links: 8 },
    { username: "blogger", name: "Emma Writes", links: 6 }
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
              One Link for
              <span className="gradient-text"> Everything</span>
            </h1>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Share all your content, social profiles, contact info, and more with a single, 
              beautiful link-in-bio page. Perfect for Instagram, TikTok, Twitter, and beyond.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                variant="gradient"
                size="xl"
                className="px-8"
                onClick={() => navigate("/signup")}
              >
                Create Your Page
              </Button>
              
              <Button
                variant="outline"
                size="xl"
                className="px-8"
                onClick={() => navigate("/u/creator")}
              >
                <ApperIcon name="Play" className="h-5 w-5 mr-2" />
                See Example
              </Button>
            </div>

            <div className="flex items-center justify-center space-x-6 text-sm text-slate-500">
              <div className="flex items-center space-x-2">
                <ApperIcon name="Check" className="h-4 w-4 text-green-500" />
                <span>Free forever</span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="Check" className="h-4 w-4 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="Check" className="h-4 w-4 text-green-500" />
                <span>Setup in 30 seconds</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Everything you need to shine online
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Powerful features designed to help creators, businesses, and influencers 
            share their content effectively.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full hover:shadow-xl transition-all duration-300 card-hover">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-xl">
                    <ApperIcon name={feature.icon} className="h-6 w-6 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-slate-900">{feature.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Examples Section */}
      <section id="examples" className="bg-gradient-to-br from-slate-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              See LinkHub in action
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Check out these example pages to see how easy it is to create 
              a professional link-in-bio page.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {examples.map((example, index) => (
              <motion.div
                key={example.username}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 text-center card-hover cursor-pointer" 
                      onClick={() => navigate(`/u/${example.username}`)}>
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto">
                      <span className="text-white font-bold text-xl">
                        {example.name[0]}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{example.name}</h3>
                      <p className="text-slate-600">@{example.username}</p>
                    </div>
                    <div className="flex items-center justify-center space-x-4 text-sm text-slate-500">
                      <div className="flex items-center space-x-1">
                        <ApperIcon name="Link2" className="h-4 w-4" />
                        <span>{example.links} links</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ApperIcon name="Eye" className="h-4 w-4" />
                        <span>Live</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      View Page
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Simple, transparent pricing
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <Card className="p-8 relative">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Free</h3>
                  <p className="text-slate-600">Perfect for getting started</p>
                </div>
                
                <div className="text-4xl font-bold text-slate-900">
                  $0<span className="text-lg text-slate-500">/month</span>
                </div>
                
                <ul className="space-y-3 text-left">
                  {["Unlimited links", "Basic analytics", "Mobile optimized", "Custom username"].map((feature) => (
                    <li key={feature} className="flex items-center space-x-2">
                      <ApperIcon name="Check" className="h-4 w-4 text-green-500" />
                      <span className="text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button variant="outline" className="w-full" onClick={() => navigate("/signup")}>
                  Get Started Free
                </Button>
              </div>
            </Card>

            {/* Pro Plan */}
            <Card className="p-8 relative border-primary border-2">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Pro</h3>
                  <p className="text-slate-600">For serious creators</p>
                </div>
                
                <div className="text-4xl font-bold text-slate-900">
                  $8<span className="text-lg text-slate-500">/month</span>
                </div>
                
                <ul className="space-y-3 text-left">
                  {[
                    "Everything in Free", 
                    "Advanced analytics", 
                    "Custom themes", 
                    "Priority support",
                    "Remove LinkHub branding"
                  ].map((feature) => (
                    <li key={feature} className="flex items-center space-x-2">
                      <ApperIcon name="Check" className="h-4 w-4 text-green-500" />
                      <span className="text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button variant="gradient" className="w-full" onClick={() => navigate("/pricing")}>
                  Start Pro Trial
                </Button>
              </div>
            </Card>
          </div>
          
          <Button variant="ghost" onClick={() => navigate("/pricing")}>
            View full pricing details →
          </Button>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary via-secondary to-accent py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8 text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to get started?
            </h2>
            
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Join thousands of creators who use LinkHub to share their content 
              and grow their audience. Create your page in less than a minute.
            </p>
            
            <Button
              variant="secondary"
              size="xl"
              className="bg-white text-primary hover:bg-slate-50 px-8"
              onClick={() => navigate("/signup")}
            >
              Create Your Page Now
            </Button>
            
            <p className="text-sm opacity-75">
              No credit card required • Free forever plan available
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default MarketingHome;