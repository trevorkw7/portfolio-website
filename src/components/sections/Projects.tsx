import React from 'react';
import { resume } from '@/data/resume';

interface ProjectsProps {
  mode: 'dark' | 'light';
}

export function Projects({ mode }: ProjectsProps) {
  // Define text classes based on mode
  const titleClass = mode === 'dark' ? 'text-white' : 'text-gray-900';
  const subtitleClass = mode === 'dark' ? 'text-gray-100' : 'text-gray-800';
  const techClass = mode === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const descClass = mode === 'dark' ? 'text-gray-200' : 'text-gray-700';
  const linkClass = mode === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-green-600 hover:text-green-800';
  
  return (
    <section className="w-full max-w-[95%] sm:max-w-2xl md:max-w-3xl mx-auto py-12 md:py-16 px-4 sm:px-6 md:px-8">
      <h2 className={`text-3xl font-serif mb-6 transition-colors ${titleClass}`}>
        Projects
      </h2>
      <div className="space-y-6">
        {resume.projects.map((p, i) => (
          <div key={i}>
            <h3 className={`text-xl font-semibold transition-colors ${subtitleClass}`}>
              {p.link ? (
                <a 
                  href={p.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`${linkClass} hover:underline flex items-center transition-colors`}
                >
                  {p.name}
                  <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                  </svg>
                </a>
              ) : (
                p.name
              )}
            </h3>
            <p className={`italic transition-colors ${techClass}`}>
              {p.tech}
            </p>
            <p className={`mt-1 transition-colors ${descClass}`}>
              {p.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
