import React, { useState, useEffect, useRef } from 'react';
import API from '../api';
import HabitList from '../components/HabitList';
import CreateHabit from '../components/CreateHabit';
import FilterHabits from '../components/FilterHabits';

const Dashboard = () => {
  console.log('Dashboard mounted!');

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [hasWelcomed, setHasWelcomed] = useState(false);
  const [habits, setHabits] = useState([]);
  const [filteredHabits, setFilteredHabits] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  const didMountRef = useRef(false);

  const fetchUserData = async () => {
    console.log('Fetching user data...');
    try {
      const response = await API.get('/users/getUser');
      if (response.data) {
        console.log('User data fetched:', response.data);
        setUser(response.data);
      }
      setLoading(false);
    } catch (error) {
      console.log('Error fetching user data:', error);
      setError('Failed to fetch user data');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.username && !hasWelcomed) {
      alert(`Welcome, ${user.username}!`);
      setHasWelcomed(true);
    }
  }, [user, hasWelcomed]);

  const fetchHabits = async () => {
    console.log('Fetching habits...');
    try {
      const response = await API.get('/habits/getHabits');
      if (response.data) {
        console.log('Habits fetched:', response.data);
        setHabits(response.data);
        setFilteredHabits([]); 
        setIsFiltered(false);
      }
    } catch (error) {
      console.error('Error fetching habits:', error);
    }
  };

  useEffect(() => {
    if (didMountRef.current) return;
    didMountRef.current = true;

    const fetchData = async () => {
      await fetchUserData();
      await fetchHabits();
    };

    fetchData();
  }, []);

  const handleFilter = (filteredResults) => {
    console.log('Applying filter...');
    setFilteredHabits(filteredResults);
    setIsFiltered(true);
  };

  const clearFilters = () => {
    console.log('Clearing filters...');
    setIsFiltered(false);
    setFilteredHabits([]);
  };

  const handleHabitCompletion = async (habitId) => {
    console.log('Updating habit completion...', habitId);
    try {
      await API.put(`/habits/updateHabits/${habitId}`, { completed: true });
      fetchHabits();
      fetchUserData();
    } catch (error) {
      console.error('Error updating habit:', error);
    }
  };

  return (
    <div className="dashboard-container">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
        <div>
          {/* User Info Block */}
          <div>
          {/* <div className="dashboard-info"> */}
            <h1 className= "brand" >RoutineQuest, {user.username}!</h1>
            {/* <h1>Hello, </h1> */}
            <h3><center>Points: {user.points}</center></h3>
          </div>

          <br />
          <br />

          {/* Habits List Block */}
          <div className="dashboard-habits-list">
            <h2>Your Habits</h2>
            <HabitList
              habits={isFiltered ? filteredHabits : habits}
              refreshHabits={fetchHabits}
              onHabitCompletion={handleHabitCompletion}
            />
          </div>

          {/* Create Habit Block */}
          <div className="dashboard-create-habit">
            <CreateHabit refreshHabits={fetchHabits} />
          </div>

          {/* Filter Block */}
          <div className="dashboard-filter">
            <FilterHabits habits={habits} onFilter={handleFilter} />

            {isFiltered && (
              <button
                onClick={clearFilters}
                className="clear-filters-button"
              >
                Clear Filters
              </button>
            )}
          </div>
          
        </div>
      )}
      </div>
  );
};

export default Dashboard;
