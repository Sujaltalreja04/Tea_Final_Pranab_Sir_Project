export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

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

export const CONSULTATION_TYPES = [
  { id: 'video', name: 'Video Call', price: 150 },
  { id: 'phone', name: 'Phone Call', price: 100 },
  { id: 'onsite', name: 'On-site Visit', price: 300 },
  { id: 'chat', name: 'Chat Support', price: 50 }
];