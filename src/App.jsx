
// src/App.jsx
import React, { useState, useEffect } from 'react';
import UpdateItem from './components/UpdateItem';

const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

function App() {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const doorId = "1"; // Replace with dynamic ID if needed

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`${API_URI}/${doorId}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setItem(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [API_URI, doorId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{`Failed to load item: ${error}`}</div>;

  return (
    <div className="App">
      <h1>Update Door Item</h1>
      <UpdateItem item={item} setItem={setItem} />
    </div>
  );
}

export default App;
