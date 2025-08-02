import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  Settings, 
  BarChart3, 
  FileText, 
  Bell,
  Plus
} from 'lucide-react';

const SidebarTO = () => {
  const location = useLocation();

  const sidebarItems = [
    { name: 'Dashboard', to: '/to', icon: BarChart3 },
    { name: 'Events', to: '/to/events', icon: Calendar },
    { name: 'Create Event', to: '/to/events/create', icon: Plus },
    { name: 'Clients', to: '/to/clients', icon: Users },
    { name: 'Reports', to: '/to/reports', icon: FileText },
    { name: 'Notifications', to: '/to/notifications', icon: Bell },
    { name: 'Settings', to: '/to/settings', icon: Settings },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 bg-white shadow-lg h-screen sticky top-0">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800">TO Dashboard</h2>
      </div>
      
      <nav className="mt-6">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.to}
              className={`flex items-center space-x-3 px-6 py-3 text-sm font-medium transition-colors ${
                isActive(item.to)
                  ? 'text-blue-600 bg-blue-50 border-r-2 border-blue-600'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default SidebarTO;