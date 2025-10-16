import fs from 'fs';

const DATA_FILE = './data/employees.json';

// Read employees
export function readEmployees() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, '[]');
      return [];
    }
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Write employees
export function writeEmployees(employees) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(employees, null, 2));
    return true;
  } catch (error) {
    return false;
  }
}

// Generate ID
export function generateId() {
  const employees = readEmployees();
  if (employees.length === 0) return 1;
  const maxId = Math.max(...employees.map(emp => emp.id));
  return maxId + 1;
}

// Add employee
export function addEmployee(data) {
  const employees = readEmployees();
  const newEmployee = {
    id: generateId(),
    ...data
  };
  employees.push(newEmployee);
  writeEmployees(employees);
  return { success: true, employee: newEmployee };
}

// Update employee
export function updateEmployee(id, updates) {
  const employees = readEmployees();
  const index = employees.findIndex(emp => emp.id === parseInt(id));
  
  if (index === -1) {
    return { success: false, message: 'Employee not found' };
  }
  
  employees[index] = { ...employees[index], ...updates };
  writeEmployees(employees);
  return { success: true, employee: employees[index] };
}

// Delete employee
export function deleteEmployee(id) {
  const employees = readEmployees();
  const filtered = employees.filter(emp => emp.id !== parseInt(id));
  
  if (employees.length === filtered.length) {
    return { success: false, message: 'Employee not found' };
  }
  
  writeEmployees(filtered);
  return { success: true };
}

// Get statistics
export function getStatistics() {
  const employees = readEmployees();
  
  if (employees.length === 0) {
    return {
      totalEmployees: 0,
      averageSalary: 0,
      highestSalary: 0,
      lowestSalary: 0,
      departmentCount: {}
    };
  }

  const salaries = employees.map(emp => parseFloat(emp.salary));
  const departmentCount = {};
  
  employees.forEach(emp => {
    departmentCount[emp.department] = (departmentCount[emp.department] || 0) + 1;
  });

  return {
    totalEmployees: employees.length,
    averageSalary: (salaries.reduce((a, b) => a + b, 0) / salaries.length).toFixed(2),
    highestSalary: Math.max(...salaries),
    lowestSalary: Math.min(...salaries),
    departmentCount
  };
}

// Search by department
export function searchByDepartment(department) {
  const employees = readEmployees();
  return employees.filter(emp => 
    emp.department.toLowerCase() === department.toLowerCase()
  );
}

// Search by salary range
export function searchBySalaryRange(minSalary, maxSalary) {
  const employees = readEmployees();
  return employees.filter(emp => 
    parseFloat(emp.salary) >= minSalary && parseFloat(emp.salary) <= maxSalary
  );
}
