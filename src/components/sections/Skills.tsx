import React from 'react';
import { resume } from '@/data/resume';

interface SkillsProps {
  mode?: 'dark' | 'light';
}

export function Skills({ mode = 'dark' }: SkillsProps) {
  // Define text and background classes based on mode
  const titleClass = mode === 'dark' ? 'text-white' : 'text-gray-900';
  const pillClass = mode === 'dark' 
    ? 'bg-gray-700 text-gray-200' 
    : 'bg-gray-200 text-gray-800';
  
  return (
    <section className="max-w-3xl mx-auto py-16">
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
