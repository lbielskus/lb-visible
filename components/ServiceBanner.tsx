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
import useTranslation from 'next-translate/useTranslation';

export default function ServiceBanner() {
  const { t, lang } = useTranslation('common');

  const uniqueServices = [
    {
      icon: FiMessageCircle,
      title: t(
        'serviceBanner.uniqueServices.personalBusinessConsultation.title'
      ),
      description: t(
        'serviceBanner.uniqueServices.personalBusinessConsultation.description'
      ),
      details: t(
        'serviceBanner.uniqueServices.personalBusinessConsultation.details',
        {},
        { returnObjects: true }
      ) as string[],
      highlight: t(
        'serviceBanner.uniqueServices.personalBusinessConsultation.highlight'
      ),
    },
    {
      icon: FiImage,
      title: t('serviceBanner.uniqueServices.completeBrandEcosystem.title'),
      description: t(
        'serviceBanner.uniqueServices.completeBrandEcosystem.description'
      ),
      details: t(
        'serviceBanner.uniqueServices.completeBrandEcosystem.details',
        {},
        { returnObjects: true }
      ) as string[],
      highlight: t(
        'serviceBanner.uniqueServices.completeBrandEcosystem.highlight'
      ),
    },
    {
      icon: FiUpload,
      title: t('serviceBanner.uniqueServices.contentManagement.title'),
      description: t(
        'serviceBanner.uniqueServices.contentManagement.description'
      ),
      details: t(
        'serviceBanner.uniqueServices.contentManagement.details',
        {},
        { returnObjects: true }
      ) as string[],
      highlight: t('serviceBanner.uniqueServices.contentManagement.highlight'),
    },
    {
      icon: FiRefreshCw,
      title: t('serviceBanner.uniqueServices.continuousDesignEvolution.title'),
      description: t(
        'serviceBanner.uniqueServices.continuousDesignEvolution.description'
      ),
      details: t(
        'serviceBanner.uniqueServices.continuousDesignEvolution.details',
        {},
        { returnObjects: true }
      ) as string[],
      highlight: t(
        'serviceBanner.uniqueServices.continuousDesignEvolution.highlight'
      ),
    },
    {
      icon: FiGlobe,
      title: t('serviceBanner.uniqueServices.completeHosting.title'),
      description: t(
        'serviceBanner.uniqueServices.completeHosting.description'
      ),
      details: t(
        'serviceBanner.uniqueServices.completeHosting.details',
        {},
        { returnObjects: true }
      ) as string[],
      highlight: t('serviceBanner.uniqueServices.completeHosting.highlight'),
    },
    {
      icon: FiBarChart2,
      title: t('serviceBanner.uniqueServices.advancedAnalytics.title'),
      description: t(
        'serviceBanner.uniqueServices.advancedAnalytics.description'
      ),
      details: t(
        'serviceBanner.uniqueServices.advancedAnalytics.details',
        {},
        { returnObjects: true }
      ) as string[],
      highlight: t('serviceBanner.uniqueServices.advancedAnalytics.highlight'),
    },
  ];

  const modernApproach = [
    {
      icon: FiCode,
      title: t('serviceBanner.modernApproach.builtFromScratch.title'),
      description: t(
        'serviceBanner.modernApproach.builtFromScratch.description'
      ),
      benefits: t(
        'serviceBanner.modernApproach.builtFromScratch.benefits',
        {},
        { returnObjects: true }
      ) as string[],
    },
    {
      icon: FiZap,
      title: t('serviceBanner.modernApproach.nextJsModernStack.title'),
      description: t(
        'serviceBanner.modernApproach.nextJsModernStack.description'
      ),
      benefits: t(
        'serviceBanner.modernApproach.nextJsModernStack.benefits',
        {},
        { returnObjects: true }
      ) as string[],
    },
    {
      icon: FiSmartphone,
      title: t('serviceBanner.modernApproach.mobileFirstDesign.title'),
      description: t(
        'serviceBanner.modernApproach.mobileFirstDesign.description'
      ),
      benefits: t(
        'serviceBanner.modernApproach.mobileFirstDesign.benefits',
        {},
        { returnObjects: true }
      ) as string[],
    },
    {
      icon: FiShield,
      title: t('serviceBanner.modernApproach.enterpriseSecurity.title'),
      description: t(
        'serviceBanner.modernApproach.enterpriseSecurity.description'
      ),
      benefits: t(
        'serviceBanner.modernApproach.enterpriseSecurity.benefits',
        {},
        { returnObjects: true }
      ) as string[],
    },
  ];

  const uniqueDifferentiators = [
    {
      icon: FiHeart,
      title: t('serviceBanner.uniqueDifferentiators.careAboutSuccess.title'),
      description: t(
        'serviceBanner.uniqueDifferentiators.careAboutSuccess.description'
      ),
      proof: t(
        'serviceBanner.uniqueDifferentiators.careAboutSuccess.proof',
        {},
        { returnObjects: true }
      ) as string[],
    },
    {
      icon: FiHeart,
      title: t(
        'serviceBanner.uniqueDifferentiators.humanCenteredDevelopment.title'
      ),
      description: t(
        'serviceBanner.uniqueDifferentiators.humanCenteredDevelopment.description'
      ),
      proof: t(
        'serviceBanner.uniqueDifferentiators.humanCenteredDevelopment.proof',
        {},
        { returnObjects: true }
      ) as string[],
    },
    {
      icon: FiZap,
      title: t('serviceBanner.uniqueDifferentiators.innovationFirst.title'),
      description: t(
        'serviceBanner.uniqueDifferentiators.innovationFirst.description'
      ),
      proof: t(
        'serviceBanner.uniqueDifferentiators.innovationFirst.proof',
        {},
        { returnObjects: true }
      ) as string[],
    },
    {
      icon: FiTarget,
      title: t('serviceBanner.uniqueDifferentiators.resultsDriven.title'),
      description: t(
        'serviceBanner.uniqueDifferentiators.resultsDriven.description'
      ),
      proof: t(
        'serviceBanner.uniqueDifferentiators.resultsDriven.proof',
        {},
        { returnObjects: true }
      ) as string[],
    },
  ];

  return (
    <section className='py-16 bg-transparent text-gray-600'>
      <div className='max-w-screen-lg mx-auto px-4'>
        {/* Section Title */}
        <div className='mb-12 text-center'>
          <h2 className='text-3xl font-bold text-gray-600 text-center mt-4 mb-2'>
            {t('serviceBanner.whatMakesUsDifferent')}
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
            {t('serviceBanner.builtWithModernTechnology')}
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
            {t('serviceBanner.whyChooseUs')}
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
