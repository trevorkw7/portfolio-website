import React from 'react';
import { resume } from '@/data/resume';

interface PublicationsProps {
  mode: 'dark' | 'light';
}

export function Publications({ mode }: PublicationsProps) {
  // Define text classes based on mode
  const titleClass = mode === 'dark' ? 'text-white' : 'text-gray-900';
  const authorClass = mode === 'dark' ? 'text-gray-300' : 'text-gray-700';
  const conferenceClass = mode === 'dark' ? 'text-gray-300' : 'text-gray-700';
  const dateClass = mode === 'dark' ? 'text-gray-400' : 'text-gray-500';
  const linkClass = mode === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-green-600 hover:text-green-800';
  
  // Border color based on mode
  const borderClass = mode === 'dark' ? 'border-gray-700' : 'border-gray-200';
  
  return (
    <section className="w-full max-w-[95%] sm:max-w-2xl md:max-w-3xl mx-auto py-12 md:py-16 px-4 sm:px-6 md:px-8">
      <h2 className={`text-3xl font-serif mb-6 transition-colors ${titleClass}`}>
        Publications
      </h2>
      <div className="space-y-6">
        {resume.publications.map((pub, i) => (
          <div key={i} className={`p-4 rounded-lg border ${borderClass}`}>
            <h3 className={`text-xl font-semibold transition-colors ${titleClass}`}>
              <a 
                href={pub.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`hover:underline transition-colors ${linkClass}`}
              >
                {pub.title}
              </a>
            </h3>
            <p className={`text-sm mt-1 transition-colors ${authorClass}`}>
              {pub.authors}
            </p>
            <div className="flex justify-between items-center mt-2">
              <span className={`text-sm italic transition-colors ${conferenceClass}`}>
                {pub.conference}
              </span>
              <span className={`text-sm transition-colors ${dateClass}`}>
                {pub.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
