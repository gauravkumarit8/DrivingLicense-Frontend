"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Shield, Users, Zap } from 'lucide-react';

export default function HomePage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div className="relative min-h-screen">
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'brightness(0.4)' }}
      >
        <source src="/car.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="relative z-10 min-h-screen">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen"
        >
          <motion.header
            variants={itemVariants}
            className="text-center mb-16 space-y-4"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
              Welcome to Our Application
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
              Discover the features and join our growing community of innovators.
            </p>
          </motion.header>

          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 w-full max-w-5xl"
          >
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Lightning Fast",
                description: "Experience blazing fast performance with our optimized platform",
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Secure by Design",
                description: "Your data is protected with enterprise-grade security",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Community Driven",
                description: "Join thousands of users who trust our platform",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white hover:bg-white/20 transition-colors duration-300"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  {feature.icon}
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto"
          >
            {[
              { href: "/user/distance", text: "Check Nearest Admin" },
              { href: "/user/login", text: "Login" },
              { href: "/user/register", text: "Register" },
            ].map((button, index) => (
              <motion.div key={index} variants={itemVariants} className="flex-1">
                <Link href={button.href} className="w-full">
                  <button className="w-full group relative px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-opacity-90 transition-all duration-300 overflow-hidden">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {button.text}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </button>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}