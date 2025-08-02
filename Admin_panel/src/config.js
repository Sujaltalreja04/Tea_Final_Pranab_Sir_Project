export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://65.2.59.140:5001';

export const ADMIN_ROLES = [
  {
    id: 'super_admin',
    name: 'Super Administrator',
    permissions: ['all']
  },
  {
    id: 'admin',
    name: 'Administrator',
    permissions: ['users', 'experts', 'bookings']
  },
  {
    id: 'moderator',
    name: 'Moderator',
    permissions: ['users', 'experts', 'bookings']
  }
];

export const EXPERT_CATEGORIES = [
  {
    id: 'agriculture',
    name: 'Agriculture Experts',
    icon: '🌾',
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'livestock',
    name: 'Livestock Specialists',
    icon: '🐄',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'soil',
    name: 'Soil Scientists',
    icon: '🌱',
    color: 'from-amber-500 to-amber-600'
  },
  {
    id: 'irrigation',
    name: 'Irrigation Engineers',
    icon: '💧',
    color: 'from-cyan-500 to-cyan-600'
  },
  {
    id: 'organic',
    name: 'Organic Farming',
    icon: '🍃',
    color: 'from-emerald-500 to-emerald-600'
  },
  {
    id: 'technology',
    name: 'AgriTech Consultants',
    icon: '🚜',
    color: 'from-purple-500 to-purple-600'
  }
];

export const BOOKING_STATUS = [
  { id: 'pending', name: 'Pending', color: 'yellow' },
  { id: 'confirmed', name: 'Confirmed', color: 'green' },
  { id: 'completed', name: 'Completed', color: 'blue' },
  { id: 'cancelled', name: 'Cancelled', color: 'red' }
];

export const USER_STATUS = [
  { id: 'active', name: 'Active', color: 'green' },
  { id: 'inactive', name: 'Inactive', color: 'gray' },
  { id: 'suspended', name: 'Suspended', color: 'red' }
]; 