import React, { useState, ChangeEvent, FormEvent } from 'react';
import toast from 'react-hot-toast';
import Spinner from './Spinner';
import { AiOutlineArrowRight } from 'react-icons/ai';
import useTranslation from 'next-translate/useTranslation';

const CongratulationTable = () => {
  const { t } = useTranslation('common');
  return (
    <div className='max-w-md mx-auto mt-8 p-6 bg-green-700 rounded-2xl shadow-xl text-white text-center'>
      <h2 className='text-3xl font-semibold mb-6'>
        {t('contactForm.success')}
      </h2>
      <p>{t('contactForm.successDesc')}</p>
      <p className='mt-2'>{t('contactForm.successThanks')}</p>
    </div>
  );
};

const ContactForm: React.FC = () => {
  const { t } = useTranslation('common');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setter(e.target.value);
      if (!e.target.value.trim()) {
        e.target.setCustomValidity('Required field');
      } else {
        e.target.setCustomValidity('');
      }
    };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const phoneRegex = /^[+]?[0-9]*$/;
    if (!phoneRegex.test(phoneNumber)) {
      toast.error(t('contactForm.invalidPhone'), {
        duration: 3000,
        position: 'top-center',
      });
      setLoading(false);
      return;
    }

    const formData = { name, phoneNumber, subject, message, clientEmail };

    try {
      const response = await fetch('/api/submitForm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // ✅ Clear fields
        setName('');
        setPhoneNumber('');
        setSubject('');
        setMessage('');
        setClientEmail('');

        toast.success(t('contactForm.success'), {
          duration: 1500,
          position: 'top-center',
        });

        // ✅ Redirect to success page for Google Ads tracking
        setTimeout(() => {
          window.location.href = '/contact-success';
        }, 1500);
      } else {
        toast.error(t('contactForm.fail'));
      }
    } catch (error) {
      console.error('Send error:', error);
      toast.error(t('contactForm.error'));
    } finally {
      setLoading(false);
    }
  };

  if (formSubmitted) return <CongratulationTable />;

  return (
    <div className='shadow-2xl max-w-3xl mx-auto  p-8 backdrop-blur-md bg-white/20  rounded-2xl'>
      <h2 className='text-2xl font-semibold text-center text-gray-600 mb-2'>
        {t('contactForm.getInTouch')}
      </h2>
      <p className='text-center text-gray-500 mb-6'>
        {t('contactForm.haveQuestion')}
      </p>
      {loading && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40'>
          <Spinner />
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className='grid grid-cols-1 md:grid-cols-2 gap-4'
      >
        <input
          type='text'
          placeholder={t('contactForm.name')}
          value={name}
          onChange={handleChange(setName)}
          required
          className='p-2 rounded-xl bg-white/70 text-gray-800 border border-gray-300'
        />
        <input
          type='text'
          placeholder={t('contactForm.phone')}
          value={phoneNumber}
          onChange={handleChange(setPhoneNumber)}
          required
          className='p-2 rounded-xl bg-white/70 text-gray-800 border border-gray-300'
        />
        <input
          type='text'
          placeholder={t('contactForm.subject')}
          value={subject}
          onChange={handleChange(setSubject)}
          required
          className='p-2 rounded-xl bg-white/70 text-gray-800 border border-gray-300'
        />
        <input
          type='email'
          placeholder={t('contactForm.email')}
          value={clientEmail}
          onChange={handleChange(setClientEmail)}
          required
          className='p-2 rounded-xl bg-white/70 text-gray-800 border border-gray-300'
        />
        <textarea
          placeholder={t('contactForm.message')}
          value={message}
          onChange={handleChange(setMessage)}
          required
          rows={4}
          className='md:col-span-2 p-2 rounded-xl bg-white/70 text-gray-800 border border-gray-300'
        ></textarea>
        <p className='md:col-span-2 text-center text-sm text-gray-600'>
          {t('contactForm.allFields')}
        </p>
        <div className='md:col-span-2 flex justify-center'>
          <button
            type='submit'
            className='flex items-center gap-2 px-6 py-2 bg-green-700 text-white rounded-xl hover:bg-green-600 transition'
          >
            {t('contactForm.send')} <AiOutlineArrowRight />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
