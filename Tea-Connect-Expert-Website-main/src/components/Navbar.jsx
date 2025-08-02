import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Users, Phone, Home, Info, Briefcase, Moon, Sun } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [show, setShow] = useState(true);
  const lastScrollY = useRef(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  // Hide-on-scroll logic
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 50 || window.scrollY < lastScrollY.current) {
        setShow(true);
      } else {
        setShow(false);
      }
      lastScrollY.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Accessibility: close mobile menu on route change
  useEffect(() => { setIsOpen(false); }, [location]);

  // Apply dark mode class to <html>
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const navLinks = [
    { name: 'Home', to: '/', icon: Home },
    { name: 'Services', to: '/services', icon: Briefcase },
    { name: 'Contact', to: '/contact', icon: Phone },
    { name: 'About', to: '/about', icon: Info },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-20'} bg-white/30 bg-gradient-to-r from-green-100/30 via-white/20 to-blue-100/30 shadow-2xl border-b border-white/30 animate-navbar-fadeIn backdrop-blur-[18px] border border-white/40 backdrop-saturate-200 backdrop-contrast-125 dark:bg-gray-900/80 dark:border-gray-800 dark:shadow-black/30`}
      aria-label="Main Navigation"
    >
      <style>{`
        @keyframes navbarFadeIn {
          0% { opacity: 0; transform: translateY(-32px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-navbar-fadeIn {
          animation: navbarFadeIn 1.2s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .nav-underline {
          position: relative;
        }
        .nav-underline::after {
          content: '';
          position: absolute;
          left: 0; right: 0; bottom: -2px;
          height: 3px;
          background: linear-gradient(90deg, #10b981 0%, #3b82f6 100%);
          border-radius: 2px;
          transform: scaleX(0);
          transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        .nav-underline:hover::after, .nav-underline:focus::after {
          transform: scaleX(1);
        }
        .logo-animate {
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .logo-animate:hover {
          animation: logoPulse 1.2s infinite alternate;
          box-shadow: 0 0 16px 4px #10b98144;
          transform: scale(1.08) rotate(-3deg);
        }
        @keyframes logoPulse {
          0% { filter: brightness(1); }
          100% { filter: brightness(1.25) drop-shadow(0 0 8px #10b981); }
        }
        .gradient-text-animated {
          background: linear-gradient(270deg, #10b981, #3b82f6, #10b981);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientMove 4s ease-in-out infinite alternate;
        }
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .nav-underline {
          transition: color 0.2s, transform 0.2s;
        }
        .nav-underline:hover, .nav-underline:focus {
          color: #10b981 !important;
          transform: scale(1.08);
        }
        .navbar-light-anim {
          pointer-events: none;
          position: absolute;
          left: 0; top: 0; width: 100%; height: 100%;
          z-index: 0;
          background: radial-gradient(circle at 60% 40%, #10b98133 0%, transparent 60%), radial-gradient(circle at 20% 80%, #3b82f633 0%, transparent 70%);
          animation: navbarLightMove 8s linear infinite alternate;
        }
        @keyframes navbarLightMove {
          0% { background-position: 60% 40%, 20% 80%; }
          100% { background-position: 40% 60%, 80% 20%; }
        }
        .profile-avatar {
          width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #10b981 60%, #3b82f6 100%); display: flex; align-items: center; justify-content: center; color: #fff; font-weight: bold; font-size: 1.2rem; box-shadow: 0 2px 8px #10b98133; border: 2px solid #fff; margin-left: 1rem;
        }
        .hamburger {
          width: 32px; height: 32px; display: flex; flex-direction: column; justify-content: center; align-items: center; cursor: pointer; z-index: 20; transition: transform 0.3s;
        }
        .hamburger-bar {
          width: 24px; height: 3px; background: #10b981; margin: 3px 0; border-radius: 2px; transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
        }
        .hamburger.open .bar1 { transform: rotate(45deg) translate(5px, 5px); background: #3b82f6; }
        .hamburger.open .bar2 { opacity: 0; }
        .hamburger.open .bar3 { transform: rotate(-45deg) translate(5px, -5px); background: #3b82f6; }
        .nav-underline:focus-visible {
          outline: 2px solid #10b981;
          outline-offset: 2px;
        }
        .sidebar-slide {
          position: fixed;
          top: 0; left: 0; height: 100vh; width: 270px;
          background: rgba(255,255,255,0.98);
          box-shadow: 2px 0 24px 0 #10b98122;
          z-index: 100;
          transform: translateX(-100%);
          transition: transform 0.4s cubic-bezier(0.4,0,0.2,1);
          display: flex; flex-direction: column;
        }
        .sidebar-slide.open {
          transform: translateX(0);
        }
        .sidebar-close-btn {
          position: absolute; top: 1rem; right: 1rem; background: none; border: none; font-size: 2rem; color: #10b981; cursor: pointer;
        }
        .sidebar-link {
          display: flex; align-items: center; gap: 0.75rem; font-size: 1.1rem; font-weight: 500; color: #374151; padding: 1rem 2rem; border-radius: 0.75rem; margin: 0.5rem 1rem; transition: background 0.2s, color 0.2s, transform 0.2s;
        }
        .sidebar-link:hover, .sidebar-link:focus {
          background: linear-gradient(90deg, #10b98122 0%, #3b82f622 100%);
          color: #10b981;
          transform: scale(1.04);
        }
        .sidebar-backdrop {
          position: fixed; inset: 0; background: rgba(0,0,0,0.18); z-index: 90; transition: opacity 0.3s;
        }
        /* Enhanced glassmorphism/frosted effect */
        header[aria-label='Main Navigation'] {
          box-shadow: 0 8px 32px 0 rgba(16,185,129,0.12), 0 1.5px 8px 0 rgba(59,130,246,0.10);
          border-radius: 1.5rem;
          border: 1.5px solid rgba(255,255,255,0.32);
          background: linear-gradient(120deg, rgba(255,255,255,0.18) 0%, rgba(16,185,129,0.10) 50%, rgba(59,130,246,0.10) 100%);
          backdrop-filter: blur(18px) saturate(180%) contrast(120%);
        }
      `}</style>
      <div className="navbar-light-anim" aria-hidden="true"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16 relative">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group logo-animate" aria-label="Homepage">
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-2 rounded-xl group-hover:from-green-600 group-hover:to-green-700 transition-all duration-300">
              <Users className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text-animated">ExpertConnect</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.to}
                  className={`nav-underline flex items-center space-x-1 px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isActive(link.to)
                      ? 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-gray-800'
                      : 'text-gray-700 hover:text-green-600 hover:bg-green-50 dark:text-gray-200 dark:hover:text-green-400 dark:hover:bg-gray-800'
                  }`}
                  tabIndex={0}
                  aria-current={isActive(link.to) ? 'page' : undefined}
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
            {/* Dark mode toggle */}
            <button
              onClick={() => setDarkMode((d) => !d)}
              className="ml-4 p-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-gray-700 dark:text-gray-200" />}
            </button>
          </nav>

          {/* Hamburger for mobile - triggers sidebar */}
          <button
            className={`hamburger md:hidden ${sidebarOpen ? 'open' : ''}`}
            aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={sidebarOpen}
            aria-controls="sidebar-menu"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <div className="hamburger-bar bar1"></div>
            <div className="hamburger-bar bar2"></div>
            <div className="hamburger-bar bar3"></div>
          </button>
        </div>
      </div>
      {/* Sidebar for mobile */}
      {sidebarOpen && <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)}></div>}
      <aside className={`sidebar-slide${sidebarOpen ? ' open' : ''}`} id="sidebar-menu" aria-label="Sidebar Navigation" tabIndex={-1}>
        <button className="sidebar-close-btn" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar"><X /></button>
        <nav className="flex flex-col mt-16" aria-label="Sidebar Main">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                to={link.to}
                className="sidebar-link"
                tabIndex={0}
                aria-current={isActive(link.to) ? 'page' : undefined}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="h-5 w-5" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </header>
  );
};

export default Navbar;