import React, { useState, useMemo, useEffect } from 'react';
import { Star, Clock, Award, MapPin, Filter, Grid, List, Search } from 'lucide-react';
import { EXPERT_CATEGORIES } from '../config';
import { eventService } from '../services/eventService';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useForm, ValidationError } from '@formspree/react';
import { useNavigate, useLocation } from 'react-router-dom';

const EXPERT_TIPS = [
  "Did you know? The best tea leaves are hand-plucked early in the morning!",
  "Tip: Consistent soil moisture is key to healthy tea plants.",
  "Fun Fact: Shade-grown tea leaves produce a sweeter flavor.",
  "Tip: Regular pruning encourages new tea shoots and better yield.",
  "Did you know? Organic fertilizers can enhance both yield and flavor.",
  "Tip: Water quality can significantly affect the taste of your tea.",
  "Fun Fact: Tea plants can live for over 100 years with proper care!"
];

const ViewEvents = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [viewMode, setViewMode] = useState('grid');
  const [experts, setExperts] = useState([]);

  // Set selectedCategory from URL query param on mount and when location.search changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category') || '';
    setSelectedCategory(cat);
  }, [location.search]);

  useEffect(() => {
    eventService.getAllExperts().then(setExperts);
  }, []);

  const filteredExperts = useMemo(() => {
    let filtered = experts.filter(expert => {
      const matchesSearch = expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           expert.expertise.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           (expert.specialties && expert.specialties.some(specialty => 
                             specialty.toLowerCase().includes(searchQuery.toLowerCase())
                           ));

      const matchesCategory = !selectedCategory || expert.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    // Sort experts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'reviews':
          return b.reviews - a.reviews;
        case 'price':
          return a.hourlyRate - b.hourlyRate;
        default:
          return 0;
      }
    });

    return filtered;
  }, [experts, searchQuery, selectedCategory, sortBy]);

  const handleOpenProductDetail = (expertId) => {
    navigate(`/expert/${expertId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Find Agricultural Experts</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
            Connect with certified agricultural professionals who can help transform your farming operations
          </p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === '' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-600'
              }`}
            >
              All Categories
            </button>
            {EXPERT_CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 ${
                  selectedCategory === category.id 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-600'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search experts..."
                className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all duration-300"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 font-medium">
                {filteredExperts.length} experts found
              </span>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-green-100 text-green-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-green-100 text-green-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviews</option>
                <option value="price">Lowest Price</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Experts Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredExperts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Filter className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No experts found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters</p>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}>
              {filteredExperts.map((expert) => (
                <div
                  key={expert.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full"
                >
                  {/* Expert Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={expert.image}
                      alt={expert.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'; }}
                    />
                    <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center space-x-1 shadow-lg">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-semibold text-gray-900">{expert.rating}</span>
                    </div>
                  </div>

                  {/* Expert Info */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{expert.name}</h3>
                      <div className="flex items-center text-green-600 text-sm">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{expert.responseTime}</span>
                      </div>
                    </div>
                    <p className="text-green-600 font-medium mb-2">{expert.title}</p>
                    <p className="text-gray-600 mb-4 leading-relaxed">{expert.expertise}</p>
                    <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <Award className="h-4 w-4 mr-1" />
                          {expert.experience}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {expert.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-end">
                    <button
                      className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-full font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 mt-auto"
                      onClick={() => handleOpenProductDetail(expert.id)}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

function ExpertProfileInfo({ expert }) {
  return (
    <div className="mb-4 p-4 bg-white rounded-lg border shadow flex flex-col md:flex-row items-center gap-4">
      <img
        src={expert.image}
        alt={expert.name}
        className="w-24 h-24 object-cover rounded-full border-2 border-green-400"
        onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/150x150?text=No+Image'; }}
      />
      <div className="flex-1 text-center md:text-left">
        <h4 className="text-xl font-bold text-gray-900">{expert.name}</h4>
        <p className="text-green-600 font-medium">{expert.title}</p>
        <p className="text-gray-600">{expert.expertise}</p>
        <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500 justify-center md:justify-start">
          <span><Award className="inline h-4 w-4 mr-1" />{expert.experience}</span>
          <span><MapPin className="inline h-4 w-4 mr-1" />{expert.location}</span>
          <span><Star className="inline h-4 w-4 mr-1 text-yellow-400" />{expert.rating} ({expert.reviews} reviews)</span>
        </div>
      </div>
    </div>
  );
}

export default ViewEvents; 