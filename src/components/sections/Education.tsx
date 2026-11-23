import React from 'react';
import { resume } from '@/data/resume';

export function Education() {
  // Light colours, with dark: variants for the dark theme
  const titleClass = 'text-gray-900 dark:text-white';
  const institutionClass = 'text-gray-800 dark:text-gray-100';
  const degreeClass = 'text-gray-700 dark:text-gray-200';
  const dateClass = 'text-gray-500 dark:text-gray-400';
  const detailClass = 'text-gray-600 dark:text-gray-400';
  
  return (
    <section className="w-full max-w-[95%] sm:max-w-2xl md:max-w-3xl mx-auto py-12 md:py-16 px-4 sm:px-6 md:px-8">
      <h2 className={`text-3xl font-serif mb-6 transition-colors ${titleClass}`}>
        Education
      </h2>
      <div className="space-y-8">
        {resume.education.map((edu, i) => (
          <div key={i}>
            <h3 className={`text-xl font-semibold transition-colors ${institutionClass}`}>
              {edu.institution}
            </h3>
            <p className={`font-medium transition-colors ${degreeClass}`}>
              {edu.degree}
            </p>
            <span className={`text-sm transition-colors ${dateClass}`}>
              {edu.date}
            </span>
            {edu.details && (
              <ul className="list-disc list-inside mt-2">
                {edu.details.map((d, j) => (
                  <li key={j} className={`transition-colors ${detailClass}`}>
                    {d}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
