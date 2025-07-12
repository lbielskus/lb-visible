'use client';

import { motion } from 'framer-motion';
import {
  FiMessageCircle,
  FiImage,
  FiUpload,
  FiGlobe,
  FiBarChart2,
  FiSmartphone,
  FiCode,
  FiDatabase,
  FiShield,
  FiZap,
  FiTrendingUp,
  FiTarget,
  FiServer,
  FiCloud,
  FiFile,
  FiRefreshCw,
  FiCheckCircle,
  FiStar,
  FiEye,
  FiHeart,
} from 'react-icons/fi';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const uniqueServices = [
  {
    icon: FiMessageCircle,
    title: 'Personal Business Consultation',
    description:
      'Deep-dive video calls to understand your vision, goals, and challenges',
    details: [
      '1-on-1 strategy sessions with business analysis',
      'Market research and competitor analysis',
      'User journey mapping and conversion optimization',
      'Brand positioning and messaging strategy',
      'Growth planning and digital roadmap creation',
    ],
    highlight: 'We become your digital business partners, not just developers',
  },
  {
    icon: FiImage,
    title: 'Complete Brand Ecosystem',
    description:
      'Logo, banners, brand guidelines, and visual identity creation',
    details: [
      'Custom logo design with multiple concepts',
      'Brand color palette and typography selection',
      'Marketing materials (banners, social media assets)',
      'Brand guidelines and style documentation',
      'Print and digital asset creation',
    ],
    highlight: 'Cohesive brand experience across all touchpoints',
  },
  {
    icon: FiUpload,
    title: 'Content Management & Migration',
    description:
      'We handle all your content uploads, organization, and optimization',
    details: [
      'Product catalog setup with SEO optimization',
      'Blog content migration and formatting',
      'Image optimization and alt-text creation',
      'Category and tag organization',
      'Content calendar and publishing strategy',
    ],
    highlight: 'Your content, perfectly organized and optimized',
  },
  {
    icon: FiRefreshCw,
    title: 'Continuous Design Evolution',
    description: 'Ongoing design improvements and feature enhancements',
    details: [
      'Monthly design reviews and updates',
      'A/B testing for conversion optimization',
      'User feedback implementation',
      'Seasonal design refreshes',
      'New feature development and integration',
    ],
    highlight: 'Your website evolves with your business',
  },
  {
    icon: FiGlobe,
    title: 'Complete Hosting & Domain Management',
    description: 'End-to-end hosting setup with your custom domain',
    details: [
      'Domain registration and DNS configuration',
      'SSL certificate installation and management',
      'CDN setup for global performance',
      'Email hosting and professional addresses',
      'Backup and disaster recovery systems',
    ],
    highlight: 'One-stop solution for all technical infrastructure',
  },
  {
    icon: FiBarChart2,
    title: 'Advanced Analytics & SEO Ecosystem',
    description: 'Comprehensive tracking, analytics, and search optimization',
    details: [
      'Google Analytics 4 and Search Console setup',
      'Conversion tracking and goal configuration',
      'SEO audit and ongoing optimization',
      'Local SEO and Google My Business optimization',
      'Performance monitoring and reporting',
    ],
    highlight: 'Data-driven insights for continuous growth',
  },
];

const modernApproach = [
  {
    icon: FiCode,
    title: 'Built from Scratch Philosophy',
    description: 'Every line of code is custom-written for your specific needs',
    benefits: [
      'No bloated themes or unnecessary plugins',
      'Pixel-perfect implementation of designs',
      'Optimized for your specific use case',
      'Complete control over functionality',
      'Future-proof and scalable architecture',
    ],
  },
  {
    icon: FiZap,
    title: 'Next.js & Modern Stack',
    description: 'Cutting-edge technology for unmatched performance',
    benefits: [
      'Lightning-fast loading times (under 2 seconds)',
      'Automatic image optimization and lazy loading',
      'Server-side rendering for better SEO',
      'Progressive Web App capabilities',
      'Edge computing for global performance',
    ],
  },
  {
    icon: FiSmartphone,
    title: 'Mobile-First Design Approach',
    description: 'Designed for mobile, enhanced for desktop',
    benefits: [
      'Touch-optimized interfaces and interactions',
      'Responsive design that works on any device',
      'Mobile-specific features and optimizations',
      'App-like user experience',
      'Cross-browser compatibility guaranteed',
    ],
  },
  {
    icon: FiShield,
    title: 'Enterprise-Grade Security',
    description: 'Bank-level security built into every project',
    benefits: [
      'Headless architecture reduces attack surface',
      'Automatic security updates and monitoring',
      'SSL/TLS encryption by default',
      'DDoS protection and firewall',
      'Regular security audits and penetration testing',
    ],
  },
];

const migrationSpecialties = [
  {
    icon: FiDatabase,
    title: 'WordPress CMS Frontend Rebuild',
    description:
      'Keep your familiar WordPress admin, get a lightning-fast frontend',
    process: [
      'Analyze your current WordPress structure',
      'Create custom API endpoints for data access',
      'Build modern frontend with Next.js',
      'Implement headless WordPress architecture',
      'Zero downtime migration process',
    ],
    result: '3-5x faster website with same content management',
  },
  {
    icon: FiFile,
    title: 'Complete Data Migration Services',
    description:
      'Seamless transfer of all your content, users, and functionality',
    process: [
      'Comprehensive data audit and mapping',
      'Custom migration scripts development',
      'Content preservation with SEO maintenance',
      'User account and permission migration',
      'Testing and validation processes',
    ],
    result: '100% data integrity with improved organization',
  },
  {
    icon: FiCloud,
    title: 'Platform Modernization',
    description: 'Upgrade from any platform to modern, scalable solutions',
    process: [
      'Legacy system analysis and documentation',
      'Modern architecture design and planning',
      'Gradual migration with rollback capabilities',
      'Feature enhancement during migration',
      'Team training and documentation',
    ],
    result: 'Future-proof platform with enhanced capabilities',
  },
];

const uniqueDifferentiators = [
  {
    icon: FiHeart,
    title: 'We Actually Care About Your Success',
    description:
      'Your growth is our success metric, not just project completion',
    proof: [
      'Monthly check-ins and performance reviews',
      'Proactive suggestions for improvements',
      'Industry trend updates and recommendations',
      'Long-term partnership approach',
    ],
  },
  {
    icon: FiHeart,
    title: 'Human-Centered Development',
    description: 'Real people, real conversations, real solutions',
    proof: [
      'Direct access to developers (no middlemen)',
      'Video calls for all major decisions',
      'Transparent development process',
      'Regular progress updates and demos',
    ],
  },
  {
    icon: FiZap,
    title: 'Innovation-First Mindset',
    description: "We don't just build websites, we create digital experiences",
    proof: [
      'Latest technology adoption and implementation',
      'Creative problem-solving approaches',
      'Custom solutions for unique challenges',
      'Future-ready architecture and planning',
    ],
  },
  {
    icon: FiTarget,
    title: 'Results-Driven Approach',
    description: 'Every decision is made with your business goals in mind',
    proof: [
      'Conversion optimization built-in',
      'Performance metrics and KPI tracking',
      'ROI-focused feature development',
      'Data-driven design decisions',
    ],
  },
];

export default function ServiceBanner() {
  return (
    <section className='py-10 bg-transparent text-white'>
      <div className='container mx-auto px-4 relative scale-[.8]'>
        {/* What Makes Us Different */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-4xl font-bold text-center mb-12'
        >
          What Makes Us Different
        </motion.h1>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20'>
          {uniqueServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className='group'
            >
              <Card className='bg-gradient-to-br from-purple-700/80 to-pink-700/80 border-none text-white h-full rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300'>
                <CardHeader>
                  <div className='w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300'>
                    <service.icon className='w-8 h-8 text-white' />
                  </div>
                  <CardTitle className='text-xl mb-2'>
                    {service.title}
                  </CardTitle>
                  <CardDescription className='text-blue-100'>
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className='space-y-2 mb-4'>
                    {service.details.map((detail, detailIndex) => (
                      <li
                        key={detailIndex}
                        className='flex items-start gap-2 text-sm'
                      >
                        <FiCheckCircle className='w-4 h-4 text-green-400 mt-0.5 flex-shrink-0' />
                        <span className='text-blue-100'>{detail}</span>
                      </li>
                    ))}
                  </ul>
                  <div className='bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-3 border border-purple-400/30'>
                    <div className='flex items-center gap-2 mb-1'>
                      <FiStar className='w-4 h-4 text-yellow-400' />
                      <span className='text-sm font-medium text-yellow-400'>
                        Why This Matters
                      </span>
                    </div>
                    <p className='text-sm text-blue-100'>{service.highlight}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Built with Modern Technology */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-3xl font-bold text-center mb-12'
        >
          Built with Modern Technology
        </motion.h3>
        <div className='grid md:grid-cols-2 gap-8 mb-20'>
          {modernApproach.map((approach, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className='bg-gradient-to-br from-purple-700/80 to-pink-700/80 border-none text-white h-full rounded-2xl shadow-lg'>
                <CardHeader>
                  <div className='flex items-center gap-4 mb-4'>
                    <div className='w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center'>
                      <approach.icon className='w-6 h-6 text-white' />
                    </div>
                    <div>
                      <CardTitle className='text-xl'>
                        {approach.title}
                      </CardTitle>
                      <CardDescription className='text-blue-100'>
                        {approach.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className='space-y-3'>
                    {approach.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className='flex items-start gap-3'>
                        <div className='w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0'></div>
                        <span className='text-sm text-blue-100'>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Why Choose Us Over Everyone Else */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-3xl font-bold text-center mb-12'
        >
          Why Choose Us Over Everyone Else
        </motion.h3>
        <div className='grid md:grid-cols-2 gap-8'>
          {uniqueDifferentiators.map((diff, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className='bg-gradient-to-br from-purple-700/80 to-pink-700/80 border-none text-white h-full rounded-2xl shadow-lg'>
                <CardHeader>
                  <div className='flex items-center gap-4 mb-4'>
                    <div className='w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center'>
                      <diff.icon className='w-7 h-7 text-white' />
                    </div>
                    <div>
                      <CardTitle className='text-xl'>{diff.title}</CardTitle>
                      <CardDescription className='text-blue-100'>
                        {diff.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className='space-y-3'>
                    {diff.proof.map((item, itemIndex) => (
                      <li key={itemIndex} className='flex items-start gap-3'>
                        <FiCheckCircle className='w-5 h-5 text-green-400 mt-0.5 flex-shrink-0' />
                        <span className='text-sm text-blue-100'>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
