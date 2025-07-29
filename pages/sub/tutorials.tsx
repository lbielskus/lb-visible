'use client';

import Link from 'next/link';
import Layout from '../../components/Layout';
import useTranslation from 'next-translate/useTranslation';
import SEOHead from '../../components/SEOHead';

const Tutorials = () => {
  const { t, lang } = useTranslation('common');

  return (
    <Layout>
      <SEOHead
        title={
          lang === 'lt' ? t('tutorials.pageTitle') : 'Tutorials | LB Websites'
        }
        description={
          lang === 'lt'
            ? t('tutorials.description')
            : 'Step-by-step tutorials for ordering websites and using the CMS from LB Websites.'
        }
        keywords='tutorials, guides, website management, CMS, content management, LB Websites tutorials'
        canonicalUrl={lang === 'lt' ? '/lt/sub/tutorials' : '/sub/tutorials'}
        lang={lang}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name:
            lang === 'lt'
              ? t('tutorials.pageTitle')
              : 'Tutorials | LB Websites',
          description:
            lang === 'lt'
              ? t('tutorials.description')
              : 'Step-by-step tutorials for ordering websites and using the CMS from LB Websites.',
          url: `https://www.lbvisible.com${
            lang === 'lt' ? '/lt/sub/tutorials' : '/sub/tutorials'
          }`,
          inLanguage: lang === 'lt' ? 'lt' : 'en',
        }}
      />

      <section className='w-full px-4 sm:px-6 py-12 text-gray-200 max-w-3xl mx-auto rounded-3xl mt-12 shadow-xl backdrop-blur-sm bg-[rgba(15,23,42,0.82)]'>
        <h1 className='text-xl font-bold text-center text-gray-200 mb-6'>
          {lang === 'lt' ? t('tutorials.heading') : 'Tutorials'}
        </h1>
        <p className='text-md text-center mb-10 text-gray-300'>
          {lang === 'lt'
            ? t('tutorials.subtitle')
            : "New to LB Websites? Here's how to get started with ordering your service and managing your site with ease."}
        </p>

        <div className='space-y-10 text-sm  text-gray-300'>
          <div>
            <h2 className='text-lg font-semibold text-white mb-2'>
              🛒{' '}
              {lang === 'lt'
                ? 'Kaip užsakyti svetainę'
                : 'How to Order a Website'}
            </h2>
            <ol className='list-decimal list-inside space-y-3'>
              <li>
                {lang === 'lt' ? 'Eikite į ' : 'Go to the '}
                <span className='font-semibold text-white'>
                  {lang === 'lt' ? 'Kainos' : 'Pricing'}
                </span>{' '}
                {lang === 'lt'
                  ? 'puslapį ir pasirinkite planą, kuris geriausiai tinka jūsų verslui (Pradedantiesiems, Pažengusiems, Verslui).'
                  : 'page and choose the plan that best suits your business (Beginner, Advanced, Business).'}
              </li>
              <li>
                {lang === 'lt' ? 'Spustelėkite ' : 'Click '}
                <span className='font-semibold text-white'>
                  {lang === 'lt' ? '"Užsakyti dabar"' : '"Order Now"'}
                </span>{' '}
                {lang === 'lt'
                  ? 'ir pereikite prie apmokėjimo. Mokėjimai saugiai apdorojami per Stripe.'
                  : 'and proceed to checkout. Payments are securely processed via Stripe.'}
              </li>
              <li>
                {lang === 'lt'
                  ? 'Po pirkimo užpildykite projekto aprašymą su savo prekės ženklo informacija, turiniu ir nuostatomis.'
                  : 'After purchase, fill out the project brief with your brand info, content, and preferences.'}
              </li>
              <li>
                {lang === 'lt'
                  ? 'Gausite patvirtinimą ir pradėsime kūrimą nedelsiant.'
                  : "You'll get a confirmation and we'll begin development immediately."}
              </li>
            </ol>
          </div>

          <div>
            <h2 className='text-lg font-semibold text-white mb-2'>
              ⚙️{' '}
              {lang === 'lt'
                ? 'Kaip valdyti savo svetainę (TVS prieiga)'
                : 'How to Manage Your Site (CMS Access)'}
            </h2>
            <ol className='list-decimal list-inside space-y-3'>
              <li>
                {lang === 'lt'
                  ? 'Prisijunkite naudodami savo el. paštą ir slaptažodį iš svetainės klientų srities.'
                  : "Log in using your email and password from the website's client area."}
              </li>
              <li>
                {lang === 'lt'
                  ? 'Eikite į TVS skydelį valdyti:'
                  : 'Navigate to the CMS dashboard to manage:'}
                <ul className='list-disc list-inside ml-4 mt-2 space-y-1'>
                  <li>
                    {lang === 'lt'
                      ? 'Produktus ir kainas'
                      : 'Products and pricing'}
                  </li>
                  <li>
                    {lang === 'lt' ? 'Tinklaraščio įrašus' : 'Blog posts'}
                  </li>
                  <li>
                    {lang === 'lt'
                      ? 'Kategorijas ir banerus'
                      : 'Categories and banners'}
                  </li>
                  <li>
                    {lang === 'lt'
                      ? 'Užsakymus ir klientų informaciją'
                      : 'Orders & customer info'}
                  </li>
                </ul>
              </li>
              <li>
                {lang === 'lt'
                  ? 'Atnaujinkite bet kada. Pakeitimai išsaugomi realiu laiku ir iškart matomi jūsų gyvoje svetainėje.'
                  : 'Make updates anytime. Changes are saved in real-time and instantly visible on your live website.'}
              </li>
              <li>
                {lang === 'lt'
                  ? 'Reikia pagalbos? Susisiekite su mumis per '
                  : 'Need help? Contact us via the '}
                <Link
                  href='/contact'
                  className='text-primary font-medium hover:underline'
                >
                  {lang === 'lt' ? t('footer.support') : 'Support'}
                </Link>{' '}
                {lang === 'lt' ? 'puslapį bet kada.' : 'page anytime.'}
              </li>
            </ol>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Tutorials;
