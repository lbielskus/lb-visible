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
    <section className='py-16 bg-transparent text-gray-600'>
      <div className='max-w-screen-lg mx-auto px-4'>
        {/* Section Title */}
        <div className='mb-12 text-center'>
          <h2 className='text-3xl font-bold text-gray-600 text-center mt-4 mb-2'>
            What Makes Us Different
          </h2>
          <div className='w-16 h-1 bg-blue-500 mx-auto rounded'></div>
        </div>
        {/* Cards Grid */}
        <div className='grid md:grid-cols-3 gap-8 mb-16'>
          {uniqueServices.map((service, index) => (
            <div
              key={index}
              className='bg-white/30 backdrop-blur-md border border-white/30 shadow-md rounded-2xl p-8 flex flex-col items-start h-full'
            >
              <div className='w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 mb-4'>
                <service.icon className='w-7 h-7 text-blue-500' />
              </div>
              <h3 className='text-lg font-bold mb-1'>{service.title}</h3>
              <p className='text-sm text-gray-600 mb-4'>
                {service.description}
              </p>
              <ul className='mb-4 space-y-1'>
                {service.details.map((detail, detailIndex) => (
                  <li
                    key={detailIndex}
                    className='flex items-start gap-2 text-sm'
                  >
                    <FiCheckCircle className='w-4 h-4 text-green-500 mt-0.5 flex-shrink-0' />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
              <div className='mt-auto pt-2 border-t border-gray-100 w-full'>
                <span className='text-xs text-blue-600 font-semibold'>
                  {service.highlight}
                </span>
              </div>
            </div>
          ))}
        </div>
        {/* Section Title 2 */}
        <div className='mb-12 text-center'>
          <h2 className='text-3xl font-bold text-gray-600 md:text-gray-300 text-center mb-6 mt-4'>
            Built with Modern Technology
          </h2>
          <div className='w-12 h-1 bg-blue-400 mx-auto rounded'></div>
        </div>
        <div className='grid md:grid-cols-2 gap-8 mb-16'>
          {modernApproach.map((approach, index) => (
            <div
              key={index}
              className='bg-white/30 backdrop-blur-md border border-white/30 shadow-md rounded-2xl p-8 flex flex-col items-start h-full'
            >
              <div className='w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 mb-4'>
                <approach.icon className='w-6 h-6 text-blue-500' />
              </div>
              <h3 className='text-base font-bold mb-1'>{approach.title}</h3>
              <p className='text-sm text-gray-600 mb-4'>
                {approach.description}
              </p>
              <ul className='mb-2 space-y-1'>
                {approach.benefits.map((benefit, benefitIndex) => (
                  <li
                    key={benefitIndex}
                    className='flex items-start gap-2 text-sm'
                  >
                    <span className='w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0'></span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* Section Title 3 */}
        <div className='mb-12 text-center'>
          <h2 className='text-3xl font-bold text-gray-600 md:text-gray-300 text-center mb-6 mt-4'>
            Why Choose Us Over Everyone Else
          </h2>
          <div className='w-12 h-1 bg-blue-400 mx-auto rounded'></div>
        </div>
        <div className='grid md:grid-cols-2 gap-8'>
          {uniqueDifferentiators.map((diff, index) => (
            <div
              key={index}
              className='bg-white/30 backdrop-blur-md border border-white/30 shadow-md rounded-2xl p-8 flex flex-col items-start h-full'
            >
              <div className='w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 mb-4'>
                <diff.icon className='w-7 h-7 text-blue-500' />
              </div>
              <h3 className='text-lg font-bold mb-1'>{diff.title}</h3>
              <p className='text-sm text-gray-600 mb-4'>{diff.description}</p>
              <ul className='mb-2 space-y-1'>
                {diff.proof.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className='flex items-start gap-2 text-sm'
                  >
                    <FiCheckCircle className='w-4 h-4 text-green-500 mt-0.5 flex-shrink-0' />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
