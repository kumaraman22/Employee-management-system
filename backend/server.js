import express from 'express';
import cors from 'cors';
import * as employeeService from './services/employeeService.js';
import * as authService from './services/authService.js';
import * as csvService from './services/csvService.js';

const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json());


app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const result = authService.login(username, password);
  res.json(result);
});

app.get('/api/employees', (req, res) => {
  const employees = employeeService.readEmployees();
  res.json(employees);
});

// Add employee
app.post('/api/employees', (req, res) => {
  const result = employeeService.addEmployee(req.body);
  res.json(result);
});

// Update employee
app.put('/api/employees/:id', (req, res) => {
  const result = employeeService.updateEmployee(req.params.id, req.body);
  res.json(result);
});

// Delete employee
app.delete('/api/employees/:id', (req, res) => {
  const result = employeeService.deleteEmployee(req.params.id);
  res.json(result);
});


app.get('/api/statistics', (req, res) => {
  const stats = employeeService.getStatistics();
  res.json(stats);
});


app.get('/api/search/department/:dept', (req, res) => {
  const employees = employeeService.searchByDepartment(req.params.dept);
  res.json(employees);
});

app.get('/api/search/salary', (req, res) => {
  const { min, max } = req.query;
  const employees = employeeService.searchBySalaryRange(parseFloat(min), parseFloat(max));
  res.json(employees);
});

app.get('/api/export/csv', (req, res) => {
  const result = csvService.exportToCSV();
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
