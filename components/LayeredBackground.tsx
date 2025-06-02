const LayeredBackground = () => {
  return (
    <div className='absolute inset-0 -z-10 overflow-hidden'>
      <svg
        viewBox='0 0 1440 900'
        preserveAspectRatio='none'
        className='w-full h-[5000px]'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g>
          {/* Lightest at the bottom */}
          <path
            d='M0,450 C350,600 600,500 900,650 C1200,800 1350,700 1440,850 L1440,900 L0,900 Z'
            fill='#f8fafc' // very light pastel (like white)
            opacity='1'
          />
          <path
            d='M0,300 C300,450 500,350 800,500 C1100,650 1300,550 1440,700 L1440,900 L0,900 Z'
            fill='#cbd5e1' // soft bluish-gray
            opacity='0.8'
          />
          <path
            d='M0,150 C250,300 450,200 700,350 C950,500 1200,400 1440,550 L1440,900 L0,900 Z'
            fill='#64748b' // mid tone
            opacity='0.7'
          />
          {/* Darkest at the top */}
          <path
            d='M0,0 C200,150 400,100 600,250 C800,400 1000,300 1440,450 L1440,900 L0,900 Z'
            fill='#0f172a' // darkest navy
            opacity='0.6'
          />
        </g>
      </svg>
    </div>
  );
};

export default LayeredBackground;
