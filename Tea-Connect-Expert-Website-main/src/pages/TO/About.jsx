import React from 'react';
import { Shield, Users, Award, Clock } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Enterprise-grade security to protect client data and communications'
    },
    {
      icon: Users,
      title: 'Expert Network',
      description: 'Access to a curated network of certified agricultural professionals'
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description: 'Rigorous vetting process ensures only top-tier experts join our platform'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock technical support for seamless operations'
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">About TO Platform</h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          The Technical Operations (TO) platform is designed to streamline agricultural consultation 
          services, connecting farmers with expert advisors efficiently and securely.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Platform Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <feature.icon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Mission Statement</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          Our mission is to revolutionize agricultural consultation by providing a seamless, 
          technology-driven platform that connects farmers with the expertise they need to 
          optimize their operations and implement sustainable practices.
        </p>
        <p className="text-gray-600 leading-relaxed">
          We believe that access to expert knowledge should not be limited by geography or 
          resources, and our platform makes world-class agricultural expertise available to 
          farmers everywhere.
        </p>
      </div>
    </div>
  );
};

export default About;