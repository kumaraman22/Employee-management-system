import React, { useState, useEffect } from 'react';

function Statistics() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/statistics');
      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.error('Error fetching statistics');
    }
  };

  const handleExport = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/export/csv');
      const data = await response.json();
      
      if (data.success) {
        alert('Data exported to backend/data/employees_export.csv');
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert('Export failed');
    }
  };

  if (!stats) return <div>Loading...</div>;

  return (
    <div>
      <h2>Employee Statistics</h2>
      
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Employees</h3>
          <p>{stats.totalEmployees}</p>
        </div>
        <div className="stat-card">
          <h3>Average Salary</h3>
          <p>₹{stats.averageSalary}</p>
        </div>
        <div className="stat-card">
          <h3>Highest Salary</h3>
          <p>₹{stats.highestSalary}</p>
        </div>
        <div className="stat-card">
          <h3>Lowest Salary</h3>
          <p>₹{stats.lowestSalary}</p>
        </div>
      </div>

      <div className="department-list">
        <h3>Department-wise Employee Count</h3>
        {Object.entries(stats.departmentCount).map(([dept, count]) => (
          <div key={dept} className="dept-item">
            <span>{dept}</span>
            <strong>{count} employees</strong>
          </div>
        ))}
      </div>

      <button className="export-btn" onClick={handleExport}>
        Export to CSV
      </button>
    </div>
  );
}

export default Statistics;
