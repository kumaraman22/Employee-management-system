import React, { useState, useEffect } from 'react';

function EmployeeList({ userRole }) {
  const [employees, setEmployees] = useState([]);
  const [searchType, setSearchType] = useState('all');
  const [searchValue, setSearchValue] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/employees');
      const data = await response.json();
      setEmployees(data);
    } catch (err) {
      console.error('Error fetching employees');
    }
  };

  const handleSearch = async () => {
    if (searchType === 'all') {
      fetchEmployees();
      return;
    }

    try {
      let url = 'http://localhost:5000/api/employees';
      
      if (searchType === 'department') {
        url = `http://localhost:5000/api/search/department/${searchValue}`;
      } else if (searchType === 'salary') {
        const [min, max] = searchValue.split('-');
        url = `http://localhost:5000/api/search/salary?min=${min}&max=${max}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setEmployees(data);
    } catch (err) {
      console.error('Search error');
    }
  };

  const handleDelete = async (id) => {
    if (userRole !== 'admin') {
      alert('Only admin can delete employees');
      return;
    }

    if (window.confirm('Are you sure?')) {
      try {
        await fetch(`http://localhost:5000/api/employees/${id}`, {
          method: 'DELETE'
        });
        fetchEmployees();
      } catch (err) {
        console.error('Delete error');
      }
    }
  };

  const startEdit = (employee) => {
    if (userRole !== 'admin') {
      alert('Only admin can edit employees');
      return;
    }
    setEditingId(employee.id);
    setEditData(employee);
  };

  const saveEdit = async () => {
    try {
      await fetch(`http://localhost:5000/api/employees/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData)
      });
      setEditingId(null);
      fetchEmployees();
    } catch (err) {
      console.error('Update error');
    }
  };

  return (
    <div>
      <h2>Employee List</h2>
      
      <div className="search-bar">
        <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
          <option value="all">All Employees</option>
          <option value="department">By Department</option>
          <option value="salary">By Salary Range</option>
        </select>

        {searchType === 'department' && (
          <input
            type="text"
            placeholder="Enter department"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        )}

        {searchType === 'salary' && (
          <input
            type="text"
            placeholder="Enter range (e.g., 30000-50000)"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        )}

        <button className="search-btn" onClick={handleSearch}>Search</button>
      </div>

      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Salary</th>
            <th>Joining Date</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>
                {editingId === emp.id ? (
                  <input
                    value={editData.name}
                    onChange={(e) => setEditData({...editData, name: e.target.value})}
                  />
                ) : emp.name}
              </td>
              <td>
                {editingId === emp.id ? (
                  <input
                    value={editData.department}
                    onChange={(e) => setEditData({...editData, department: e.target.value})}
                  />
                ) : emp.department}
              </td>
              <td>
                {editingId === emp.id ? (
                  <input
                    value={editData.designation}
                    onChange={(e) => setEditData({...editData, designation: e.target.value})}
                  />
                ) : emp.designation}
              </td>
              <td>
                {editingId === emp.id ? (
                  <input
                    value={editData.salary}
                    onChange={(e) => setEditData({...editData, salary: e.target.value})}
                  />
                ) : emp.salary}
              </td>
              <td>{emp.joiningDate}</td>
              <td>{emp.email}</td>
              <td>
                {editingId === emp.id ? (
                  <>
                    <button className="action-btn edit-btn" onClick={saveEdit}>Save</button>
                    <button className="action-btn delete-btn" onClick={() => setEditingId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button className="action-btn edit-btn" onClick={() => startEdit(emp)}>Edit</button>
                    <button className="action-btn delete-btn" onClick={() => handleDelete(emp.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
