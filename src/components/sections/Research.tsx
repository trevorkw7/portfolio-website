import React from "react";
import Image from "next/image";
import { resume } from "@/data/resume";

export function Research() {
  const titleClass = 'text-gray-900 dark:text-white';
  const bodyClass = 'text-gray-700 dark:text-gray-300';
  const mutedClass = 'text-gray-500 dark:text-gray-400';
  const linkClass =
    'text-green-600 hover:text-green-800 dark:text-blue-400 dark:hover:text-blue-300';
  const borderClass = 'border-gray-200 dark:border-gray-700';

  return (
    <section className="w-full max-w-[95%] sm:max-w-2xl md:max-w-3xl mx-auto py-12 md:py-16 px-4 sm:px-6 md:px-8">
      <h2
        className={`text-3xl font-serif mb-6 transition-colors ${titleClass}`}
      >
        Research
      </h2>
      <div className="space-y-6">
        {/* Self-published write-ups. These live on the same domain but are plain
            HTML with their own design, so they are ordinary links, not <Link>. */}
        {resume.research.map((item, i) => (
          <article
            key={i}
            className={`rounded-lg border overflow-hidden ${borderClass}`}
          >
            <a
              href={item.link}
              className="block"
              tabIndex={-1}
              aria-hidden="true"
            >
              <span className="relative block w-full aspect-[16/9]">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 720px, 92vw"
                  className="object-cover"
                />
              </span>
            </a>
            <div className="p-4 sm:p-5">
              <h3
                className={`text-xl font-semibold transition-colors ${titleClass}`}
              >
                <a
                  href={item.link}
                  className={`hover:underline transition-colors ${linkClass}`}
                >
                  {item.title}
                </a>
              </h3>
              <p
                className={`mt-2 leading-relaxed transition-colors ${bodyClass}`}
              >
                {item.summary}
              </p>
              <p
                className={`mt-3 text-sm italic transition-colors ${bodyClass}`}
              >
                {item.venue}
              </p>
              <div className="mt-3 flex flex-wrap items-baseline gap-x-6 gap-y-2 text-sm">
                <a
                  href={item.link}
                  className={`font-medium underline underline-offset-4 transition-colors ${linkClass}`}
                >
                  Read the write-up
                </a>
                <a
                  href={item.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hover:underline transition-colors ${mutedClass}`}
                >
                  Code
                </a>
              </div>
            </div>
          </article>
        ))}

        {/* Peer-reviewed papers */}
        {resume.publications.map((pub, i) => (
          <article
            key={i}
            className={`rounded-lg border overflow-hidden ${borderClass}`}
          >
            <a
              href={pub.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
              tabIndex={-1}
              aria-hidden="true"
            >
              <span className="relative block w-full aspect-[16/9]">
                <Image
                  src={pub.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 720px, 92vw"
                  className="object-[center_20%] object-cover"
                />
              </span>
            </a>
            <div className="p-4 sm:p-5">
              <h3
                className={`text-xl font-semibold transition-colors ${titleClass}`}
              >
                <a
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hover:underline transition-colors ${linkClass}`}
                >
                  {pub.title}
                </a>
              </h3>
              <p className={`text-sm mt-1 transition-colors ${bodyClass}`}>
                {pub.authors}
              </p>
              <p
                className={`text-sm italic mt-2 transition-colors ${bodyClass}`}
              >
                {pub.conference}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
