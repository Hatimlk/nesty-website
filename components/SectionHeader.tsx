import React from 'react';

interface Props {
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}

const SectionHeader: React.FC<Props> = ({ title, subtitle, center = true, light = false }) => {
  return (
    <div className={`mb-12 ${center ? 'text-center' : 'text-left'}`}>
      <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${light ? 'text-white' : 'text-nesty-dark'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg max-w-2xl ${center ? 'mx-auto' : ''} ${light ? 'text-gray-300' : 'text-gray-600'}`}>
          {subtitle}
        </p>
      )}
      <div className={`h-1.5 w-24 bg-nesty-accent rounded-full mt-6 ${center ? 'mx-auto' : ''}`}></div>
    </div>
  );
};

export default SectionHeader;