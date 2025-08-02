import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchExperts, addExpert, updateExpert, fetchWorkExperience, addWorkExperience, updateWorkExperience, deleteWorkExperience, fetchTimeSlots, addTimeSlots, updateTimeSlot, deleteTimeSlot } from '../services/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function ExpertProfileEdit({ mode = 'add' }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [expert, setExpert] = useState({
    NAME: '', EMAIL: '', PHONE: '', TITLE: '', CATEGORY: '', EXPERTISE: '', SPECIALTIES: '', EXPERIENCE: '', REVIEWS: '', RATING: '', HOURLY_RATE: '', AVAILABILITY: '', RESPONSE_TIME: '', LOCATION: '', AGE: '', ON_SITE_VISIT_FEES: '', DESCRIPTION: '', IMAGE: ''
  });
  const [workExperiences, setWorkExperiences] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [loading, setLoading] = useState(mode === 'edit');
  const [error, setError] = useState('');

  useEffect(() => {
    if (mode === 'edit' && id) {
      setLoading(true);
      fetchExperts().then(data => {
        const found = data.find(e => String(e.ID) === String(id));
        if (found) setExpert(found);
      });
      fetchWorkExperience(id).then(setWorkExperiences);
      fetchTimeSlots(id).then(setTimeSlots);
      setLoading(false);
    }
  }, [mode, id]);

  const handleChange = e => {
    setExpert({ ...expert, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (mode === 'add') {
        await addExpert(expert);
      } else {
        await updateExpert(id, expert);
      }
      navigate('/experts');
    } catch (err) {
      setError('Failed to save expert');
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.10)', padding: 32 }}>
      <h2 style={{ fontWeight: 700, fontSize: '2.2rem', marginBottom: 24 }}>{mode === 'add' ? 'Add New Expert' : 'Edit Expert Profile'}</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label>Name</label>
            <input name="NAME" value={expert.NAME} onChange={handleChange} required style={{ padding: 14, borderRadius: 8, border: '1px solid #e0e0e0', fontSize: 16 }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label>Email</label>
            <input name="EMAIL" value={expert.EMAIL} onChange={handleChange} style={{ padding: 14, borderRadius: 8, border: '1px solid #e0e0e0', fontSize: 16 }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label>Phone</label>
            <input name="PHONE" value={expert.PHONE} onChange={handleChange} style={{ padding: 14, borderRadius: 8, border: '1px solid #e0e0e0', fontSize: 16 }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label>Title</label>
            <input name="TITLE" value={expert.TITLE} onChange={handleChange} style={{ padding: 14, borderRadius: 8, border: '1px solid #e0e0e0', fontSize: 16 }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label>Category</label>
            <input name="CATEGORY" value={expert.CATEGORY} onChange={handleChange} style={{ padding: 14, borderRadius: 8, border: '1px solid #e0e0e0', fontSize: 16 }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label>Expertise</label>
            <input name="EXPERTISE" value={expert.EXPERTISE} onChange={handleChange} style={{ padding: 14, borderRadius: 8, border: '1px solid #e0e0e0', fontSize: 16 }} />
          </div>
        </div>
        {/* Add more fields as needed, similar to the modal */}
        <div style={{ display: 'flex', gap: 16 }}>
          <button type="submit" style={{ background: '#22c55e', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 32px', fontWeight: 600, fontSize: 18 }}>{mode === 'add' ? 'Add Expert' : 'Save Changes'}</button>
          <button type="button" style={{ background: '#e53935', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 32px', fontWeight: 600, fontSize: 18 }} onClick={() => navigate('/experts')}>Cancel</button>
        </div>
        {error && <div style={{ color: 'red', marginTop: 12 }}>{error}</div>}
      </form>
    </div>
  );
}

export default ExpertProfileEdit; 