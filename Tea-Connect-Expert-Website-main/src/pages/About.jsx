import React from 'react';
import { Users, Award, Globe, Shield, Heart, Target } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Passion for Agriculture',
      description: 'We believe in the power of sustainable farming to feed the world and protect our planet.'
    },
    {
      icon: Shield,
      title: 'Trust & Reliability',
      description: 'Our experts are thoroughly vetted and committed to providing honest, reliable advice.'
    },
    {
      icon: Target,
      title: 'Results-Driven',
      description: 'We measure our success by the improved yields and sustainability of our clients farms.'
    },
    {
      icon: Globe,
      title: 'Global Impact',
      description: 'Connecting farmers worldwide with expertise to create a more sustainable food system.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'Former agricultural scientist with 20+ years of experience in sustainable farming practices.'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'Technology leader passionate about connecting farmers with the right expertise through innovation.'
    },
    {
      name: 'Dr. Maria Rodriguez',
      role: 'Head of Expert Relations',
      image: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'Agricultural consultant with expertise in building networks of farming professionals worldwide.'
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white dark:from-gray-900 dark:to-gray-800 dark:text-green-200" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">About ExpertConnect</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to revolutionize agriculture by connecting farmers with world-class 
            experts, fostering sustainable practices, and building a more resilient food system.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white dark:bg-gray-900" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At ExpertConnect, we believe that every farmer deserves access to world-class agricultural 
                expertise. Our platform bridges the gap between traditional farming knowledge and modern 
                scientific innovation.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We're committed to empowering farmers with the tools, knowledge, and connections they need 
                to build sustainable, profitable operations that benefit both their communities and the environment.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
                  <div className="text-gray-600">Farmers Helped</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
                  <div className="text-gray-600">Expert Consultants</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                alt="Farmers working in field"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-green-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              These core values guide everything we do and shape how we serve our farming community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center group dark:bg-gray-900 dark:shadow-black/30" data-aos="zoom-in" data-aos-delay={index * 100}>
                <div className="bg-gradient-to-r from-green-100 to-green-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:from-green-200 group-hover:to-green-300 transition-all duration-300">
                  <value.icon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white dark:bg-gray-900" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-green-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our passionate team combines deep agricultural knowledge with cutting-edge technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 dark:bg-gray-900 dark:shadow-black/30" data-aos="zoom-in" data-aos-delay={index * 100}>
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-green-600 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 dark:from-gray-900 dark:to-gray-800" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Join Our Community?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Connect with agricultural experts and transform your farming practices today
          </p>
          <div className="flex justify-center" data-aos="zoom-in">
            <Link
              to="/contact"
              className="inline-flex items-center bg-white text-green-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-50 transform hover:scale-105 transition-all duration-300 shadow-xl dark:bg-gray-900 dark:text-green-300 dark:hover:bg-gray-800"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
