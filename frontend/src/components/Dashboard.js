import React, { useState } from 'react';
import AddEmployee from './AddEmployee';
import EmployeeList from './EmployeeList';
import Statistics from './Statistics';

function Dashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('list');

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Employee Management System</h1>
        <div className="user-info">
          <span>Welcome, <strong>{user.username}</strong></span>
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </div>
      </div>

      <div className="tabs">
        <button 
          className={`tab-btn ${activeTab === 'list' ? 'active' : ''}`}
          onClick={() => setActiveTab('list')}
        >
          Employee List
        </button>
        <button 
          className={`tab-btn ${activeTab === 'add' ? 'active' : ''}`}
          onClick={() => setActiveTab('add')}
        >
          Add Employee
        </button>
        <button 
          className={`tab-btn ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          Statistics
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'list' && <EmployeeList userRole={user.role} />}
        {activeTab === 'add' && <AddEmployee />}
        {activeTab === 'stats' && <Statistics />}
      </div>
    </div>
  );
}

export default Dashboard;
