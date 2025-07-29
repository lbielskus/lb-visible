import { useRouter } from 'next/router';

const flags = {
  en: (
    <svg
      width='28'
      height='20'
      viewBox='0 0 28 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect width='28' height='20' rx='3' fill='#012169' />
      <path d='M0 0L28 20M28 0L0 20' stroke='#fff' strokeWidth='3' />
      <path d='M0 0L28 20M28 0L0 20' stroke='#C8102E' strokeWidth='2' />
      <rect x='11.2' width='5.6' height='20' fill='#fff' />
      <rect y='7.2' width='28' height='5.6' fill='#fff' />
      <rect x='12.4' width='3.2' height='20' fill='#C8102E' />
      <rect y='8.4' width='28' height='3.2' fill='#C8102E' />
    </svg>
  ),
  lt: (
    <svg
      width='28'
      height='20'
      viewBox='0 0 28 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect width='28' height='20' rx='3' fill='#FDB913' />
      <rect y='6.67' width='28' height='6.66' fill='#006A44' />
      <rect y='13.33' width='28' height='6.67' fill='#C1272D' />
    </svg>
  ),
};

export default function LanguageSwitcher() {
  const router = useRouter();
  const { locale, asPath } = router;
  const switchTo = locale === 'en' ? 'lt' : 'en';
  const flagLocale = locale === 'lt' || locale === 'en' ? locale : 'en';

  return (
    <button
      onClick={() => router.push(asPath, asPath, { locale: switchTo })}
      aria-label={
        switchTo === 'en' ? 'Switch to English' : 'Perjungti į lietuvių kalbą'
      }
      className='ml-2 flex items-center justify-center rounded-md border border-white/20 bg-white/10 hover:bg-white/20 transition p-1 shadow'
      style={{ width: 32, height: 24 }}
      type='button'
    >
      {flags[flagLocale]}
    </button>
  );
}
