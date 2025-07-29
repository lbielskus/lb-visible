'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Repeat, Monitor, Smartphone } from 'lucide-react';
import {
  collectionGroup,
  getDocs,
  query,
  where,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import useTranslation from 'next-translate/useTranslation';

interface AuditResult {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  tips: string[];
}

export default function AuditForm() {
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState<'form' | 'email' | 'results'>('form');
  const [result, setResult] = useState<{
    mobile: AuditResult;
    desktop: AuditResult;
  } | null>(null);
  const [dots, setDots] = useState('.');
  const [view, setView] = useState<'desktop' | 'mobile'>('desktop');
  const { t } = useTranslation('common');

  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setDots((prev) => (prev === '...' ? '.' : prev + '.'));
    }, 400);
    return () => clearInterval(interval);
  }, [loading]);

  const simulateProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 250);
    return interval;
  };

  const handleSubmit = async () => {
    const targetUrl = url.trim();
    if (!targetUrl || !/^https?:\/\//.test(targetUrl)) {
      toast.error(t('auditForm.errorFullUrl'));
      return;
    }
    setLoading(true);
    const interval = simulateProgress();

    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: targetUrl }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      // Example static tips per view
      data.desktop.tips = [
        'Avoid large layout shifts – 1 layout shift found',
        'Reduce unused JavaScript – Est savings of 189 KiB',
        'Properly size images – Est savings of 17 KiB',
      ];
      data.mobile.tips = [
        'Minify JavaScript – Est savings of 29 KiB',
        'Avoid serving legacy JavaScript – Est savings of 13 KiB',
      ];

      setResult(data);
      setStep('email');
    } catch (err: any) {
      toast.error(err.message || t('auditForm.errorAuditFailed'));
    } finally {
      setLoading(false);
      clearInterval(interval);
    }
  };

  const handleEmailSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error(t('auditForm.errorValidEmail'));
      return;
    }
    try {
      const clientId = process.env.NEXT_PUBLIC_CLIENT_ID!;
      const todayStart = Timestamp.fromDate(
        new Date(
          Date.UTC(
            new Date().getUTCFullYear(),
            new Date().getUTCMonth(),
            new Date().getUTCDate()
          )
        )
      );
      const leadsRef = collectionGroup(db, 'leads');
      const q = query(
        leadsRef,
        where('clientId', '==', clientId),
        where('email', '==', email),
        where('createdAt', '>=', todayStart)
      );
      const snapshot = await getDocs(q);
      if (snapshot.size >= 2) {
        toast.error(t('auditForm.errorLimit'));
        return;
      }
      await fetch('/api/save-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, email }),
      });
      setStep('results');
    } catch (err: any) {
      toast.error(t('auditForm.errorSaveEmail'));
    }
  };

  const handleRetry = async () => {
    setStep('form');
    await handleSubmit();
  };

  const getColor = (value: number) => {
    if (value >= 90) return 'text-green-500';
    if (value >= 70) return 'text-yellow-500';
    if (value >= 50) return 'text-orange-500';
    return 'text-red-500';
  };

  const renderScoreCircle = (label: string, value: number) => (
    <div className='flex flex-col items-center'>
      <div className='relative w-16 h-16'>
        <svg className='w-full h-full' viewBox='0 0 36 36'>
          <circle
            cx='18'
            cy='18'
            r='15.9155'
            fill='none'
            stroke='currentColor'
            className='text-gray-300'
            strokeWidth='2'
          />
          <circle
            cx='18'
            cy='18'
            r='15.9155'
            fill='none'
            stroke='currentColor'
            className={getColor(value)}
            strokeDasharray={`${value} ${100 - value}`}
            strokeDashoffset='25'
            strokeWidth='2'
          />
        </svg>
        <div className='absolute inset-0 flex items-center justify-center text-sm font-bold'>
          {value}
        </div>
      </div>
      <span className='mt-2 text-sm'>{label}</span>
    </div>
  );

  return (
    <div className='max-w-xl mx-auto mt-12 p-6 bg-white/40 backdrop-blur-xl rounded-3xl shadow-xl'>
      <h2 className='text-xl font-bold mb-4 text-center text-gray-600'>
        {t('auditForm.alreadyHaveWebsite')}
      </h2>
      <p className='text-center pb-4 text-gray-500'>
        {t('auditForm.auditHelp')}
      </p>

      {step === 'form' && (
        <>
          <input
            type='text'
            placeholder={t('auditForm.enterUrl')}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className='w-full p-3 rounded-3xl bg-white text-black mb-4 border border-gray-300 text-center'
          />
          {loading && (
            <>
              <p className='text-center text-sm text-primary font-medium mb-2'>
                {t('auditForm.analysing')}
                {dots}
              </p>
              <div className='w-full h-2 bg-white/20 rounded-3xl overflow-hidden mb-3'>
                <div
                  className='h-2 bg-primary rounded-3xl transition-all duration-100 ease-linear'
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </>
          )}
          <button
            type='button'
            onClick={handleSubmit}
            disabled={loading || !url.trim()}
            className='bg-primary text-white px-6 py-2 rounded-3xl w-full'
          >
            {t('auditForm.runAudit')}
          </button>
        </>
      )}

      {step === 'email' && (
        <>
          <p className='text-primary mb-2 text-sm text-center'>
            {t('auditForm.enterEmail')}
          </p>
          <input
            type='email'
            placeholder={t('auditForm.yourEmail')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full p-3 rounded-lg bg-white text-black mb-4 border border-gray-300 text-center'
          />
          <button
            onClick={handleEmailSubmit}
            className='bg-primary text-white px-6 py-2 rounded-3xl w-full'
          >
            {t('auditForm.seeResults')}
          </button>
        </>
      )}

      {step === 'results' && result && (
        <div className='text-gray-500 mt-6 space-y-6'>
          <h3 className='font-bold text-lg mb-2 text-center'>
            {t('auditForm.resultsFor')} {url}
          </h3>

          <div className='flex justify-center gap-4'>
            <button
              onClick={() => setView('desktop')}
              className={`p-2 rounded-full ${
                view === 'desktop'
                  ? 'bg-primary text-white'
                  : 'bg-white/10 text-gray-300'
              }`}
            >
              <Monitor className='w-5 h-5' />
            </button>
            <button
              onClick={() => setView('mobile')}
              className={`p-2 rounded-full ${
                view === 'mobile'
                  ? 'bg-primary text-white'
                  : 'bg-white/10 text-gray-300'
              }`}
            >
              <Smartphone className='w-5 h-5' />
            </button>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            {renderScoreCircle(
              t('auditForm.performance'),
              result[view].performance
            )}
            {renderScoreCircle(
              t('auditForm.accessibility'),
              result[view].accessibility
            )}
            {renderScoreCircle(
              t('auditForm.bestPractices'),
              result[view].bestPractices
            )}
            {renderScoreCircle(t('auditForm.seo'), result[view].seo)}
          </div>

          <div className='mt-6 text-center'>
            <h4 className='text-lg font-semibold mb-2'>
              {t('auditForm.optimizationTips')}
            </h4>
            <ul className='list-disc pl-5 text-sm text-gray-500/90 space-y-1 text-left'>
              {result[view].tips?.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>

          <button
            onClick={handleRetry}
            className='flex items-center gap-2 bg-primary text-white font-medium px-4 py-2 rounded-3xl mt-6 hover:bg-primary/70 transition-all mx-auto'
          >
            <Repeat className='w-4 h-4' />
            {t('auditForm.retry')}
          </button>
        </div>
      )}
    </div>
  );
}
