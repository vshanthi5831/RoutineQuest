import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Ring = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.warn('No token found. User might not be logged in.');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/users/getUser', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Fetched user data:', response.data);
        setUserData(response.data);
      } catch (err) {
        console.error('Failed to fetch user:', err);
      }
    };

    fetchUser();
  }, []);

  if (!userData || typeof userData.points !== 'number') {
    console.warn('User data not ready or points missing.');
    return null; // You can return a loader here instead if desired
  }

  const progressPoints = userData.points;
  const remainingPoints = Math.max(0, 500 - progressPoints);

  const data = {
    labels: ['Points Earned', 'Remaining to 500'],
    datasets: [
      {
        data: [progressPoints, remainingPoints],
        backgroundColor: ['#168d8f', '#e0e0e0'],
        borderWidth: 1,
      },
    ],
  };

  console.log('Chart data:', data);

  return (
    <div style={{ width: '300px', height: '300px', margin: 'auto' }}>
      <h3 style={{ textAlign: 'center' }}>{userData.username}'s Progress</h3>
      <Doughnut data={data} />
    </div>
  );
};

export default Ring;
