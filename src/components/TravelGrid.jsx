import React from 'react'

const Polaroid = ({ imageSrc, caption, align }) => {
  // Asymmetrical alignment logic
  const alignClass = 
    align === 'top' ? 'mt-0 mb-32' : 
    align === 'bottom' ? 'mt-32 mb-0' : 
    'mt-16 mb-16'

  return (
    <div className={`flex flex-col bg-white p-4 shadow-xl border border-gray-100 ${alignClass} hover:-translate-y-2 transition-transform duration-500 ease-out`}>
      <div className="overflow-hidden bg-gray-200 aspect-[4/5]">
        <img 
          src={imageSrc} 
          alt="polaroid" 
          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
        />
      </div>
      <div className="mt-6 mb-2 text-center">
        <p data-testid="polaroid-caption" className="font-poetry text-3xl text-text-primary/90 tracking-wide">
          {caption}
        </p>
      </div>
    </div>
  )
}

const TravelGrid = () => {
  const polaroids = [
    {
      id: 1,
      imageSrc: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800",
      caption: "Dubai",
      align: "bottom"
    },
    {
      id: 2,
      imageSrc: "https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&q=80&w=800",
      caption: "London",
      align: "top"
    },
    {
      id: 3,
      imageSrc: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800",
      caption: "Paris",
      align: "center"
    }
  ]

  return (
    <section className="py-32 px-6 md:px-12 lg:px-32 bg-[#F2F1EC]">
      <div className="max-w-7xl mx-auto">
        <div className="text-right mb-24 md:w-2/3 ml-auto">
          <h2 className="font-display text-4xl md:text-6xl text-text-primary uppercase leading-tight">
            The 14-City <br />
            <span className="text-accent-blue italic">Resolution</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16 pt-[100px]">
          {polaroids.map((item) => (
            <Polaroid 
              key={item.id}
              imageSrc={item.imageSrc}
              caption={item.caption}
              align={item.align}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TravelGrid
