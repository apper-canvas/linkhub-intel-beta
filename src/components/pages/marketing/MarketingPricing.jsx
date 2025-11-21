import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";

const MarketingPricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const navigate = useNavigate();

  const plans = [
    {
      name: "Free",
      description: "Perfect for getting started",
      price: { monthly: 0, annual: 0 },
      features: [
        "Unlimited links",
        "Basic analytics", 
        "Mobile optimized",
        "Custom username",
        "LinkHub branding"
      ],
      cta: "Get Started Free",
      variant: "outline"
    },
    {
      name: "Pro",
      description: "For serious creators and businesses",
      price: { monthly: 8, annual: 80 },
      popular: true,
      features: [
        "Everything in Free",
        "Advanced analytics & insights",
        "Custom themes & colors",
        "Remove LinkHub branding",
        "Priority support",
        "Custom CSS",
        "Link scheduling",
        "Password protection"
      ],
      cta: "Start Pro Trial",
      variant: "gradient"
    }
  ];

  const faqs = [
    {
      question: "Can I change plans at any time?",
      answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately."
    },
    {
      question: "Is there a free trial for Pro?",
      answer: "Yes, we offer a 14-day free trial for Pro. No credit card required to start."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and other local payment methods."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Absolutely! You can cancel your subscription at any time. Your plan will remain active until the end of the billing period."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 30-day money-back guarantee for all paid plans. No questions asked."
    },
    {
      question: "Is my data safe?",
      answer: "Yes, we use industry-standard encryption and security measures to protect your data. We never sell or share your information."
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
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Choose the plan that works best for you. Start free and upgrade 
            when you need more features.
          </p>
        </motion.div>
      </section>

      {/* Billing Toggle */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center space-x-4 mb-12">
          <span className={`text-sm font-medium ${!isAnnual ? "text-slate-900" : "text-slate-500"}`}>
            Monthly
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isAnnual ? "bg-primary" : "bg-slate-200"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isAnnual ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span className={`text-sm font-medium ${isAnnual ? "text-slate-900" : "text-slate-500"}`}>
            Annual
          </span>
          {isAnnual && (
            <span className="bg-gradient-to-r from-primary to-secondary text-white px-2 py-1 rounded-full text-xs font-medium">
              Save 17%
            </span>
          )}
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className={`p-8 h-full relative ${
                plan.popular ? "border-primary border-2" : ""
              }`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">{plan.name}</h3>
                    <p className="text-slate-600">{plan.description}</p>
                  </div>
                  
                  <div className="text-4xl font-bold text-slate-900">
                    ${isAnnual ? plan.price.annual : plan.price.monthly}
                    <span className="text-lg text-slate-500">
                      {plan.price.monthly > 0 ? `/${isAnnual ? "year" : "month"}` : ""}
                    </span>
                  </div>
                  
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center space-x-3">
                        <ApperIcon name="Check" className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    variant={plan.variant}
                    className="w-full"
                    size="lg"
                    onClick={() => navigate("/signup")}
                  >
                    {plan.cta}
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Comparison */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-12"
        >
          <h2 className="text-3xl font-bold text-slate-900">
            Compare all features
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            See exactly what's included in each plan and choose the one that fits your needs.
          </p>
        </motion.div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                    Features
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900">
                    Free
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900">
                    Pro
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {[
                  { feature: "Unlimited links", free: true, pro: true },
                  { feature: "Custom username", free: true, pro: true },
                  { feature: "Mobile optimized", free: true, pro: true },
                  { feature: "Basic analytics", free: true, pro: true },
                  { feature: "Advanced analytics", free: false, pro: true },
                  { feature: "Custom themes", free: false, pro: true },
                  { feature: "Remove branding", free: false, pro: true },
                  { feature: "Priority support", free: false, pro: true },
                  { feature: "Custom CSS", free: false, pro: true },
                  { feature: "Link scheduling", free: false, pro: true }
                ].map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                    <td className="px-6 py-4 text-sm text-slate-900">{row.feature}</td>
                    <td className="px-6 py-4 text-center">
                      {row.free ? (
                        <ApperIcon name="Check" className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <ApperIcon name="X" className="h-5 w-5 text-slate-300 mx-auto" />
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.pro ? (
                        <ApperIcon name="Check" className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <ApperIcon name="X" className="h-5 w-5 text-slate-300 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-12"
        >
          <h2 className="text-3xl font-bold text-slate-900">
            Frequently asked questions
          </h2>
          <p className="text-slate-600">
            Everything you need to know about LinkHub pricing and features.
          </p>
        </motion.div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-6">
                <h3 className="font-semibold text-slate-900 mb-2">{faq.question}</h3>
                <p className="text-slate-600">{faq.answer}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
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
              Ready to create your page?
            </h2>
            
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Start with our free plan and upgrade when you need more features. 
              No setup fees, no contracts.
            </p>
            
            <Button
              variant="secondary"
              size="xl"
              className="bg-white text-primary hover:bg-slate-50 px-8"
              onClick={() => navigate("/signup")}
            >
              Get Started Free
            </Button>
            
            <p className="text-sm opacity-75">
              14-day Pro trial • No credit card required
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default MarketingPricing;