import { motion } from 'framer-motion';
import {
  FiMessageCircle,
  FiImage,
  FiUpload,
  FiRefreshCw,
  FiGlobe,
  FiBarChart2,
  FiCheckCircle,
  FiStar,
} from 'react-icons/fi';

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

const WhatMakesUsDifferent = () => (
  <section className='py-4 mt-0'>
    <h1 className='text-4xl font-bold text-center mb-6 mt-2 text-white'>
      What Makes Us Different
    </h1>
    <div className='container mx-auto px-2'>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {uniqueServices.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className='group'
          >
            <div className='bg-white/30 backdrop-blur-md border border-white/30 text-gray-700 h-full rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-4'>
              <div className='w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-300'>
                <service.icon className='w-6 h-6 text-white' />
              </div>
              <div className='text-2xl mt-2 mb-1 font-bold text-gray-700'>
                {service.title}
              </div>
              <div className='text-gray-600 mb-2 text-sm'>
                {service.description}
              </div>
              <ul className='space-y-1 mb-2'>
                {service.details.map((detail, detailIndex) => (
                  <li
                    key={detailIndex}
                    className='flex items-start gap-2 text-xs'
                  >
                    <FiCheckCircle className='w-4 h-4 text-green-500 mt-0.5 flex-shrink-0' />
                    <span className='text-gray-600'>{detail}</span>
                  </li>
                ))}
              </ul>
              <div className='bg-white/40 backdrop-blur rounded-lg p-2 border border-purple-200/40 mt-2'>
                <div className='flex items-center gap-2 mb-0.5'>
                  <FiStar className='w-4 h-4 text-primary' />
                  <span className='text-xs font-medium text-primary'>
                    Why This Matters
                  </span>
                </div>
                <p className='text-xs text-gray-600'>{service.highlight}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhatMakesUsDifferent;
