import React from 'react';
import { Users, Calendar, TrendingUp, Clock } from 'lucide-react';
import { mockClients } from '../../mock/clients';
import { mockClientRequests } from '../../mock/client_request';

const TOHome = () => {
  const stats = [
    { title: 'Total Clients', value: mockClients.length, icon: Users, color: 'bg-blue-500' },
    { title: 'Active Requests', value: mockClientRequests.filter(r => r.status === 'pending').length, icon: Calendar, color: 'bg-green-500' },
    { title: 'Completed', value: mockClientRequests.filter(r => r.status === 'completed').length, icon: TrendingUp, color: 'bg-purple-500' },
    { title: 'Response Time', value: '2.5h', icon: Clock, color: 'bg-orange-500' }
  ];

  const recentRequests = mockClientRequests.slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">TO Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your consultations.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Requests */}
      <div className="bg-white rounded-xl shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Recent Client Requests</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentRequests.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{request.subject}</h3>
                  <p className="text-sm text-gray-600">Client: {request.clientName}</p>
                  <p className="text-sm text-gray-500">Category: {request.expertCategory}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    request.status === 'approved' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {request.status}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">{request.preferredDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TOHome;