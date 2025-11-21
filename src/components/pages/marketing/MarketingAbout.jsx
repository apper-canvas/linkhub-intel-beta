import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";

const MarketingAbout = () => {
  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "1M+", label: "Links Created" },
    { number: "50M+", label: "Monthly Clicks" },
    { number: "99.9%", label: "Uptime" }
  ];

  const values = [
    {
      icon: "Heart",
      title: "Creator-First",
      description: "We build everything with creators in mind. Your success is our success."
    },
    {
      icon: "Shield",
      title: "Privacy Focused",
      description: "Your data is yours. We never sell or share your information with third parties."
    },
    {
      icon: "Zap",
      title: "Performance",
      description: "Lightning-fast pages that load instantly. Your audience won't wait, and neither will we."
    },
    {
      icon: "Users",
      title: "Community",
      description: "Join a thriving community of creators, entrepreneurs, and businesses using LinkHub."
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      bio: "Former product lead at major social platforms. Passionate about empowering creators.",
      avatar: "SJ"
    },
    {
      name: "Mike Chen",
      role: "CTO",
      bio: "Full-stack engineer with 10+ years building scalable web applications.",
      avatar: "MC"
    },
    {
      name: "Emma Davis",
      role: "Head of Design",
      bio: "Design systems expert who believes beautiful interfaces should be accessible to everyone.",
      avatar: "ED"
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
            Empowering creators to 
            <span className="gradient-text"> share more</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            LinkHub was born from a simple idea: creators shouldn't be limited by platform 
            restrictions when sharing their content. We believe everyone deserves a beautiful, 
            professional way to showcase their work.
          </p>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-6 text-center">
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold text-slate-900 text-center">Our Story</h2>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-slate-600 leading-relaxed">
              LinkHub started in 2023 when our founder Sarah was managing multiple social media 
              accounts for her creative agency. She was frustrated by the limitations of existing 
              link-in-bio tools - they were either too expensive, too limited, or simply didn't 
              look professional.
            </p>
            
            <p className="text-slate-600 leading-relaxed">
              After building a custom solution for her own needs, Sarah realized that thousands 
              of other creators were facing the same problem. That's when LinkHub was born - 
              a platform that combines beautiful design, powerful features, and fair pricing.
            </p>
            
            <p className="text-slate-600 leading-relaxed">
              Today, LinkHub serves over 10,000 creators worldwide, from individual influencers 
              to growing businesses. We're proud to be the platform that helps creators share 
              more, grow faster, and look professional while doing it.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Values */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-3xl font-bold text-slate-900">What drives us</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Our values guide everything we do, from product decisions to customer support.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name={value.icon} className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{value.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900">Meet the team</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            The people behind LinkHub are creators, builders, and dreamers just like you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-6 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">{member.avatar}</span>
                </div>
                <h3 className="font-semibold text-slate-900">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission */}
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
              Our mission is simple
            </h2>
            
            <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              We exist to give every creator, entrepreneur, and business a professional way to 
              share their content. No matter how big or small, everyone deserves tools that are 
              beautiful, powerful, and affordable.
            </p>
            
            <div className="flex items-center justify-center space-x-2 text-lg">
              <span>Made with</span>
              <ApperIcon name="Heart" className="h-6 w-6 text-red-300" />
              <span>for creators everywhere</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default MarketingAbout;