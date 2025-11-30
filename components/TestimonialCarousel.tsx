import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useData } from '../context/DataContext';

const TestimonialCarousel: React.FC = () => {
  const { testimonials } = useData();
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    if (testimonials.length > 0) {
      setCurrent(current === testimonials.length - 1 ? 0 : current + 1);
    }
  };

  const prevSlide = () => {
    if (testimonials.length > 0) {
      setCurrent(current === 0 ? testimonials.length - 1 : current - 1);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, 6000); 
    return () => clearTimeout(timer);
  }, [current, testimonials]);

  if (!Array.isArray(testimonials) || testimonials.length <= 0) {
    return null;
  }

  return (
    <div className="relative max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 mt-8 border border-slate-100">
      {/* Decorative Quote Icon */}
      <div className="absolute top-6 left-8 text-nesty-accent/20 z-0">
        <Quote size={80} className="transform -scale-x-100" />
      </div>

      {/* CSS Grid Stack Container */}
      <div className="relative z-10 grid grid-cols-1 grid-rows-1 min-h-[320px]">
        {testimonials.map((testimonial, index) => {
          const isActive = index === current;
          return (
            <div
              key={testimonial.id}
              className={`col-start-1 row-start-1 flex flex-col items-center justify-center text-center transition-all duration-700 ease-out transform ${
                isActive 
                  ? 'opacity-100 translate-y-0 scale-100 z-10 pointer-events-auto' 
                  : 'opacity-0 translate-y-8 scale-95 z-0 pointer-events-none' 
              }`}
            >
                {/* Avatar - Delay 100ms */}
                <div className={`mb-6 relative transition-all duration-700 delay-100 ease-out ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-nesty-light shadow-md mx-auto">
                    <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-nesty-accent text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">
                     {testimonial.rating}.0
                  </div>
                </div>

                {/* Stars - Delay 200ms */}
                <div className={`flex gap-1 mb-6 justify-center text-yellow-400 transition-all duration-700 delay-200 ease-out ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill={i < testimonial.rating ? "currentColor" : "none"} className={i < testimonial.rating ? "" : "text-gray-300"} />
                  ))}
                </div>

                {/* Quote - Delay 300ms */}
                <p className={`text-xl md:text-2xl text-nesty-dark italic mb-6 font-medium leading-relaxed transition-all duration-700 delay-300 ease-out ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  "{testimonial.content}"
                </p>

                {/* Author - Delay 500ms */}
                <div className={`transition-all duration-700 delay-500 ease-out ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <h4 className="font-bold text-nesty-dark text-lg">{testimonial.name}</h4>
                  <p className="text-nesty-accent font-semibold text-sm uppercase tracking-wide">{testimonial.role}</p>
                </div>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="flex justify-between absolute top-1/2 -translate-y-1/2 left-2 right-2 md:-left-12 md:-right-12 z-20 pointer-events-none">
        <button 
            onClick={prevSlide} 
            className="bg-white text-nesty-dark p-3 rounded-full shadow-lg hover:bg-nesty-accent hover:text-white transition pointer-events-auto border border-gray-100 group outline-none transform hover:scale-110"
            aria-label="Previous testimonial"
        >
            <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition" />
        </button>
        <button 
            onClick={nextSlide} 
            className="bg-white text-nesty-dark p-3 rounded-full shadow-lg hover:bg-nesty-accent hover:text-white transition pointer-events-auto border border-gray-100 group outline-none transform hover:scale-110"
            aria-label="Next testimonial"
        >
            <ChevronRight size={24} className="group-hover:translate-x-0.5 transition" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === current ? 'bg-nesty-accent w-8' : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
