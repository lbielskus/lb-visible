import Link from 'next/link';

export default function ErrorPage() {
  return (
    <>
      <div className='grid h-screen px-4  place-content-center'>
        <div className='text-center'>
          <h1 className='font-black text-primary text-9xl'>404</h1>

          <p className='text-2xl font-bold tracking-tight text-gray-600 sm:text-4xl'>
            Damn! 😔
          </p>

          <p className='mt-4 text-gray-500'>We can&apos;t find that page.</p>

          <Link
            href='/'
            className='inline-block px-5 py-3 mt-6 text-sm font-medium text-gray-200 bg-primary rounded hover:bg-primary focus:outline-none focus:ring'
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </>
  );
}
