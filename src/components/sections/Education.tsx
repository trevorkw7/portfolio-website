import React from 'react';
import { resume } from '@/data/resume';

interface EducationProps {
  mode: 'dark' | 'light';
}

export function Education({ mode }: EducationProps) {
  // Define text classes based on mode
  const titleClass = mode === 'dark' ? 'text-white' : 'text-gray-900';
  const institutionClass = mode === 'dark' ? 'text-gray-100' : 'text-gray-800';
  const degreeClass = mode === 'dark' ? 'text-gray-200' : 'text-gray-700';
  const dateClass = mode === 'dark' ? 'text-gray-400' : 'text-gray-500';
  const detailClass = mode === 'dark' ? 'text-gray-400' : 'text-gray-600';
  
  return (
    <section className="max-w-3xl mx-auto py-16">
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
