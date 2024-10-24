// src/components/AddEmployee.tsx
import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { Employee } from './Employee';
import './AddEmployee.css';
import axios from 'axios';



interface AddEmployeeProps {
  onAddEmployee: (employee: Employee) => void;
  onNavigate: (path: string) => void; // Add this line
}

interface AddEmployeeState {
  employee: Employee;
}

class AddEmployee extends Component<AddEmployeeProps, AddEmployeeState> {
  constructor(props: AddEmployeeProps) {
    super(props);
    this.state = {
      employee: {
       
        name: '',
        email: '',
        phone: '',
        department: '',
        designation: '',
        salary: 0,
        dateOfJoining: '',
        location: '',
        manager: '',
      },
    };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState({ employee: { ...this.state.employee, [name]: value } });
  };

  // handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   this.props.onAddEmployee(this.state.employee);
  //   this.props.onNavigate('/employees'); // Redirect to employee list
  // };
  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(this.state.employee); // Log the employee data being sent
  
      const response = await axios.post('http://localhost:3003/api/employees', this.state.employee);
      
      this.props.onAddEmployee(response.data); // Assuming response.data contains the newly added employee
      this.props.onNavigate('/employees'); // Redirect to employee list
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // Now TypeScript knows that error is an AxiosError
        console.error('Error adding employee:', error.response?.data);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };
  

  render() {
    const { employee } = this.state;

    return (
      <div className="main_contain">
        <h2>Add Employee</h2>
        <div className="container">
        
  
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="name" value={employee.name} onChange={this.handleChange} placeholder="Name" required />
          <input type="email" name="email" value={employee.email} onChange={this.handleChange} placeholder="Email" required />
          <input type="text" name="phone" value={employee.phone} onChange={this.handleChange} placeholder="Phone" required />
          <input type="text" name="department" value={employee.department} onChange={this.handleChange} placeholder="Department" required />
          <input type="text" name="designation" value={employee.designation} onChange={this.handleChange} placeholder="Designation" required />
          <input type="number" name="salary" value={employee.salary} onChange={this.handleChange} placeholder="Salary" required />
          <input type="date" name="dateOfJoining" value={employee.dateOfJoining} onChange={this.handleChange} placeholder="Date of Joining" required />
          <input type="text" name="location" value={employee.location} onChange={this.handleChange} placeholder="Location" required />
          <input type="text" name="manager" value={employee.manager} onChange={this.handleChange} placeholder="Manager" required />
          <button type="submit">Add Employee</button>
        </form>
        </div>
      </div>
    );
  }
}

export default function AddEmployeeWithNavigate(props: Omit<AddEmployeeProps, 'onNavigate'>) {
  const navigate = useNavigate();
  return <AddEmployee {...props} onNavigate={navigate} />;
}
