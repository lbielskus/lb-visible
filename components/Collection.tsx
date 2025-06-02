import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../types';

interface Props {
  product: Product;
}

const formatPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const Collection: React.FC<Props> = ({ product }) => {
  if (!product) return null;

  return (
    <section className='py-12 px-4 sm:px-8'>
      <div className='max-w-screen-2xl mx-auto'>
        <header className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-gray-700'>New Collection</h2>
          <p className='text-gray-500 mt-2 max-w-lg mx-auto'>
            Explore our latest arrivals and elevate your style with our
            exclusive new collection.
          </p>
        </header>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch'>
          {/* Product Info */}
          <div className='rounded-2xl backdrop-blur-md bg-white/30 border border-primary border-opacity-20 shadow-xl p-6 flex flex-col justify-center'>
            <h3 className='text-2xl font-bold text-gray-800 mb-4'>
              {product.title}
            </h3>
            <p className='text-gray-600 mb-4'>
              {typeof product.description === 'string'
                ? product.description
                : 'No description available.'}
            </p>
            <p className='text-lg text-primary font-bold mb-6'>
              € {formatPrice(Number(product.price))}
            </p>
            <Link
              href='/products'
              className='text-center inline-block px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-opacity-90 transition-all'
            >
              Shop All
            </Link>
          </div>

          {/* Product Images */}
          <div className='lg:col-span-2 grid grid-cols-2 gap-4'>
            {[product.gallery?.[0], product.gallery?.[1]]
              .filter(Boolean)
              .map((img, idx) => (
                <div
                  key={idx}
                  className='relative w-full aspect-square rounded-lg overflow-hidden'
                >
                  <Image
                    src={img!}
                    alt={`Product ${idx + 1}`}
                    fill
                    className='object-cover rounded-lg'
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collection;
