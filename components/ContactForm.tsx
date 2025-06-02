import React, { useState, ChangeEvent, FormEvent } from 'react';
import toast from 'react-hot-toast';
import Spinner from './Spinner';
import { AiOutlineArrowRight } from 'react-icons/ai';

const CongratulationTable = () => (
  <div className='max-w-md mx-auto mt-8 p-6 bg-green-700 rounded-2xl shadow-xl text-white text-center'>
    <h2 className='text-3xl font-semibold mb-6'>Congratulations!</h2>
    <p>Your form has been submitted successfully.</p>
    <p className='mt-2'>
      Soon we will contact you and will answer to all your questions.
    </p>
    <p className='mt-2'>Thank you for reaching us out!</p>
  </div>
);

const ContactForm: React.FC = () => {
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
      toast.error('Enter a valid phone number.', {
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
        setName('');
        setPhoneNumber('');
        setSubject('');
        setMessage('');
        setClientEmail('');
        toast.success('Message sent successfully!', {
          duration: 3000,
          position: 'top-center',
        });
        setFormSubmitted(true);
      } else {
        toast.error('Failed to send message.');
      }
    } catch (error) {
      console.error('Send error:', error);
      toast.error('An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  if (formSubmitted) return <CongratulationTable />;

  return (
    <div className='shadow-2xl max-w-3xl mx-auto  p-8 backdrop-blur-md bg-white/20  rounded-2xl'>
      <h2 className='text-2xl font-semibold text-center text-gray-600 mb-2'>
        Get in Touch
      </h2>
      <p className='text-center text-gray-500 mb-6'>
        Have a question? Feel free to contact us!
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
          placeholder='Name*'
          value={name}
          onChange={handleChange(setName)}
          required
          className='p-2 rounded-xl bg-white/70 text-gray-800 border border-gray-300'
        />
        <input
          type='text'
          placeholder='Phone number*'
          value={phoneNumber}
          onChange={handleChange(setPhoneNumber)}
          required
          className='p-2 rounded-xl bg-white/70 text-gray-800 border border-gray-300'
        />
        <input
          type='text'
          placeholder='Subject*'
          value={subject}
          onChange={handleChange(setSubject)}
          required
          className='p-2 rounded-xl bg-white/70 text-gray-800 border border-gray-300'
        />
        <input
          type='email'
          placeholder='Email*'
          value={clientEmail}
          onChange={handleChange(setClientEmail)}
          required
          className='p-2 rounded-xl bg-white/70 text-gray-800 border border-gray-300'
        />
        <textarea
          placeholder='Message*'
          value={message}
          onChange={handleChange(setMessage)}
          required
          rows={4}
          className='md:col-span-2 p-2 rounded-xl bg-white/70 text-gray-800 border border-gray-300'
        ></textarea>
        <p className='md:col-span-2 text-center text-sm text-gray-600'>
          * All fields are required
        </p>
        <div className='md:col-span-2 flex justify-center'>
          <button
            type='submit'
            className='flex items-center gap-2 px-6 py-2 bg-green-700 text-white rounded-xl hover:bg-green-600 transition'
          >
            Send <AiOutlineArrowRight />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
