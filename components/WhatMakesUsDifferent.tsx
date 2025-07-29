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
import useTranslation from 'next-translate/useTranslation';

const WhatMakesUsDifferent = () => {
  const { t, lang } = useTranslation('common');
  const isLt = lang === 'lt';
  const services = [
    {
      icon: FiMessageCircle,
      title: isLt
        ? t('howItWorksCards.personalBusinessConsultation.title')
        : 'Personal Business Consultation',
      description: isLt
        ? t('howItWorksCards.personalBusinessConsultation.subtitle')
        : 'Deep-dive video calls to understand your vision, goals, and challenges',
      details: [
        isLt
          ? t('howItWorksCards.personalBusinessConsultation.1')
          : '1-on-1 strategy sessions with business analysis',
        isLt
          ? t('howItWorksCards.personalBusinessConsultation.2')
          : 'Market research and competitor analysis',
        isLt
          ? t('howItWorksCards.personalBusinessConsultation.3')
          : 'User journey mapping and conversion optimization',
        isLt
          ? t('howItWorksCards.personalBusinessConsultation.4')
          : 'Brand positioning and messaging strategy',
        isLt
          ? t('howItWorksCards.personalBusinessConsultation.5')
          : 'Growth planning and digital roadmap creation',
      ],
      highlight: isLt
        ? t('howItWorksCards.personalBusinessConsultation.link')
        : 'We become your digital business partners, not just developers',
    },
    {
      icon: FiImage,
      title: isLt
        ? t('howItWorksCards.completeBrandEcosystem.title')
        : 'Complete Brand Ecosystem',
      description: isLt
        ? t('howItWorksCards.completeBrandEcosystem.subtitle')
        : 'Logo, banners, brand guidelines, and visual identity creation',
      details: [
        isLt
          ? t('howItWorksCards.completeBrandEcosystem.1')
          : 'Custom logo design with multiple concepts',
        isLt
          ? t('howItWorksCards.completeBrandEcosystem.2')
          : 'Brand color palette and typography selection',
        isLt
          ? t('howItWorksCards.completeBrandEcosystem.3')
          : 'Marketing materials (banners, social media assets)',
        isLt
          ? t('howItWorksCards.completeBrandEcosystem.4')
          : 'Brand guidelines and style documentation',
        isLt
          ? t('howItWorksCards.completeBrandEcosystem.5')
          : 'Print and digital asset creation',
      ],
      highlight: isLt
        ? t('howItWorksCards.completeBrandEcosystem.link')
        : 'Cohesive brand experience across all touchpoints',
    },
    {
      icon: FiUpload,
      title: isLt
        ? t('howItWorksCards.contentManagement.title')
        : 'Content Management & Migration',
      description: isLt
        ? t('howItWorksCards.contentManagement.subtitle')
        : 'We handle all your content uploads, organization, and optimization',
      details: [
        isLt
          ? t('howItWorksCards.contentManagement.1')
          : 'Product catalog setup with SEO optimization',
        isLt
          ? t('howItWorksCards.contentManagement.2')
          : 'Blog content migration and formatting',
        isLt
          ? t('howItWorksCards.contentManagement.3')
          : 'Image optimization and alt-text creation',
        isLt
          ? t('howItWorksCards.contentManagement.4')
          : 'Category and tag organization',
        isLt
          ? t('howItWorksCards.contentManagement.5')
          : 'Content calendar and publishing strategy',
      ],
      highlight: isLt
        ? t('howItWorksCards.contentManagement.link')
        : 'Your content, perfectly organized and optimized',
    },
    {
      icon: FiRefreshCw,
      title: isLt
        ? t('howItWorksCards.continuousDesignEvolution.title')
        : 'Continuous Design Evolution',
      description: isLt
        ? t('howItWorksCards.continuousDesignEvolution.subtitle')
        : 'Ongoing design improvements and feature enhancements',
      details: [
        isLt
          ? t('howItWorksCards.continuousDesignEvolution.1')
          : 'Monthly design reviews and updates',
        isLt
          ? t('howItWorksCards.continuousDesignEvolution.2')
          : 'A/B testing for conversion optimization',
        isLt
          ? t('howItWorksCards.continuousDesignEvolution.3')
          : 'User feedback implementation',
        isLt
          ? t('howItWorksCards.continuousDesignEvolution.4')
          : 'Seasonal design refreshes',
        isLt
          ? t('howItWorksCards.continuousDesignEvolution.5')
          : 'New feature development and integration',
      ],
      highlight: isLt
        ? t('howItWorksCards.continuousDesignEvolution.link')
        : 'Your website evolves with your business',
    },
    {
      icon: FiGlobe,
      title: isLt
        ? t('howItWorksCards.completeHosting.title')
        : 'Complete Hosting & Domain Management',
      description: isLt
        ? t('howItWorksCards.completeHosting.subtitle')
        : 'End-to-end hosting setup with your custom domain',
      details: [
        isLt
          ? t('howItWorksCards.completeHosting.1')
          : 'Domain registration and DNS configuration',
        isLt
          ? t('howItWorksCards.completeHosting.2')
          : 'SSL certificate installation and management',
        isLt
          ? t('howItWorksCards.completeHosting.3')
          : 'CDN setup for global performance',
        isLt
          ? t('howItWorksCards.completeHosting.4')
          : 'Email hosting and professional addresses',
        isLt
          ? t('howItWorksCards.completeHosting.5')
          : 'Backup and disaster recovery systems',
      ],
      highlight: isLt
        ? t('howItWorksCards.completeHosting.link')
        : 'One-stop solution for all technical infrastructure',
    },
    {
      icon: FiBarChart2,
      title: isLt
        ? t('howItWorksCards.advancedAnalytics.title')
        : 'Advanced Analytics & SEO Ecosystem',
      description: isLt
        ? t('howItWorksCards.advancedAnalytics.subtitle')
        : 'Comprehensive tracking, analytics, and search optimization',
      details: [
        isLt
          ? t('howItWorksCards.advancedAnalytics.1')
          : 'Google Analytics 4 and Search Console setup',
        isLt
          ? t('howItWorksCards.advancedAnalytics.2')
          : 'Conversion tracking and goal configuration',
        isLt
          ? t('howItWorksCards.advancedAnalytics.3')
          : 'SEO audit and ongoing optimization',
        isLt
          ? t('howItWorksCards.advancedAnalytics.4')
          : 'Local SEO and Google My Business optimization',
        isLt
          ? t('howItWorksCards.advancedAnalytics.5')
          : 'Performance monitoring and reporting',
      ],
      highlight: isLt
        ? t('howItWorksCards.advancedAnalytics.link')
        : 'Data-driven insights for continuous growth',
    },
  ];
  return (
    <section className='py-4 mt-0'>
      <h1 className='text-4xl font-bold text-center mb-6 mt-2 text-white'>
        {isLt ? t('howItWorksCards.sectionTitle') : 'What Makes Us Different'}
      </h1>
      <div className='container mx-auto px-2'>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {services.map((service, index) => (
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
};

export default WhatMakesUsDifferent;
