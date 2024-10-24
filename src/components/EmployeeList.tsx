import React, { useEffect, useState } from 'react';
import './EmployeeList.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Employee } from './Employee';

interface EmployeeListProps {
  onDeleteEmployee: (id: number) => void; // Function to handle employee deletion
}

const EmployeeList: React.FC<EmployeeListProps> = ({ onDeleteEmployee }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'salary'>('name');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:3003/api/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleDeleteEmployee = async (id: number) => {
    if (id === undefined) return; // Ensure id is defined
    try {
      await axios.delete(`http://localhost:3003/api/employees/${id}`);
      setEmployees(prevEmployees => prevEmployees.filter(employee => employee.id !== id));
      onDeleteEmployee(id); // Call the passed delete function
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(a.dateOfJoining).getTime() - new Date(b.dateOfJoining).getTime();
    } else if (sortBy === 'salary') {
      return a.salary - b.salary;
    } else {
      return a.name.localeCompare(b.name);
    }
  });

  const indexOfLastEmployee = currentPage * itemsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - itemsPerPage;
  const currentEmployees = sortedEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);
  const totalPages = Math.ceil(sortedEmployees.length / itemsPerPage);

  return (
    <div>
      <h2>Employee List</h2>
      <div className="header-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="button" className="search-button">
            Search
          </button>
        </div>
        <Link to="/add">
          <button type='button' className="add-button">Add Employee</button>
        </Link>
      </div>
      <div className="sort-buttons">
        <button onClick={() => setSortBy('date')} className="sort-button">Sort by Date</button>
        <button onClick={() => setSortBy('salary')} className="sort-button">Sort by Salary</button>
      </div>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Manager</th>
            <th>Salary</th>
            <th>Date of Joining</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td>{employee.department}</td>
              <td>{employee.designation}</td>
              <td>{employee.manager}</td>
              <td>{employee.salary}</td>
              <td>{employee.dateOfJoining}</td>
              <td>{employee.location}</td>
              <td>
                <Link to={`/edit/${employee.id}`}>
                  <button type='button' className="edit-button">Edit</button>
                </Link>
                <button 
                  type='button' 
                  className="delete-button" 
                  onClick={() => handleDeleteEmployee(employee.id!)} // Use non-null assertion
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmployeeList;
