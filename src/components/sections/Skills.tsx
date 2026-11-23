import React from 'react';
import { resume } from '@/data/resume';

export function Skills() {
  // Light colours, with dark: variants for the dark theme
  const titleClass = 'text-gray-900 dark:text-white';
  const pillClass = 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  
  return (
    <section className="w-full max-w-[95%] sm:max-w-2xl md:max-w-3xl mx-auto py-12 md:py-16 px-4 sm:px-6 md:px-8">
      <h2 className={`text-3xl font-serif mb-4 transition-colors ${titleClass}`}>
        Skills
      </h2>
      <div className="flex flex-wrap gap-2">
        {resume.skills.map((s, i) => (
          <span 
            key={i} 
            className={`px-3 py-1 rounded-full text-sm transition-colors ${pillClass}`}
          >
            {s}
          </span>
        ))}
      </div>
    </section>
  );
}
