import React from 'react';

const SectionTitle = ({ subtitle, title, centered = false }) => {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      {subtitle && (
        <span className="text-gold font-bold uppercase tracking-widest text-sm block mb-2">
          {subtitle}
        </span>
      )}
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
        {title}
      </h2>
    </div>
  );
};

export default SectionTitle;
