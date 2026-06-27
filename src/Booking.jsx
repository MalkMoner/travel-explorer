import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Booking.module.css';

const DESTINATIONS = [
  'Cairo, Egypt (CAI)',
  'Sharm El Sheikh, Egypt (SSH)',
  'Hurghada, Egypt (HRG)',
  'Alexandria, Egypt (HBE)',
  'Dahab, Egypt',
  'Ain Sokhna, Egypt',
  'Maldives (MLE)',
  'Bali, Indonesia (DPS)',
  'Santorini, Greece (JTR)',
  'Phuket, Thailand (HKT)',
  'Zanzibar, Tanzania (ZNZ)',
];

const HOTEL_STARS = ['Any', '3 Stars', '4 Stars', '5 Stars'];

const initialFlight = {
  from: '',
  to: '',
  departDate: '',
  returnDate: '',
  passengers: '1',
  flightClass: 'Economy',
};

const initialHotel = {
  destination: '',
  checkIn: '',
  checkOut: '',
  rooms: '1',
  guests: '1',
  stars: 'Any',
};

export default function Booking() {
  const [activeTab, setActiveTab] = useState('flight');
  const [flight, setFlight] = useState(initialFlight);
  const [hotel, setHotel] = useState(initialHotel);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleFlightChange = (e) => {
    setFlight({ ...flight, [e.target.name]: e.target.value });
  };

  const handleHotelChange = (e) => {
    setHotel({ ...hotel, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsConfirmed(true);
    }, 2000);
  };

  const handleNewBooking = () => {
    setIsConfirmed(false);
    setFlight(initialFlight);
    setHotel(initialHotel);
    setActiveTab('flight');
  };

  /* ── Boarding-Pass Confirmation Screen ── */
  if (isConfirmed) {
    const dest = activeTab === 'flight' ? flight.to : hotel.destination;
    const date = activeTab === 'flight' ? flight.departDate : hotel.checkIn;

    return (
      <div className={styles.confirmWrapper}>
        <div className={styles.confirmTicket}>
          <div className={styles.ticketLeft}>
            <div className={styles.ticketAirline}>TRAVEL EXPLORER</div>
            <div className={styles.ticketRoute}>
              <div className={styles.ticketCode}>
                {activeTab === 'flight' ? (flight.from.slice(0, 3).toUpperCase() || 'HGA') : 'HGA'}
              </div>
              <div className={styles.ticketPlane}>✈</div>
              <div className={styles.ticketCode}>
                {dest.slice(0, 3).toUpperCase() || 'DST'}
              </div>
            </div>
            <div className={styles.ticketDetail}>
              <span>DATE</span>
              <strong>{date || '—'}</strong>
            </div>
            <div className={styles.ticketDetail}>
              <span>CLASS</span>
              <strong>{activeTab === 'flight' ? flight.flightClass : 'Standard'}</strong>
            </div>
            <div className={styles.ticketDetail}>
              <span>FLIGHT</span>
              <strong>TE-{Math.floor(1000 + Math.random() * 9000)}</strong>
            </div>
          </div>

          <div className={styles.ticketTear} />

          <div className={styles.ticketRight}>
            <div className={styles.ticketStatus}>CONFIRMED ✓</div>
            <div className={styles.ticketDest}>{dest || 'Your Destination'}</div>
            <div className={styles.ticketSeat}>SEAT 12A · GATE G-04</div>
            <div className={styles.ticketBarcode} />
            <div className={styles.ticketBarcodeLabel}>REF: TE{Date.now().toString().slice(-6)}</div>
          </div>
        </div>

        <div className={styles.confirmActions}>
          <p className={styles.confirmMsg}>
            🎉 Your booking request has been received! Our team will contact you shortly.
          </p>
          <div className={styles.confirmBtns}>
            <button onClick={handleNewBooking} className={styles.newBookingBtn}>
              Book Another Trip
            </button>
            <button onClick={() => navigate('/')} className={styles.homeBtn}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Loading Screen ── */
  if (isLoading) {
    return (
      <div className={styles.loadingWrapper}>
        <div className={styles.loadingCard}>
          <div className={styles.loadingPlane}>✈️</div>
          <h3>Processing Your Booking...</h3>
          <p>Securing your seat and preparing your ticket.</p>
          <div className={styles.loadingBar}><div className={styles.loadingBarFill} /></div>
        </div>
      </div>
    );
  }

  /* ── Main Booking Kiosk ── */
  return (
    <div className={styles.kioskWrapper}>

      {/* ── Airport Header ── */}
      <div className={styles.kioskHeader}>
        <div className={styles.headerGlow} />
        <div className={styles.headerContent}>
          <div className={styles.headerIcon}>🛫</div>
          <h1 className={styles.headerTitle}>BOOKING TERMINAL</h1>
          <p className={styles.headerSub}>Flight & Hotel — TE-2026 CHECK-IN SYSTEM</p>
        </div>
        {/* Scrolling departures board */}
        <div className={styles.departureBoard}>
          <span>DEPARTURES &nbsp;✦&nbsp; CAIRO &nbsp;✈&nbsp; SHARM &nbsp;✈&nbsp; BALI &nbsp;✈&nbsp; MALDIVES &nbsp;✈&nbsp; SANTORINI &nbsp;✈&nbsp; PHUKET &nbsp;✈&nbsp; DAHAB &nbsp;✦&nbsp; DEPARTURES</span>
        </div>
      </div>

      {/* ── Kiosk Screen ── */}
      <div className={styles.kioskScreen}>

        {/* Tab selector */}
        <div className={styles.tabRow}>
          <button
            className={`${styles.tabBtn} ${activeTab === 'flight' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('flight')}
          >
            ✈️ Flight
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'hotel' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('hotel')}
          >
            🏨 Hotel
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>

          {/* ── FLIGHT FORM ── */}
          {activeTab === 'flight' && (
            <div className={styles.formGrid}>
              <div className={styles.fieldGroup}>
                <label>FROM</label>
                <input
                  name="from"
                  type="text"
                  value={flight.from}
                  onChange={handleFlightChange}
                  placeholder="Departure city or airport..."
                  required
                />
              </div>

              <div className={styles.fieldGroup}>
                <label>TO</label>
                <select name="to" value={flight.to} onChange={handleFlightChange} required>
                  <option value="">Select destination...</option>
                  {DESTINATIONS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div className={styles.fieldGroup}>
                <label>DEPART DATE</label>
                <input
                  name="departDate"
                  type="date"
                  value={flight.departDate}
                  onChange={handleFlightChange}
                  required
                />
              </div>

              <div className={styles.fieldGroup}>
                <label>RETURN DATE</label>
                <input
                  name="returnDate"
                  type="date"
                  value={flight.returnDate}
                  onChange={handleFlightChange}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label>PASSENGERS</label>
                <select name="passengers" value={flight.passengers} onChange={handleFlightChange}>
                  {['1', '2', '3', '4', '5', '6+'].map((n) => (
                    <option key={n} value={n}>{n} Passenger{n !== '1' ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              <div className={styles.fieldGroup}>
                <label>CLASS</label>
                <select name="flightClass" value={flight.flightClass} onChange={handleFlightChange}>
                  {['Economy', 'Business', 'First Class'].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* ── HOTEL FORM ── */}
          {activeTab === 'hotel' && (
            <div className={styles.formGrid}>
              <div className={`${styles.fieldGroup} ${styles.fieldFull}`}>
                <label>DESTINATION</label>
                <select name="destination" value={hotel.destination} onChange={handleHotelChange} required>
                  <option value="">Select destination...</option>
                  {DESTINATIONS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div className={styles.fieldGroup}>
                <label>CHECK-IN</label>
                <input
                  name="checkIn"
                  type="date"
                  value={hotel.checkIn}
                  onChange={handleHotelChange}
                  required
                />
              </div>

              <div className={styles.fieldGroup}>
                <label>CHECK-OUT</label>
                <input
                  name="checkOut"
                  type="date"
                  value={hotel.checkOut}
                  onChange={handleHotelChange}
                  required
                />
              </div>

              <div className={styles.fieldGroup}>
                <label>ROOMS</label>
                <select name="rooms" value={hotel.rooms} onChange={handleHotelChange}>
                  {['1', '2', '3', '4', '5+'].map((n) => (
                    <option key={n} value={n}>{n} Room{n !== '1' ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              <div className={styles.fieldGroup}>
                <label>GUESTS</label>
                <select name="guests" value={hotel.guests} onChange={handleHotelChange}>
                  {['1', '2', '3', '4', '5', '6+'].map((n) => (
                    <option key={n} value={n}>{n} Guest{n !== '1' ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              <div className={styles.fieldGroup}>
                <label>HOTEL STARS</label>
                <select name="stars" value={hotel.stars} onChange={handleHotelChange}>
                  {HOTEL_STARS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* ── Submit ── */}
          <button type="submit" className={styles.submitBtn}>
            <i className="fas fa-ticket-alt" />
            {activeTab === 'flight' ? ' ISSUE BOARDING PASS' : ' RESERVE ROOM'}
          </button>

        </form>
      </div>
    </div>
  );
}
