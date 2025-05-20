import React, { useEffect, useState } from 'react';
import Dashboard from './Dashboard';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="home-container">
      <h1 className= "brand" >RoutineQuest</h1>
      <h3 className="home-subheading">Slay Procrastination like a Boss!!</h3>
      {isLoggedIn ? (
        <Dashboard />
      ) : (
        <div className="home-box-custom">
          <h2 className="home-heading">Welcome to Routine Quest!</h2>
          <p className="home-description">
            Your personal habit tracking and productivity booster tool.
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
