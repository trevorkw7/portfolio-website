import React from 'react';
import { resume } from '@/data/resume';

interface AboutProps {
  mode: 'dark' | 'light';
}

export function About({ mode }: AboutProps) {
  // Define text classes based on mode
  const titleClass = mode === 'dark' ? 'text-white' : 'text-gray-900';
  const textClass = mode === 'dark' ? 'text-gray-200' : 'text-gray-700';
  
  return (
    <section className="w-full max-w-[95%] sm:max-w-2xl md:max-w-3xl mx-auto py-12 md:py-16 px-4 sm:px-6 md:px-8">
      <h2 className={`text-3xl font-serif mb-4 transition-colors ${titleClass}`}>
        About
      </h2>
      <p className={`leading-relaxed transition-colors ${textClass}`}>
        {resume.about}
      </p>
    </section>
  );
}
