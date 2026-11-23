import React from 'react';
import { resume } from '@/data/resume';
import { ArrowUpRightIcon } from '@heroicons/react/20/solid'; 

// Helper function to parse markdown-style links in text
function parseTextWithLinks(text: string) {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: (string | React.ReactElement)[] = [];
  let lastIndex = 0;
  let match;

  const linkClass = 'text-green-600 hover:text-green-800 underline dark:text-blue-400 dark:hover:text-blue-300 dark:underline';

  while ((match = linkRegex.exec(text)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    // Add the link
    parts.push(
      <a
        key={match.index}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        {match[1]}
      </a>
    );

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

export function Experience() {
  // Light colours, with dark: variants for the dark theme
  const titleClass = 'text-gray-900 dark:text-white';
  const subtitleClass = 'text-gray-800 dark:text-gray-100';
  const detailClass = 'text-gray-700 dark:text-gray-300';
  const dateClass = 'text-gray-500 dark:text-gray-400';
  const locationClass = 'text-gray-600 dark:text-gray-400';
  const linkIconColor = 'text-green-600 hover:text-green-800 dark:text-blue-400 dark:hover:text-blue-300';

  return (
    <section className="w-full max-w-[95%] sm:max-w-2xl md:max-w-3xl mx-auto py-12 md:py-16 px-4 sm:px-6 md:px-8">
      <h2 className={`text-3xl font-serif mb-6 transition-colors ${titleClass}`}>
        Experience
      </h2>
      <div className="space-y-8">
        {resume.experience.map((exp, i) => {
          return (
            <div 
              key={i}
              className="relative" 
            >
              <h3 className={`text-xl font-semibold transition-colors ${subtitleClass} pr-6`}>
                {exp.title}
                {/* Conditionally render based on exp.link */}
                {exp.link && (
                  <a
                    href={exp.link} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`absolute top-1 right-0 transition-transform duration-150 hover:scale-110 ${linkIconColor}`}
                    aria-label={`Visit ${exp.title.split(',')[0]} website`} 
                  >
                    <ArrowUpRightIcon className="h-5 w-5" />
                  </a>
                )}
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
                    {parseTextWithLinks(d)}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
