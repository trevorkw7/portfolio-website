import React from 'react';
import { resume } from '@/data/resume';
import { motion } from 'framer-motion'; 
import { ArrowUpRightIcon } from '@heroicons/react/20/solid'; 

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
  const linkIconColor = mode === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-green-600 hover:text-green-800';

  // Animation variants for the link icon
  const linkIconVariants = {
    rest: { opacity: 0, y: 5, transition: { duration: 0.2, ease: 'easeOut' } },
    hover: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeIn' } }
  };
  
  return (
    <section className="w-full max-w-[95%] sm:max-w-2xl md:max-w-3xl mx-auto py-12 md:py-16 px-4 sm:px-6 md:px-8">
      <h2 className={`text-3xl font-serif mb-6 transition-colors ${titleClass}`}>
        Experience
      </h2>
      <div className="space-y-8">
        {resume.experience.map((exp, i) => {
          return (
            <motion.div
              key={i}
              className="relative group" 
              initial="rest"
              whileHover="hover"
              animate="rest"
            >
              <h3 className={`text-xl font-semibold transition-colors ${subtitleClass} pr-6`}> 
                {exp.title}
                {/* Conditionally render based on exp.link */}
                {exp.link && (
                  <motion.a
                    href={exp.link} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`absolute top-1 right-0 ${linkIconColor}`}
                    variants={linkIconVariants}
                    aria-label={`Visit ${exp.title.split(',')[0]} website`} 
                  >
                    <ArrowUpRightIcon className="h-5 w-5" />
                  </motion.a>
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
                    {d}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
