
import React, { Component } from 'react';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { Employee } from './Employee';
import axios from 'axios';

interface EditEmployeeProps {
  employees: Employee[];
  onEditEmployee: (employee: Employee) => void;
  id: string | undefined; // Allow id to be undefined
  onNavigate: NavigateFunction;
}

interface EditEmployeeState {
  employee: Employee;
}

class EditEmployee extends Component<EditEmployeeProps, EditEmployeeState> {
  constructor(props: EditEmployeeProps) {
    super(props);

    const employee = this.props.employees.find(emp => emp.id === Number(this.props.id));

    this.state = {
      employee: employee || {
        id: 0,
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

  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { id } = this.props; // Get id from props
  
    if (!id) return; // Ensure id is defined
  
    try {
      const response = await axios.put(`http://localhost:3003/api/employees/${id}`, this.state.employee);
  
      if (response.status === 200) {
        this.props.onEditEmployee(this.state.employee); // Update state in parent component
        this.props.onNavigate('/employees'); // Redirect to employee list
      }
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };
  

  render() {
    const { employee } = this.state;

    return (
      <div>
        <h2>Edit Employee</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={this.handleChange}
            placeholder="Name"
            required
          />
          <input
            type="email"
            name="email"
            value={employee.email}
            onChange={this.handleChange}
            placeholder="Email"
            required
          />
          <input
            type="text"
            name="phone"
            value={employee.phone}
            onChange={this.handleChange}
            placeholder="Phone"
            required
          />
          <input
            type="text"
            name="department"
            value={employee.department}
            onChange={this.handleChange}
            placeholder="Department"
            required
          />
          <input
            type="text"
            name="designation"
            value={employee.designation}
            onChange={this.handleChange}
            placeholder="Designation"
            required
          />
          <input
            type="number"
            name="salary"
            value={employee.salary}
            onChange={this.handleChange}
            placeholder="Salary"
            required
          />
          <input
            type="date"
            name="dateOfJoining"
            value={employee.dateOfJoining}
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            name="location"
            value={employee.location}
            onChange={this.handleChange}
            placeholder="Location"
            required
          />
          <input
            type="text"
            name="manager"
            value={employee.manager}
            onChange={this.handleChange}
            placeholder="Manager"
            required
          />
          <button type="submit">Update Employee</button>
        </form>
      </div>
    );
  }
}

interface EditEmployeeWithParamsProps {
  employees: Employee[];
  onEditEmployee: (employee: Employee) => void;
}

function EditEmployeeWithParams({ employees, onEditEmployee }: EditEmployeeWithParamsProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <EditEmployee
      employees={employees}
      onEditEmployee={onEditEmployee}
      id={id}
      onNavigate={navigate}
    />
  );
}

export default EditEmployeeWithParams;
