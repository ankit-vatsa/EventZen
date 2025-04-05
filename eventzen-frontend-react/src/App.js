import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Services from './pages/Services';
import Footer from './components/Footer';
import CustomerDashboard from './pages/customer/CustomerDashboard'; // adjust path as per your folder
import CustomerEvents from './pages/customer/CustomerEvents';
import CustomerBooking from './pages/customer/CustomerBooking';
import ManageBookings from './pages/customer/ManageBookings';
import CustomerProfile from './pages/customer/CustomerProfile';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUserManagement from './pages/admin/AdminUserManagement';
import AdminEvents from './pages/admin/events/AdminEvents';
import AdminVenues from './pages/admin/events/AdminVenues';
import AttendeeManagement from './pages/admin/events/AttendeeManagement';
import EventUserAttendeeFetcher from './pages/admin/events/EventUserAttendeeFetcher';
import AdminVendorManagement from './pages/admin/AdminVendorManagement';

// Inside <Routes> in App.js:
<Route path="/customer/manage-bookings" element={<ManageBookings />} />

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        <Route path="/customer/events" element={<CustomerEvents />} />
        <Route path="/customer/book" element={<CustomerBooking />} />
        <Route path="/customer/bookings" element={<ManageBookings />} />
        <Route path="/customer/profile" element={<CustomerProfile />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUserManagement />} />
        <Route path="/admin/events" element={<AdminEvents />} />
        <Route path="/admin/venues" element={<AdminVenues />} />
        <Route path="/admin/attendees" element={<AttendeeManagement />} />
        <Route path="/admin/attendeesevent" element={<EventUserAttendeeFetcher />} />
        <Route path="/admin/vendors" element={<AdminVendorManagement />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

// // src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import LandingPage from './pages/LandingPage';
// import LoginPage from './pages/LoginPage';
// import SignupPage from './pages/SignupPage';
// import AdminLoginPage from './pages/AdminLoginPage';
// import CustomerDashboard from './pages/customer/CustomerDashboard';
// import AdminDashboard from './pages/admin/AdminDashboard';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/signup" element={<SignupPage />} />
//         <Route path="/admin-login" element={<AdminLoginPage />} />
//         <Route path="/customer/dashboard" element={<CustomerDashboard />} />
//         <Route path="/admin/dashboard" element={<AdminDashboard />} />
//       </Routes>
//       <Footer />
//     </Router>
//   );
// }

// export default App;
