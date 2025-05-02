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
    <section className="max-w-3xl mx-auto py-16">
      <h2 className={`text-3xl font-serif mb-4 transition-colors ${titleClass}`}>
        About
      </h2>
      <p className={`leading-relaxed transition-colors ${textClass}`}>
        {resume.about}
      </p>
    </section>
  );
}
