import React from 'react';
import { resume } from '@/data/resume';

interface ExperienceProps {
  mode: 'dark' | 'light';
}

export function Experience({ mode }: ExperienceProps) {
  // Define text classes based on mode
  const titleClass = mode === 'dark' ? 'text-white' : 'text-gray-900';
  const subtitleClass = mode === 'dark' ? 'text-gray-100' : 'text-gray-800';
  const detailClass = mode === 'dark' ? 'text-gray-300' : 'text-gray-700';
  const dateClass = mode === 'dark' ? 'text-gray-400' : 'text-gray-500';
  const locationClass = mode === 'dark' ? 'text-gray-400' : 'text-gray-600';
  
  return (
    <section className="w-full max-w-[95%] sm:max-w-2xl md:max-w-3xl mx-auto py-12 md:py-16 px-4 sm:px-6 md:px-8">
      <h2 className={`text-3xl font-serif mb-6 transition-colors ${titleClass}`}>
        Experience
      </h2>
      <div className="space-y-8">
        {resume.experience.map((exp, i) => (
          <div key={i}>
            <h3 className={`text-xl font-semibold transition-colors ${subtitleClass}`}>
              {exp.title}
            </h3>
            <div className="flex justify-between items-center">
              <span className={`text-sm transition-colors ${dateClass}`}>
                {exp.date}
              </span>
              {exp.location && (
                <span className={`text-sm transition-colors ${locationClass}`}>
                  {exp.location}
                </span>
              )}
            </div>
            <ul className="list-disc list-inside mt-2">
              {exp.details.map((d, j) => (
                <li key={j} className={`transition-colors ${detailClass}`}>
                  {d}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
