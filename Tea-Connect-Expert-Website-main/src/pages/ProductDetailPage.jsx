import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, MapPin, Award, ArrowLeft, Phone, Mail, Calendar } from 'lucide-react';
import { eventService } from '../services/eventService';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProductDetailPage = () => {
  const { expertId } = useParams();
  const navigate = useNavigate();
  const [expert, setExpert] = useState(null);
  const [workExp, setWorkExp] = useState([]);
  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotsError, setSlotsError] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [visibleReviews, setVisibleReviews] = useState(2);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpertData = async () => {
      try {
        const expertData = await eventService.getExpertById(expertId);
        setExpert(expertData);
        
        // Fetch work experience
        const experienceData = await eventService.getWorkExperience(expertId);
        setWorkExp(experienceData);
        
        // Fetch reviews
        const reviewsResponse = await fetch(`http://localhost:5000/api/experts/${expertId}/reviews`);
        const reviewsData = await reviewsResponse.json();
        setReviews(reviewsData);
        
        // Fetch available slots
        setLoadingSlots(true);
        try {
          const slotsData = await eventService.getAvailableSlots(expertId);
          setSlots(slotsData);
        } catch (err) {
          setSlotsError('Could not load available slots.');
          setSlots([]);
        } finally {
          setLoadingSlots(false);
        }
      } catch (error) {
        console.error('Error fetching expert data:', error);
        navigate('/experts');
      } finally {
        setLoading(false);
      }
    };

    if (expertId) {
      fetchExpertData();
    }
  }, [expertId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!expert) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Expert Not Found</h2>
            <button
              onClick={() => navigate('/experts')}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Back to Experts
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const {
    image, name, title, rating, reviews: expertReviews, expertise, experience, location, specialties = [], hourlyRate, email, phone, onSiteVisitFees, description, age
  } = expert;

  // Parse specialties if needed
  const specialtiesArr = Array.isArray(specialties) ? specialties : (typeof specialties === 'string' ? specialties.split(',').map(s => s.trim()) : []);

  // Defensive: ensure expertReviewsList is always an array
  const expertReviewsList = Array.isArray(reviews) ? reviews : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <button
          onClick={() => navigate('/experts')}
          className="flex items-center text-green-600 hover:text-green-700 transition-colors mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Experts
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <img
              src={image}
              alt={name}
              className="w-40 h-40 object-cover rounded-xl border-4 border-green-200 shadow-lg"
              onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/200x200?text=No+Image'; }}
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{name}</h1>
              <div className="flex flex-wrap items-center gap-4 mb-2 text-gray-600 text-base">
                {age && <span>Age {age}</span>}
                <span className="flex items-center gap-1 text-yellow-500 font-semibold">
                  <Star className="h-5 w-5" /> {rating}
                </span>
              </div>
              <div className="mb-2 text-green-700 font-medium">{title}</div>
              <div className="mb-2 text-gray-700">{expertise}</div>
              {description && <div className="mb-2 text-gray-700">{description}</div>}
              <div className="mt-4">
                <button 
                  className="text-blue-600 underline cursor-pointer hover:text-blue-700"
                  onClick={() => setShowReviewForm(true)}
                >
                  Click to Leave Review
                </button>
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="bg-green-50 rounded-xl p-6 shadow min-w-[250px]">
              <h3 className="font-bold text-lg text-green-800 mb-4">Contact Information</h3>
              <div className="space-y-3">
                {phone && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <Phone className="h-4 w-4 text-green-600" />
                    <span>{phone}</span>
                  </div>
                )}
                {email && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <Mail className="h-4 w-4 text-green-600" />
                    <span>{email}</span>
                  </div>
                )}
                {location && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin className="h-4 w-4 text-green-600" />
                    <span>{location}</span>
                  </div>
                )}
                {experience && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <Award className="h-4 w-4 text-green-600" />
                    <span>{experience}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Show Review Form as a card above Work Experience */}
        {showReviewForm && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-green-800">Leave Your Review</h2>
              <button onClick={() => setShowReviewForm(false)} className="text-gray-400 hover:text-green-600 text-2xl font-bold">&times;</button>
            </div>
            <ReviewForm expert={expert} onClose={() => setShowReviewForm(false)} />
          </div>
        )}
        {/* Work Experience Section */}
        {workExp.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Work Experience</h2>
            <div className="space-y-6">
              {workExp.map((exp, index) => (
                <div key={index} className="border-l-4 border-green-500 pl-6">
                  <h3 className="font-semibold text-lg text-gray-900">{exp.company_name || exp.COMPANY_NAME}</h3>
                  <p className="text-green-600 font-medium">{exp.position || exp.JOB_TITLE}</p>
                  <p className="text-gray-600 text-sm">
                    {(exp.start_date || exp.START_DATE) || ''} - {(exp.end_date || exp.END_DATE) || 'Present'}
                  </p>
                  <p className="text-gray-700 mt-2">{exp.description || exp.DESCRIPTION}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Specialties and Fees Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-bold text-lg text-green-800 mb-4">Special Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {specialtiesArr.map((spec, idx) => (
                <span key={idx} className="bg-green-50 border border-green-200 rounded-full px-4 py-2 text-green-700 font-medium text-sm">
                  {spec}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-bold text-lg text-green-800 mb-4">Consultation Fees</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between bg-green-50 rounded-lg px-4 py-3">
                <div>
                  <div className="font-semibold text-green-900">Remote Consultation</div>
                  <div className="text-gray-600 text-sm">Video call or phone consultation</div>
                </div>
                <div className="text-green-700 font-bold text-xl">
                  ₹{hourlyRate || '5,000'} <span className="text-base font-normal">per hour</span>
                </div>
              </div>
              <div className="flex items-center justify-between bg-blue-50 rounded-lg px-4 py-3">
                <div>
                  <div className="font-semibold text-blue-900">On-site Visit</div>
                  <div className="text-gray-600 text-sm">Physical visit to your tea estate</div>
                </div>
                <div className="text-blue-700 font-bold text-xl">
                  ₹{onSiteVisitFees || '15,000'} <span className="text-base font-normal">per day</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h3 className="font-bold text-lg text-green-800 mb-4 flex items-center gap-2">
            <Star className="h-6 w-6 text-yellow-500" /> Customer Reviews
          </h3>
          <div className="space-y-4">
            {(!Array.isArray(expertReviewsList) || expertReviewsList.length === 0) ? (
              <div className="text-gray-500 text-sm">No reviews yet.</div>
            ) : (
              <>
                {expertReviewsList.slice(0, visibleReviews).map((review, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-lg p-4 border">
                    <div className="font-semibold text-gray-900 flex items-center gap-2">
                      {review.FULL_NAME}
                      <span className="text-yellow-500"><Star className="inline h-4 w-4" /></span>
                      {review.CREATED_AT && (
                        <span className="text-gray-500 text-xs">
                          {String(review.CREATED_AT).slice(0, 10)}
                        </span>
                      )}
                    </div>
                    <div className="text-gray-700 text-sm mt-1">{review.MESSAGE}</div>
                  </div>
                ))}
                {visibleReviews < expertReviewsList.length && (
                  <button
                    onClick={() => setVisibleReviews(Math.min(visibleReviews + 2, expertReviewsList.length))}
                    className="flex flex-col items-center mx-auto mt-2 focus:outline-none"
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    <span className="text-gray-700 mb-1">View More</span>
                    <svg width="40" height="40" viewBox="0 0 40 40">
                      <polyline points="10,15 20,25 30,15" fill="none" stroke="#10b981" strokeWidth="3" />
                    </svg>
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Available Slots Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h3 className="font-bold text-lg text-green-800 mb-4 flex items-center gap-2">
            <Calendar className="h-6 w-6 text-green-600" /> Available Slots
          </h3>
          {loadingSlots ? (
            <div className="text-gray-500">Loading available slots...</div>
          ) : slotsError ? (
            <div className="text-red-600">{slotsError}</div>
          ) : slots.length === 0 ? (
            <div className="text-gray-500">No available slots.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {slots.map(slot => {
                // Format date and time
                const dateObj = new Date(slot.AVAILABLE_DATE);
                const formattedDate = dateObj.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
                const [h, m, s] = slot.AVAILABLE_TIME.split(":");
                const d = new Date();
                d.setHours(h, m, s || 0, 0);
                const formattedTime = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
                return (
                  <div key={slot.SLOT_ID} className="bg-green-50 rounded-lg p-4 flex flex-col items-center">
                    <div className="font-semibold text-green-700 mb-2">{formattedDate}</div>
                    <span className="bg-white rounded-full px-3 py-1 text-green-700 text-sm">
                      {formattedTime} {slot.SLOT_LABEL ? `- ${slot.SLOT_LABEL}` : ''}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Booking Form Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="font-bold text-lg text-green-800 mb-4">Book a Consultation Slot</h3>
          <BookingForm slots={slots} />
        </div>

        {/* Review Form Modal */}
        {/* This block is removed as per the edit hint to move ReviewForm to a card */}
      </div>

      <Footer />
    </div>
  );
};

// Helper function for date formatting
function prettyDate(date) {
  const [year, month, day] = date.split('-');
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return `${monthNames[parseInt(month, 10) - 1]} ${parseInt(day, 10)}, ${year}`;
}

// Booking Form Component
function BookingForm({ slots }) {
  const [form, setForm] = React.useState({
    FULL_NAME: '',
    EMAIL: '',
    PHONE: '',
    MESSAGE: '',
    ADDRESS: '',
    SLOT_ID: '',
  });
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(null);
  const [error, setError] = React.useState(null);

  // Group slots by date for the date picker
  const slotDates = Array.from(new Set(slots.map(slot => slot.AVAILABLE_DATE.slice(0, 10))));
  const [selectedDate, setSelectedDate] = React.useState('');
  const availableTimes = selectedDate
    ? slots.filter(slot => slot.AVAILABLE_DATE.slice(0, 10) === selectedDate)
    : [];

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDateChange = e => {
    setSelectedDate(e.target.value);
    setForm({ ...form, SLOT_ID: '' }); // Reset time selection
  };

  const handleTimeChange = e => {
    setForm({ ...form, SLOT_ID: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      // Find the selected slot
      const selectedSlot = slots.find(slot => slot.SLOT_ID.toString() === form.SLOT_ID);
      if (!selectedSlot) {
        setError('Please select a valid date and time slot.');
        setLoading(false);
        return;
      }
      const bookingPayload = {
        FULL_NAME: form.FULL_NAME,
        EMAIL: form.EMAIL,
        PHONE: form.PHONE,
        MESSAGE: form.MESSAGE,
        ADDRESS: form.ADDRESS,
        BOOKED_SLOT: `${selectedSlot.AVAILABLE_DATE.slice(0, 10)} ${selectedSlot.AVAILABLE_TIME}`,
        SLOT_ID: selectedSlot.SLOT_ID,
      };
      const res = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Booking successful!');
        setForm({ FULL_NAME: '', EMAIL: '', PHONE: '', MESSAGE: '', ADDRESS: '', SLOT_ID: '' });
        setSelectedDate('');
      } else {
        setError(data.error || 'Booking failed.');
      }
    } catch (err) {
      setError('Network error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="FULL_NAME"
          value={form.FULL_NAME}
          onChange={handleChange}
          placeholder="Full Name"
          required
          className="border rounded px-3 py-2 w-full"
        />
        <input
          type="email"
          name="EMAIL"
          value={form.EMAIL}
          onChange={handleChange}
          placeholder="Email"
          required
          className="border rounded px-3 py-2 w-full"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="tel"
          name="PHONE"
          value={form.PHONE}
          onChange={handleChange}
          placeholder="Phone Number"
          required
          className="border rounded px-3 py-2 w-full"
        />
        <input
          type="text"
          name="ADDRESS"
          value={form.ADDRESS}
          onChange={handleChange}
          placeholder="Address"
          className="border rounded px-3 py-2 w-full"
        />
      </div>
      <textarea
        name="MESSAGE"
        value={form.MESSAGE}
        onChange={handleChange}
        placeholder="Additional Message (Optional)"
        rows={3}
        className="border rounded px-3 py-2 w-full"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select value={selectedDate} onChange={handleDateChange} required className="border rounded px-3 py-2 w-full">
          <option value="">Select Date</option>
          {slotDates.map(date => (
            <option key={date} value={date}>{date}</option>
          ))}
        </select>
        <select name="SLOT_ID" value={form.SLOT_ID} onChange={handleTimeChange} required className="border rounded px-3 py-2 w-full" disabled={!selectedDate}>
          <option value="">Select Time</option>
          {availableTimes.map(slot => {
            // Convert "22:30:00" to "10:30 PM"
            const [h, m] = slot.AVAILABLE_TIME.split(":");
            const d = new Date();
            d.setHours(h, m, 0, 0);
            const formattedTime = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
            return (
              <option key={slot.SLOT_ID} value={slot.SLOT_ID}>{formattedTime}</option>
            );
          })}
        </select>
      </div>
      <button type="submit" disabled={loading} className="bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 transition-all">
        {loading ? 'Booking...' : 'Book Slot'}
      </button>
      {success && <div className="text-green-700 font-medium">{success}</div>}
      {error && <div className="text-red-600 font-medium">{error}</div>}
    </form>
  );
}

// Review Form Component
function ReviewForm({ expert, onClose }) {
  const [form, setForm] = React.useState({
    FULL_NAME: '',
    PHONE: '',
    EMAIL: '',
    MESSAGE: ''
  });
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(null);
  const [error, setError] = React.useState(null);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      const res = await fetch(`http://localhost:5000/api/experts/${expert.id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Review submitted successfully!');
        setForm({ FULL_NAME: '', PHONE: '', EMAIL: '', MESSAGE: '' });
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setError(data.error || 'Failed to submit review.');
      }
    } catch (err) {
      setError('Network error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="FULL_NAME"
        value={form.FULL_NAME}
        onChange={handleChange}
        placeholder="Your Name"
        required
        className="border rounded px-3 py-2 w-full"
      />
      <input
        type="tel"
        name="PHONE"
        value={form.PHONE}
        onChange={handleChange}
        placeholder="Phone Number"
        required
        className="border rounded px-3 py-2 w-full"
      />
      <input
        type="email"
        name="EMAIL"
        value={form.EMAIL}
        onChange={handleChange}
        placeholder="Email"
        required
        className="border rounded px-3 py-2 w-full"
      />
      <textarea
        name="MESSAGE"
        value={form.MESSAGE}
        onChange={handleChange}
        placeholder="Your Review"
        rows={4}
        required
        className="border rounded px-3 py-2 w-full"
      />
      <button type="submit" disabled={loading} className="bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 transition-all w-full">
        {loading ? 'Submitting...' : 'Submit Review'}
      </button>
      {success && <div className="text-green-700 font-medium">{success}</div>}
      {error && <div className="text-red-600 font-medium">{error}</div>}
    </form>
  );
}

export default ProductDetailPage; 