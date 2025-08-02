import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Award, Clock, Search, Star, Calendar, MessageCircle, Phone } from 'lucide-react';
import { EXPERT_CATEGORIES } from '../config';
import { eventService } from '../services/eventService';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CountUp from 'react-countup';
import Lottie from 'lottie-react';
import farmingLottie from '../assets/farming-lottie.json';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [experts, setExperts] = useState([]);

  const stats = [
    { number: 500, suffix: '+', label: 'Farmers Helped', icon: Users },
    { number: 50, suffix: '+', label: 'Expert Consultants', icon: Award },
    { number: 98, suffix: '%', label: 'Success Rate', icon: Star },
    { number: 24, suffix: '/7', label: 'Support Available', icon: Clock }
  ];

  useEffect(() => {
    eventService.getAllExperts().then(setExperts);
  }, []);
  const featuredExperts = experts.slice(0, 3);

  // Custom cursor effect
  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.id = 'custom-cursor';
    cursor.style.position = 'fixed';
    cursor.style.zIndex = '9999';
    cursor.style.width = '32px';
    cursor.style.height = '32px';
    cursor.style.borderRadius = '50%';
    cursor.style.background = 'rgba(16,185,129,0.18)';
    cursor.style.border = '2px solid #10b981';
    cursor.style.pointerEvents = 'none';
    cursor.style.transition = 'transform 0.12s cubic-bezier(0.4,0,0.2,1), background 0.2s';
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    document.body.appendChild(cursor);
    const move = (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };
    const click = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
      setTimeout(() => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      }, 120);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', click);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', click);
      document.body.removeChild(cursor);
    };
  }, []);

  return (
    <div className="min-h-screen dark:bg-gray-900 dark:text-gray-100 relative flex flex-col">
      <Navbar />
      {/* Parallax SVG background */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none" aria-hidden="true">
        <svg viewBox="0 0 1440 320" className="w-full h-64 md:h-96" preserveAspectRatio="none">
          <path fill="#10b981" fillOpacity="0.2" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
        </svg>
      </div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://raw.githubusercontent.com/webcoder904/Tea-Consultation-Project/refs/heads/main/istockphoto-542203220-612x612.jpg')`
          }}
        />
        <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
          <div className="mb-8 animate-fadeIn">
            <span className="inline-block glass-effect rounded-full px-6 py-3 text-sm font-semibold text-white mb-6 border border-white/20">
              🌾 Connect with Agricultural Experts
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight animate-slideIn" style={{lineHeight: '1.56', paddingBottom: '1.0em'}}>
            Transform Your
            <span className="block gradient-text text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 whitespace-nowrap">
              Farming Future
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-gray-200 leading-relaxed max-w-4xl mx-auto animate-fadeIn">
            Get expert consultation from certified agricultural professionals. Boost your crop yield, 
            optimize resources, and implement sustainable farming practices.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-fadeIn">
            <Link
              to="/experts"
              className="inline-flex items-center bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-xl"
            >
              Find Experts Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center glass-effect text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transform hover:scale-105 transition-all duration-300 border border-white/30"
            >
              Learn More
            </Link>
          </div>
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto animate-fadeIn">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for soil experts, irrigation specialists, crop consultants..."
                className="w-full pl-16 pr-6 py-4 rounded-full glass-effect text-white placeholder-gray-300 border-2 border-white/30 focus:border-green-400 focus:ring-4 focus:ring-green-400/40 outline-none transition-all duration-300 text-lg shadow-xl bg-white/20 backdrop-blur-lg animate-glow-bar"
                style={{boxShadow: '0 0 24px 4px rgba(16,185,129,0.15), 0 2px 8px 0 rgba(0,0,0,0.10)'}}
              />
              <style>{`
                @keyframes glowBar {
                  0% { box-shadow: 0 0 24px 4px rgba(16,185,129,0.15), 0 2px 8px 0 rgba(0,0,0,0.10); }
                  50% { box-shadow: 0 0 48px 12px rgba(16,185,129,0.35), 0 2px 16px 0 rgba(0,0,0,0.15); }
                  100% { box-shadow: 0 0 24px 4px rgba(16,185,129,0.15), 0 2px 8px 0 rgba(0,0,0,0.10); }
                }
                .animate-glow-bar {
                  animation: glowBar 2.5s infinite alternate;
                }
                .glass-effect:focus, .glass-effect:hover {
                  transform: scale(1.04);
                  box-shadow: 0 0 64px 16px rgba(16,185,129,0.25), 0 2px 16px 0 rgba(0,0,0,0.18);
                  border-color: #10b981;
                }
                .animate-fadeIn {
                  animation: fadeInUp 1.2s cubic-bezier(0.23, 1, 0.32, 1) both;
                }
                @keyframes fadeInUp {
                  0% { opacity: 0; transform: translateY(40px); }
                  100% { opacity: 1; transform: translateY(0); }
                }
              `}</style>
            </div>
          </div>
        </div>
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-custom">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white dark:bg-gray-900" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group animate-fadeIn dark:bg-gray-900" style={{animationDelay: `${index * 0.1}s`}} data-aos="zoom-in" data-aos-delay={index * 100}>
                <div className="bg-gradient-to-r from-green-100 to-green-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-green-200 group-hover:to-green-300 transition-all duration-300 transform group-hover:scale-110 dark:from-gray-800 dark:to-gray-700">
                  <stat.icon className="h-8 w-8 text-green-600 dark:text-green-300" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2 dark:text-green-200">
                  <CountUp end={stat.number} duration={2} suffix={stat.suffix} />
                </div>
                <div className="text-gray-600 font-medium dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Animated SVG Divider */}
        <div className="w-full -mb-2" aria-hidden="true">
          <svg viewBox="0 0 1440 80" className="w-full h-16 md:h-24" preserveAspectRatio="none">
            <path fill="#10b981" fillOpacity="0.12" d="M0,48L60,53.3C120,59,240,69,360,65.3C480,61,600,43,720,37.3C840,32,960,40,1080,48C1200,56,1320,64,1380,69.3L1440,75L1440,80L1380,80C1320,80,1200,80,1080,80C960,80,840,80,720,80C600,80,480,80,360,80C240,80,120,80,60,80L0,80Z"></path>
          </svg>
        </div>
      </section>

      {/* Expert Categories */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Expert Categories</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-green-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Choose from our diverse range of agricultural experts, each specializing in different aspects of modern farming
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {EXPERT_CATEGORIES.map((category, index) => (
              <Link
                key={category.id}
                to={`/experts?category=${category.id}`}
                className="group text-center animate-fadeIn dark:bg-gray-900"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className={`w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center text-4xl group-hover:scale-110 transform transition-all duration-300 shadow-lg group-hover:shadow-xl dark:from-gray-800 dark:to-gray-700`}>
                  {category.icon}
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors dark:text-green-200 dark:group-hover:text-green-400">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How We Operate Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 dark:text-green-200">How We Operate</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-green-600 mx-auto mb-6 dark:from-green-400 dark:to-green-700"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed dark:text-gray-300">
              At ExpertConnect, we make it simple for you to access world-class tea expertise:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-green-50 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center dark:bg-gray-800">
              <div className="bg-gradient-to-r from-green-400 to-green-600 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl text-white font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Connect with Experts</h3>
              <p className="text-gray-600">Browse our curated network of tea consultants and select the right expert for your needs, whether it's cultivation, processing, or marketing.</p>
            </div>
            <div className="bg-green-50 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center dark:bg-gray-800">
              <div className="bg-gradient-to-r from-green-400 to-green-600 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl text-white font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalized Consultation</h3>
              <p className="text-gray-600">Schedule a session and get tailored advice, soil analysis, or business strategies directly from seasoned tea professionals.</p>
            </div>
            <div className="bg-green-50 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center dark:bg-gray-800">
              <div className="bg-gradient-to-r from-green-400 to-green-600 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl text-white font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Grow & Succeed</h3>
              <p className="text-gray-600">Implement expert recommendations, track your progress, and enjoy ongoing support as you elevate your tea business to new heights.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Farm?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto leading-relaxed dark:text-green-200">
            Join thousands of successful farmers who have revolutionized their operations with expert guidance
          </p>
          <div className="flex flex-col items-center justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center bg-white text-green-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-50 transform hover:scale-105 transition-all duration-300 shadow-xl bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 dark:bg-gray-900 dark:text-green-300 dark:hover:bg-gray-800"
              style={{background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)', color: '#fff'}}>
              Contact Us
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel Placeholder */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800" data-aos="fade-up">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-green-200">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
              <p className="text-lg text-gray-800 dark:text-gray-200 mb-4">“This platform connected me with the perfect expert for my tea farm. My yield has never been better!”</p>
              <div className="font-bold text-green-600 dark:text-green-300">Amit Sharma</div>
            </div>
            <div className="p-8 rounded-2xl shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
              <p className="text-lg text-gray-800 dark:text-gray-200 mb-4">“The consultation was so easy to book and the advice was spot on. Highly recommended!”</p>
              <div className="font-bold text-green-600 dark:text-green-300">Priya Verma</div>
            </div>
            <div className="p-8 rounded-2xl shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
              <p className="text-lg text-gray-800 dark:text-gray-200 mb-4">“I love the modern design and how simple it is to use. The experts are top-notch.”</p>
              <div className="font-bold text-green-600 dark:text-green-300">Rahul Singh</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;