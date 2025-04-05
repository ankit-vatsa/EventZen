import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import './LandingPage.css';
import Navbar from '../components/Navbar'; // Assuming you have this

const LandingPage = () => {
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const handleScrollOrClick = () => {
    setShowContent(true);
    navigate('/home'); // Navigate to /home when scroll or click happens
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Start at top of the page on load
    const handleScroll = () => setShowContent(true);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="landing-wrapper">
      {/* Hero Section - Fullscreen */}
      {!showContent && (
        <div
          className="hero-image"
          onClick={handleScrollOrClick}
        >
          <div className="hero-text">
            <button onClick={handleScrollOrClick}>Let's Go</button>
          </div>
        </div>
      )}

      {/* Add more sections/content if needed */}
    </div>
  );
};

export default LandingPage;
