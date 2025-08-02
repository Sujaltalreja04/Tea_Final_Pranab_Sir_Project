import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const serviceImages = [
  'https://raw.githubusercontent.com/webcoder904/Tea-Consultation-Project/refs/heads/main/istockphoto-542203220-612x612.jpg',
  'https://raw.githubusercontent.com/webcoder904/Tea-Consultation-Project/refs/heads/main/stock-photo-indian-agro-scientific-with-farmer-checking-capsicum-using-magnifying-glass-at-green-house-2313043401.jpg',
  'https://raw.githubusercontent.com/webcoder904/Tea-Consultation-Project/refs/heads/main/images.jpeg',
];

export default function Services() {
  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(16,185,129,0.55), rgba(59,130,246,0.45)), url('${serviceImages[0]}')`,
          }}
        />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto animate-fadeIn">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight animate-slideIn" style={{lineHeight: '1.15', paddingBottom: '0.7em'}}>
            Our <span className="gradient-text text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 whitespace-nowrap">Services</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed max-w-3xl mx-auto animate-fadeIn">
            Unlock the full potential of your farm with our expert agricultural and tea consultation services. From soil analysis to sustainable crop management, our team of specialists empowers you to achieve higher yields, better quality, and long-term success.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-xl animate-fadeIn"
            style={{background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)', color: '#fff'}}>
            Contact Us
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fadeIn">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-green-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our comprehensive services are designed to support farmers, tea growers, and agri-entrepreneurs at every stage. We combine scientific expertise, modern technology, and a passion for sustainability to deliver real results.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-green-50 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center animate-fadeIn">
              <img src={serviceImages[0]} alt="Expert Consultation" className="w-32 h-32 object-cover rounded-full mb-6 shadow-lg border-4 border-white" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Tea & Crop Consultation</h3>
              <p className="text-gray-600">Personalized advice on tea cultivation, crop selection, and best practices for maximizing yield and quality. Our experts guide you from planting to harvest.</p>
            </div>
            <div className="bg-green-50 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center animate-fadeIn" style={{animationDelay: '0.2s'}}>
              <img src={serviceImages[1]} alt="Soil & Lab Analysis" className="w-32 h-32 object-cover rounded-full mb-6 shadow-lg border-4 border-white" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Soil & Lab Analysis</h3>
              <p className="text-gray-600">Comprehensive soil testing and scientific analysis to optimize nutrients, pH, and irrigation. We help you build a healthy foundation for sustainable farming.</p>
            </div>
            <div className="bg-green-50 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center animate-fadeIn" style={{animationDelay: '0.4s'}}>
              <img src={serviceImages[2]} alt="Sustainable Practices" className="w-32 h-32 object-cover rounded-full mb-6 shadow-lg border-4 border-white" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sustainable Practices</h3>
              <p className="text-gray-600">Implement eco-friendly methods, organic certification, and smart resource management. We empower you to grow profitably while protecting the environment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-blue-50 animate-fadeIn">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Agricultural & Tea Consultation?</h2>
          <p className="text-lg text-gray-700 mb-6">
            Our team of agronomists, tea scientists, and field experts brings decades of experience to your farm. We use data-driven insights, the latest research, and hands-on support to help you:
          </p>
          <ul className="text-left text-gray-700 mx-auto max-w-2xl space-y-3 mb-8 list-disc pl-6">
            <li>Increase crop yield and tea quality with tailored strategies</li>
            <li>Reduce costs and boost profitability through efficient resource use</li>
            <li>Achieve organic certification and meet global standards</li>
            <li>Adopt sustainable, climate-smart farming practices</li>
            <li>Access ongoing support and training from industry leaders</li>
          </ul>
          <p className="text-lg text-gray-700">
            Whether you are a smallholder, a large estate, or an agri-entrepreneur, our services are designed to help you thrive in a changing world. Partner with us for a greener, more productive future.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Elevate Your Farm?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Connect with our experts and start your journey to sustainable, profitable agriculture today.
          </p>
          <div className="flex flex-col items-center justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-xl"
              style={{background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)', color: '#fff'}}>
              Contact Us
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
} 