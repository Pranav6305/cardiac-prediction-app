import React, { useState } from 'react';
import './App.css';

const FoodUpdate = () => {
  const [mealType, setMealType] = useState('');
  const [foodItems, setFoodItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({ name: '', quantity: '', details: '' });

  const handleAddItem = () => {
    if (currentItem.name.trim() && currentItem.quantity.trim()) {
      setFoodItems([...foodItems, currentItem]);
      setCurrentItem({ name: '', quantity: '', details: '' });
    } else {
      alert("Please enter both food name and quantity.");
    }
  };

  const handleSubmitMeal = async () => {
    if (!mealType || foodItems.length === 0) {
      alert("Select meal type and add at least one item.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/food-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mealType,
          foodItems,
          timestamp: new Date()
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save meal');
      }

      const result = await response.json();
      alert('✅ Meal submitted successfully!');
      setMealType('');
      setFoodItems([]);
    } catch (error) {
      console.error("❌ Submission error:", error.message);
      alert("❌ Failed to submit meal");
    }
  };

  return (
    <div className="food-update-container">
      <h2>Log Your Meal</h2>

      <form className="food-update-form" onSubmit={(e) => e.preventDefault()}>
        <label>Meal Type:</label>
        <select value={mealType} onChange={(e) => setMealType(e.target.value)}>
          <option value="">Select meal type</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
        </select>

        <label>Food Name:</label>
        <input
          type="text"
          placeholder="Enter food name"
          value={currentItem.name}
          onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
        />

        <label>Quantity:</label>
        <input
          type="text"
          placeholder="Enter quantity"
          value={currentItem.quantity}
          onChange={(e) => setCurrentItem({ ...currentItem, quantity: e.target.value })}
        />

        <label>Details (optional):</label>
        <input
          type="text"
          placeholder="Enter extra details"
          value={currentItem.details}
          onChange={(e) => setCurrentItem({ ...currentItem, details: e.target.value })}
        />

        <div className="food-update-buttons">
          <button type="button" className="log-btn" onClick={handleAddItem}>Add Item</button>
          <button type="button" className="cancel-btn" onClick={() => setCurrentItem({ name: '', quantity: '', details: '' })}>Clear</button>
        </div>
      </form>

      <div className="meal-list">
        <h4>Meal Summary</h4>
        {foodItems.length === 0 ? (
          <p>No items added.</p>
        ) : (
          foodItems.map((item, idx) => (
            <div key={idx} className="meal-card">
              <h4>{item.name}</h4>
              <p>Quantity: {item.quantity}</p>
              {item.details && <p>Details: {item.details}</p>}
            </div>
          ))
        )}
      </div>

      <div className="food-update-buttons" style={{ justifyContent: 'center' }}>
        <button className="log-btn" onClick={handleSubmitMeal}>Submit Meal</button>
      </div>
    </div>
  );
};

export default FoodUpdate;
