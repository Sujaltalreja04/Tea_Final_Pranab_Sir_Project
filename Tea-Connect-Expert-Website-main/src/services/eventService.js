import { EXPERT_CATEGORIES } from '../config';

const categoryMap = {};
EXPERT_CATEGORIES.forEach(cat => {
  categoryMap[cat.name.toLowerCase()] = cat.id;
  categoryMap[cat.id.toLowerCase()] = cat.id;
});

function normalizeCategory(rawCategory) {
  if (!rawCategory) return '';
  const lower = rawCategory.toLowerCase().trim();
  // Exact match
  if (categoryMap[lower]) return categoryMap[lower];
  // Partial match (e.g., "irrigation engineer" should match "irrigation")
  for (const key in categoryMap) {
    if (lower.includes(key)) return categoryMap[key];
  }
  return lower;
}

const mapExpertKeys = (expert) => {
  console.log('Expert image URL:', expert.IMAGE);
  return {
    id: expert.ID,
    name: expert.NAME,
    title: expert.TITLE,
    category: normalizeCategory(expert.CATEGORY),
    expertise: expert.EXPERTISE,
    rating: expert.RATING,
    reviews: expert.REVIEWS,
    experience: expert.EXPERIENCE,
    specialties: Array.isArray(expert.SPECIALTIES)
      ? expert.SPECIALTIES
      : (typeof expert.SPECIALTIES === 'string'
          ? expert.SPECIALTIES.split(',').map(s => s.trim())
          : []),
    availability: expert.AVAILABILITY,
    responseTime: expert.RESPONSE_TIME,
    hourlyRate: expert.HOURLY_RATE,
    location: expert.LOCATION || expert.LOACTION,
    image: expert.IMAGE,
    email: expert.EMAIL,
    phone: expert.PHONE,
    onSiteVisitFees: expert.ON_SITE_VISIT_FEES,
    description: expert.DESCRIPTION,
    age: expert.AGE
  };
};

export const eventService = {
  // Get all experts (events)
  getAllExperts: async () => {
    const res = await fetch('http://localhost:5000/experts');
    const data = await res.json();
    return data.map(mapExpertKeys);
  },

  // Get expert by ID
  getExpertById: async (id) => {
    const res = await fetch(`http://localhost:5000/experts`);
    const data = await res.json();
    const expert = data.find(e => e.ID === parseInt(id));
    if (expert) {
      return mapExpertKeys(expert);
    } else {
      throw new Error('Expert not found');
    }
  },

  // Get work experience for a specific expert
  getWorkExperience: async (expertId) => {
    const res = await fetch(`http://localhost:5000/experts/${expertId}/work-experience`);
    const data = await res.json();
    return data;
  },

  // Get experts by category
  getExpertsByCategory: async (category) => {
    const res = await fetch('http://localhost:5000/experts');
    const data = await res.json();
    const experts = data.filter(e => e.CATEGORY === category);
    return experts.map(mapExpertKeys);
  },

  // Search experts
  searchExperts: async (query) => {
    const res = await fetch('http://localhost:5000/experts');
    const data = await res.json();
    const experts = data.filter(expert => 
      (expert.NAME && expert.NAME.toLowerCase().includes(query.toLowerCase())) ||
      (expert.EXPERTISE && expert.EXPERTISE.toLowerCase().includes(query.toLowerCase())) ||
      (expert.SPECIALTIES && expert.SPECIALTIES.toLowerCase().includes(query.toLowerCase()))
    );
    return experts.map(mapExpertKeys);
  },

  // Book consultation
  bookConsultation: async (expertId, bookingData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const booking = {
          id: Date.now(),
          expertId,
          ...bookingData,
          status: 'pending',
          createdAt: new Date().toISOString()
        };
        resolve(booking);
      }, 600);
    });
  },

  // Get available slots for a specific expert
  getAvailableSlots: async (expertId) => {
    const res = await fetch(`http://localhost:5000/api/experts/${expertId}/slots`);
    if (!res.ok) throw new Error('Failed to fetch slots');
    return await res.json();
  }
};