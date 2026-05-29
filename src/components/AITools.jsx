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
    <div className="relative z-40 -mt-[10vh] pt-[10vh] bg-gradient-to-t from-[#0a0f16] via-[#0a0f16]/90 to-transparent pb-24 w-full">
      <div
        ref={stripRef}
        className={`grid grid-cols-2 md:grid-cols-5 gap-4 w-full opacity-0 translate-y-24 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isIntersecting ? 'opacity-100 translate-y-0' : ''
        }`}
      >
        {tools.map((tool) => (
          <a
            key={tool.name}
            href={tool.link}
            className="group relative overflow-hidden rounded-2xl w-full aspect-[3/4] cursor-pointer transition-all duration-500 ease-out hover:scale-[1.03] hover:shadow-2xl hover:shadow-cyan-500/10 bg-[#0f172a] border border-white/5"
          >
            <img
              src={tool.image}
              alt={tool.name}
              className="object-cover w-full h-full"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement.style.background = 'linear-gradient(160deg, #0B1A4A, #0992C2)';
              }}
            />
            
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 to-transparent translate-y-full transition-transform duration-500 group-hover:translate-y-0">
              <p className="font-poppins text-[11px] font-medium tracking-[0.2em] text-[#0AC4E0] mb-2 uppercase">{tool.cat}</p>
              <p className="font-fraunces italic font-light text-2xl lg:text-3xl tracking-[-0.015em] text-[#F8F7F4] leading-[1.1] mb-2">{tool.name}</p>
              <p className="font-poppins font-light text-[13px] text-[#F8F7F4]/60 leading-[1.5]">{tool.stat}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default AITools;
