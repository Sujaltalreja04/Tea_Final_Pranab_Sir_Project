import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchBookings, updateBooking, deleteBooking } from '../services/api';
import { FaSearch, FaPlus } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';

const API_URL = 'http://65.2.59.140:5001';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  background: none;
  background-color: transparent;
`;

const CenteredMainContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: none;
  background-color: transparent;
`;

const BigCard = styled.div`
  background: white;
  border-radius: 32px;
  padding: 64px 48px;
  box-shadow: 0 12px 48px rgba(0,0,0,0.12);
  min-width: 700px;
  max-width: 1100px;
  width: 100%;
  margin: 48px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 900px) {
    min-width: 0;
    max-width: 98vw;
    padding: 32px 8px;
  }
`;

const Card3D = styled.div`
  background: white;
  border-radius: 40px;
  padding: 80px 64px;
  box-shadow: 0 16px 64px rgba(0,0,0,0.14), 0 4px 16px rgba(34,197,94,0.13);
  min-width: 900px;
  max-width: 700px;
  width: 100%;
  margin: 64px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s, box-shadow 0.2s;
  will-change: transform;
  &:hover {
    box-shadow: 0 32px 96px rgba(34, 197, 94, 0.18), 0 8px 32px rgba(34,197,94,0.13);
    transform: scale(1.01);
  }
`;
const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 8px;
  background: white;
`;
const Th = styled.th`
  color: #14532d;
  font-size: 1.4rem;
  font-weight: 900;
  padding: 28px 18px;
  background: #f8f9fa;
  border-bottom: 2.5px solid #eaeaea;
  text-align: left;
`;
const Td = styled.td`
  color: #222;
  font-size: 1.18rem;
  padding: 24px 18px;
  border-bottom: 1.5px solid #f3f3f3;
`;
const Tr = styled.tr`
  &:hover {
    background:rgba(209, 201, 40, 0.18);
    transition: background 0.2s;
  }
`;
const ActionButton = styled.button`
  background: #14532d;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  margin: 0 4px;
  font-size: 1rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  &:hover {
    background: #15803d;
  }
`;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.3);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Modal = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 32px;
  min-width: 400px;
  max-width: 95vw;
  box-shadow: 0 4px 24px rgba(34, 197, 94, 0.15);
`;
const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 18px;
`;
const Label = styled.label`
  color: #14532d;
  font-weight: 600;
  font-size: 1rem;
`;
const Input = styled.input`
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1.05rem;
  background: #f8f9fa;
  transition: all 0.2s;
  &:focus {
    outline: none;
    border-color: #22c55e;
    background: #fff;
  }
`;

function formatTime12h(timeStr) {
  if (!timeStr) return '-';
  // Handles both 'HH:MM:SS' and 'HH:MM' formats
  const [h, m] = timeStr.split(':');
  let hour = parseInt(h, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12;
  if (hour === 0) hour = 12;
  return `${hour}:${m} ${ampm}`;
}

function formatDateTimeSimple(dateTimeStr) {
  if (!dateTimeStr) return '-';
  // Replace space with T for ISO compatibility
  const date = new Date(dateTimeStr.replace(' ', 'T'));
  if (isNaN(date.getTime())) return dateTimeStr; // fallback if invalid
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };
  return date.toLocaleString(undefined, options);
}

function toDatetimeLocalValue(dateTimeStr) {
  if (!dateTimeStr) return '';
  // Accepts 'YYYY-MM-DD HH:MM:SS', 'YYYY-MM-DDTHH:MM:SS', or similar
  let d = new Date(dateTimeStr.replace(' ', 'T'));
  if (isNaN(d.getTime())) return '';
  // Pad month, day, hour, minute
  const pad = n => n.toString().padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function Booking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editIdx, setEditIdx] = useState(null);
  const [editForm, setEditForm] = useState({ FULL_NAME: '', EMAIL: '', PHONE: '', MESSAGE: '', BOOKED_SLOT: '' });
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState({ FULL_NAME: '', EMAIL: '', PHONE: '', MESSAGE: '' });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchBookings()
      .then(data => {
        setBookings(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch bookings');
        setLoading(false);
      });
  }, []);

  // Filter bookings based on search query
  const filteredBookings = bookings.filter(booking => {
    const q = searchQuery.toLowerCase();
    return (
      booking.FULL_NAME?.toLowerCase().includes(q) ||
      booking.EMAIL?.toLowerCase().includes(q) ||
      booking.STATUS?.toLowerCase().includes(q)
    );
  });

  const handleEdit = idx => {
    setEditIdx(idx);
    let slot = bookings[idx].BOOKED_SLOT;
    let slotValue = '';
    if (slot) {
      if (Array.isArray(slot)) slot = slot[0];
      slotValue = toDatetimeLocalValue(slot);
    }
    setEditForm({ ...bookings[idx], BOOKED_SLOT: slotValue });
    setShowModal(true);
  };

  const handleEditChange = e => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSave = async e => {
    e.preventDefault();
    try {
      // Convert BOOKED_SLOT to DB format if present
      let slot = editForm.BOOKED_SLOT;
      let slotValue = slot;
      if (slot) {
        // Convert 'YYYY-MM-DDTHH:MM' to 'YYYY-MM-DD HH:MM:00'
        slotValue = slot.replace('T', ' ') + ':00';
      }
      await updateBooking(bookings[editIdx].ID, { ...editForm, BOOKED_SLOT: slotValue });
      const updated = [...bookings];
      updated[editIdx] = { ...editForm, ID: bookings[editIdx].ID, BOOKED_SLOT: slotValue };
      setBookings(updated);
      setShowModal(false);
    } catch {
      alert('Failed to update booking');
    }
  };

  const handleDelete = async idx => {
    if (!window.confirm('Delete this booking?')) return;
    try {
      await deleteBooking(bookings[idx].ID);
      setBookings(bookings.filter((_, i) => i !== idx));
    } catch {
      alert('Failed to delete booking');
    }
  };

  // Add Booking logic
  const handleAddChange = e => {
    setAddForm({ ...addForm, [e.target.name]: e.target.value });
  };

  const handleAddSave = async e => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addForm)
      });
      if (!res.ok) throw new Error('Failed to add booking');
      const data = await res.json();
      setBookings([{ ...addForm, ID: data.id }, ...bookings]);
      setShowAddModal(false);
      setAddForm({ FULL_NAME: '', EMAIL: '', PHONE: '', MESSAGE: '' });
    } catch {
      alert('Failed to add booking');
    }
  };

  const [activeSection, setActiveSection] = useState('expert-booking');

  return (
    <DashboardContainer>
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <CenteredMainContent>
        <BigCard>
          <Card3D>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: 24 }}>
        <span style={{ fontSize: '2rem', fontWeight: 700, color: '#333' }}>Booking List</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            style={{
              background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
              color: 'white',
              border: 'none',
              padding: '10px 24px',
              borderRadius: 8,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontWeight: 600,
              fontSize: 16
            }}
            onClick={() => setShowAddModal(true)}
          >
            <FaPlus style={{ fontSize: 16 }} /> Add Booking
          </button>
          <div style={{ display: 'flex', alignItems: 'center', border: '2px solid #22c55e', borderRadius: 8, padding: '0 10px', background: '#fff', height: 40 }}>
            <FaSearch style={{ color: '#888', fontSize: 18, marginRight: 6 }} />
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ border: 'none', outline: 'none', fontSize: 16, width: 220, background: 'transparent' }}
            />
          </div>
        </div>
      </div>
      {loading ? (
        <div style={{ color: '#14532d', padding: 32, fontSize: '1.3rem' }}>Loading...</div>
      ) : error ? (
        <div style={{ color: 'red', padding: 32, fontSize: '1.3rem' }}>{error}</div>
      ) : (
        <Table>
          <thead>
            <Tr>
              <Th>Full Name</Th>
              <Th>Phone</Th>
              <Th>Email</Th>
              <Th>Message</Th>
              <Th>Time</Th>
              <Th>Action</Th>
            </Tr>
          </thead>
          <tbody>
            {filteredBookings.length === 0 ? (
              <Tr><Td colSpan={6} style={{ textAlign: 'center', color: '#888', fontSize: '1.2rem' }}>No bookings found.</Td></Tr>
            ) : filteredBookings.map((row, idx) => (
              <Tr key={row.ID}>
                <Td>{row.FULL_NAME}</Td>
                <Td>{row.PHONE}</Td>
                <Td>{row.EMAIL}</Td>
                <Td>{row.MESSAGE}</Td>
                <Td>
                  {row.BOOKED_SLOT
                    ? (Array.isArray(row.BOOKED_SLOT)
                        ? row.BOOKED_SLOT.map((slot, i) => (
                            <div key={i}>{formatDateTimeSimple(slot)}</div>
                          ))
                        : formatDateTimeSimple(row.BOOKED_SLOT))
                    : '-'}
                </Td>
                <Td>
                  <ActionButton onClick={() => handleEdit(idx)}>Edit</ActionButton>
                  <ActionButton onClick={() => handleDelete(idx)} style={{ background: '#e53935' }}>Delete</ActionButton>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      )}
      {showModal && (
        <ModalOverlay>
          <Modal>
            <form onSubmit={handleEditSave}>
              <FormGroup>
                <Label>Full Name</Label>
                <Input name="FULL_NAME" value={editForm.FULL_NAME} onChange={handleEditChange} required />
              </FormGroup>
              <FormGroup>
                <Label>Phone</Label>
                <Input name="PHONE" value={editForm.PHONE} onChange={handleEditChange} required />
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <Input name="EMAIL" value={editForm.EMAIL} onChange={handleEditChange} required />
              </FormGroup>
              <FormGroup>
                <Label>Message</Label>
                <Input name="MESSAGE" value={editForm.MESSAGE} onChange={handleEditChange} required />
              </FormGroup>
              <FormGroup>
                <Label>Booked Slot (Date & Time)</Label>
                <Input
                  name="BOOKED_SLOT"
                  type="datetime-local"
                  value={editForm.BOOKED_SLOT || ''}
                  onChange={handleEditChange}
                />
              </FormGroup>
              <div style={{ display: 'flex', gap: 16, marginTop: 24, justifyContent: 'flex-end' }}>
                <ActionButton type="button" onClick={() => setShowModal(false)} style={{ background: '#e53935' }}>Cancel</ActionButton>
                <ActionButton type="submit" style={{ background: '#15803d' }}>Save</ActionButton>
              </div>
            </form>
          </Modal>
        </ModalOverlay>
      )}
      {showAddModal && (
        <ModalOverlay>
          <Modal>
            <form onSubmit={handleAddSave}>
              <FormGroup>
                <Label>Full Name</Label>
                <Input name="FULL_NAME" value={addForm.FULL_NAME} onChange={handleAddChange} required />
              </FormGroup>
              <FormGroup>
                <Label>Phone</Label>
                <Input name="PHONE" value={addForm.PHONE} onChange={handleAddChange} required />
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <Input name="EMAIL" value={addForm.EMAIL} onChange={handleAddChange} required />
              </FormGroup>
              <FormGroup>
                <Label>Message</Label>
                <Input name="MESSAGE" value={addForm.MESSAGE} onChange={handleAddChange} required />
              </FormGroup>
              <div style={{ display: 'flex', gap: 16, marginTop: 24, justifyContent: 'flex-end' }}>
                <ActionButton type="button" onClick={() => setShowAddModal(false)} style={{ background: '#e53935' }}>Cancel</ActionButton>
                <ActionButton type="submit" style={{ background: '#15803d' }}>Add</ActionButton>
              </div>
            </form>
          </Modal>
        </ModalOverlay>
      )}
          </Card3D>
        </BigCard>
      </CenteredMainContent>
    </DashboardContainer>
  );
}

export default Booking; 