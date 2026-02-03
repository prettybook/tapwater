'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const resourcesRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (resourcesRef.current && !resourcesRef.current.contains(event.target as Node)) {
        setResourcesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/tap-logo-dark.svg"
              alt="TapWater.org"
              width={140}
              height={14}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/#states"
              className="px-4 py-2 text-sm font-medium text-brand-900/70 hover:text-brand-900 hover:bg-gray-100 rounded-md transition-all"
            >
              Browse States
            </Link>

            {/* Resources Dropdown */}
            <div ref={resourcesRef} className="relative">
              <button
                onClick={() => setResourcesOpen(!resourcesOpen)}
                onMouseEnter={() => setResourcesOpen(true)}
                className="px-4 py-2 text-sm font-medium text-brand-900/70 hover:text-brand-900 hover:bg-gray-100 rounded-md transition-all flex items-center gap-1"
              >
                Resources
                <svg
                  className={`w-4 h-4 transition-transform ${resourcesOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div
                onMouseLeave={() => setResourcesOpen(false)}
                className={`absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-100 overflow-hidden transition-all ${
                  resourcesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}
              >
                <Link
                  href="/blog"
                  onClick={() => setResourcesOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-brand-900/70 hover:text-brand-900 hover:bg-gray-50 transition-colors"
                >
                  Blog
                </Link>
                <Link
                  href="/best-water-test-kits"
                  onClick={() => setResourcesOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-brand-900/70 hover:text-brand-900 hover:bg-gray-50 transition-colors"
                >
                  Test Kits
                </Link>
              </div>
            </div>

            <Link
              href="/about"
              className="px-4 py-2 text-sm font-medium text-brand-900/70 hover:text-brand-900 hover:bg-gray-100 rounded-md transition-all"
            >
              About
            </Link>
            <Link
              href="/data-sources"
              className="px-4 py-2 text-sm font-medium text-brand-900/70 hover:text-brand-900 hover:bg-gray-100 rounded-md transition-all"
            >
              Methodology
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-brand-900/70 hover:text-brand-900 hover:bg-gray-100 rounded-md transition-all"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-96 border-t border-gray-100' : 'max-h-0'
        }`}
      >
        <nav className="px-4 py-4 space-y-1 bg-white">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 text-sm font-medium text-brand-900/70 hover:text-brand-900 hover:bg-gray-50 rounded-md transition-all"
          >
            Home
          </Link>
          <Link
            href="/#states"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 text-sm font-medium text-brand-900/70 hover:text-brand-900 hover:bg-gray-50 rounded-md transition-all"
          >
            Browse States
          </Link>

          {/* Mobile Resources Accordion */}
          <div>
            <button
              onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-brand-900/70 hover:text-brand-900 hover:bg-gray-50 rounded-md transition-all"
            >
              Resources
              <svg
                className={`w-4 h-4 transition-transform ${mobileResourcesOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-200 ${
                mobileResourcesOpen ? 'max-h-32' : 'max-h-0'
              }`}
            >
              <Link
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="block pl-8 pr-4 py-2.5 text-sm text-brand-900/60 hover:text-brand-900 hover:bg-gray-50 rounded-md transition-all"
              >
                Blog
              </Link>
              <Link
                href="/best-water-test-kits"
                onClick={() => setMobileMenuOpen(false)}
                className="block pl-8 pr-4 py-2.5 text-sm text-brand-900/60 hover:text-brand-900 hover:bg-gray-50 rounded-md transition-all"
              >
                Test Kits
              </Link>
            </div>
          </div>

          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 text-sm font-medium text-brand-900/70 hover:text-brand-900 hover:bg-gray-50 rounded-md transition-all"
          >
            About
          </Link>
          <Link
            href="/data-sources"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 text-sm font-medium text-brand-900/70 hover:text-brand-900 hover:bg-gray-50 rounded-md transition-all"
          >
            Methodology
          </Link>
        </nav>
      </div>
    </header>
  );
}
