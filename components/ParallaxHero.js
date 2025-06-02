import React from 'react';

const ParallaxHero = ({ imageUrl, title }) => {
  return (
    <div
      className='h-screen flex items-center justify-center'
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1 className='text-white text-5xl font-bold'>{title}</h1>
    </div>
  );
};

export default ParallaxHero;
