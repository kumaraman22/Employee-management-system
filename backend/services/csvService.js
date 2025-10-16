import fs from 'fs';
import { readEmployees } from './employeeService.js';

export function exportToCSV() {
  try {
    const employees = readEmployees();
    
    if (employees.length === 0) {
      return { success: false, message: 'No employees to export' };
    }

    const headers = 'ID,Name,Department,Designation,Salary,Joining Date,Email\n';
    const rows = employees.map(emp => 
      `${emp.id},${emp.name},${emp.department},${emp.designation},${emp.salary},${emp.joiningDate},${emp.email}`
    ).join('\n');
    
    const csvContent = headers + rows;
    const filename = './data/employees_export.csv';
    fs.writeFileSync(filename, csvContent);
    
    return { success: true, filename };
  } catch (error) {
    return { success: false, message: 'Export failed' };
  }
}
