import React, { useRef, useEffect, useState } from 'react';

const AITools = () => {
  const stripRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (stripRef.current) observer.observe(stripRef.current);
    return () => observer.disconnect();
  }, []);

  const tools = [
    { name: 'Triply', image: '/images/work/triply.jpg', cat: 'Travel AI', link: 'https://triply.app', stat: 'Better food picks' },
    { name: 'YC Web', image: '/images/work/ycweb.jpg', cat: 'Brand', link: '#', stat: 'Public presence' },
    { name: 'YC CRM', image: '/images/work/yccrm.jpg', cat: 'CRM', link: '#', stat: 'Pipeline tracking' },
    { name: 'Tradepoint', image: '/images/work/tradepoint.jpg', cat: 'Dev', link: '#', stat: 'Research to prod' },
    { name: 'BingX', image: '/images/work/bingx.jpg', cat: 'Trade', link: '#', stat: 'Trading assistant' },
  ];

  return (
    <section className="relative z-50 -mt-[15vh] pt-[15vh] bg-gradient-to-t from-[#070C18] via-[#070C18]/90 to-transparent w-full flex flex-col items-center pb-[12vw]">
      <div className="w-full px-6 md:px-12 lg:px-24 mx-auto max-w-screen-2xl">
        <div
          ref={stripRef}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full opacity-0 translate-y-24 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isIntersecting ? 'opacity-100 translate-y-0' : ''
          }`}
        >
          {tools.map((tool) => (
            <a
              key={tool.name}
              href={tool.link}
              className="group relative overflow-hidden rounded-2xl w-full h-[300px] cursor-pointer transition-all duration-500 hover:-translate-y-2 border border-white/5 bg-[#0f172a]"
            >
              <img
                src={tool.image}
                alt={tool.name}
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement.style.background = 'linear-gradient(160deg, #0B1A4A, #0992C2)';
                }}
              />
              
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent translate-y-full transition-transform duration-500 group-hover:translate-y-0">
                <p className="font-poppins text-[11px] font-medium tracking-[0.2em] text-[#0AC4E0] mb-2 uppercase">{tool.cat}</p>
                <p className="font-fraunces italic font-light text-2xl lg:text-3xl tracking-[-0.015em] text-[#F8F7F4] leading-[1.1] mb-2">{tool.name}</p>
                <p className="font-poppins font-light text-[13px] text-[#F8F7F4]/60 leading-[1.5]">{tool.stat}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AITools;
