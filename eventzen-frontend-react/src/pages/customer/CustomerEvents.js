import React, { useEffect, useState } from 'react';

function CustomerEvents() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [location, setLocation] = useState('');

  // Fetch all events
  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:6005/api/events');
      const data = await response.json();
      console.log("Fetched Events:", data);  // ✅ Debug line
      setEvents(data);
      setFilteredEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Fetch events filtered by location
  const filterByLocation = async () => {
    if (!location) {
      // If no location is provided, fetch all events
      fetchEvents();
    } else {
      try {
        const response = await fetch(`http://localhost:6005/api/events/location/${location}`);
        const data = await response.json();
        setFilteredEvents(data);
      } catch (error) {
        console.error('Error filtering events by location:', error);
      }
    }
  };

  // Fetch events sorted by price
  const sortByPrice = async (order) => {
    try {
      const response = await fetch(`http://localhost:6005/api/events/sort/price?order=${order}`);
      const data = await response.json();
      setFilteredEvents(data);
    } catch (error) {
      console.error('Error sorting events by price:', error);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Explore Events</h2>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={fetchEvents} style={{ marginRight: '1rem' }}>
          See All Events
        </button>

        <input
          type="text"
          placeholder="Enter Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ marginRight: '0.5rem' }}
        />
        <button onClick={filterByLocation} style={{ marginRight: '1rem' }}>
          Filter by Location
        </button>

        <button onClick={() => sortByPrice('asc')} style={{ marginRight: '0.5rem' }}>
          Sort by Price (Low to High)
        </button>
        <button onClick={() => sortByPrice('desc')}>
          Sort by Price (High to Low)
        </button>
      </div>

      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Venue</th>
            <th>Location</th>
            <th>Date</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.map((event, index) => (
            <tr key={index}>
              <td>{event.eventName}</td>
              <td>{event.venueName}</td>
              <td>{event.venueLocation}</td>
              <td>{new Date(event.eventDate).toLocaleDateString()}</td>
              <td>₹{event.eventCost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerEvents;

// // src/pages/customer/CustomerEvents.jsx
// import React, { useEffect, useState } from 'react';

// function CustomerEvents() {
//   const [events, setEvents] = useState([]);
//   const [filteredEvents, setFilteredEvents] = useState([]);
//   const [location, setLocation] = useState('');

//   const fetchEvents = async () => {
//     try {
//       const response = await fetch('http://localhost:6005/api/events');
//       const data = await response.json();
//       console.log("Fetched Events:", data);  // ✅ Debug line
//       setEvents(data);
//       setFilteredEvents(data);
//     } catch (error) {
//       console.error('Error fetching events:', error);
//     }
//   };

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const filterByLocation = () => {
//     const filtered = events.filter((event) =>
//       event.venueLocation?.toLowerCase().includes(location.toLowerCase())
//     );
//     setFilteredEvents(filtered);
//   };

//   const sortByPrice = (order) => {
//     const sorted = [...filteredEvents].sort((a, b) =>
//       order === 'asc' ? a.eventCost - b.eventCost : b.eventCost - a.eventCost
//     );
//     setFilteredEvents(sorted);
//   };

//   return (
//     <div style={{ padding: '2rem' }}>
//       <h2>Explore Events</h2>

//       <div style={{ marginBottom: '1rem' }}>
//         <button onClick={fetchEvents} style={{ marginRight: '1rem' }}>
//           See All Events
//         </button>

//         <input
//           type="text"
//           placeholder="Enter Location"
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//           style={{ marginRight: '0.5rem' }}
//         />
//         <button onClick={filterByLocation} style={{ marginRight: '1rem' }}>
//           Filter by Location
//         </button>

//         <button onClick={() => sortByPrice('asc')} style={{ marginRight: '0.5rem' }}>
//           Sort by Price (Low to High)
//         </button>
//         <button onClick={() => sortByPrice('desc')}>
//           Sort by Price (High to Low)
//         </button>
//       </div>

//       <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
//         <thead>
//           <tr>
//             <th>Event Name</th>
//             <th>Venue</th>
//             <th>Location</th>
//             <th>Date</th>
//             <th>Price</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredEvents.map((event, index) => (
//             <tr key={index}>
//               <td>{event.eventName}</td>
//               <td>{event.venueName}</td>
//               <td>{event.venueLocation}</td>
//               <td>{new Date(event.eventDate).toLocaleDateString()}</td>
//               <td>₹{event.eventCost}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default CustomerEvents;
