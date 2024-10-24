import React, { Component } from 'react';

// Define the Employee type
type Employee = {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  salary: number;
  dateOfJoining: string;
  location: string;
  manager: string;
};

// Define the state and props types
interface EmployeeState {
  employees: Employee[];
  newEmployee: Employee;
  editingEmployee: Employee | null;
}

class EmployeeManagement extends Component<{}, EmployeeState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      employees: [],
      newEmployee: {
        id: 0,
        name: '',
        email: '',
        phone: '',
        department: '',
        designation: '',
        salary: 0,
        dateOfJoining: '',
        location: '',
        manager: ''
      },
      editingEmployee: null,
    };
  }

  // Life cycle method - componentDidMount (initial load)
  componentDidMount() {
    const initialEmployees: Employee[] = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        department: 'Engineering',
        designation: 'Software Engineer',
        salary: 60000,
        dateOfJoining: '2021-01-15',
        location: 'New York',
        manager: 'Jane Smith',
      },
    ];
    this.setState({ employees: initialEmployees });
  }

  // Life cycle method - componentDidUpdate
  componentDidUpdate(prevProps: {}, prevState: EmployeeState) {
    if (prevState.employees !== this.state.employees) {
      console.log('Employee list updated', this.state.employees);
    }
  }

  // Life cycle method - componentWillUnmount
  componentWillUnmount() {
    console.log('Component will unmount');
  }

  // Handle input change
  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Parse number inputs for specific fields
    const parsedValue = name === 'salary' || name === 'id' ? parseFloat(value) : value;

    this.setState({
      newEmployee: { ...this.state.newEmployee, [name]: parsedValue },
    });
  };

  // Add or edit employee
  handleAddOrEditEmployee = () => {
    const { employees, newEmployee, editingEmployee } = this.state;
    if (editingEmployee) {
      // Editing an existing employee
      const updatedEmployees = employees.map((employee) =>
        employee.id === editingEmployee.id ? newEmployee : employee
      );
      this.setState({ employees: updatedEmployees, editingEmployee: null });
    } else {
      // Adding a new employee
      this.setState({
        employees: [...employees, { ...newEmployee, id: employees.length + 1 }],
      });
    }
    this.resetForm();
  };

  // Edit employee
  handleEdit = (employee: Employee) => {
    this.setState({ newEmployee: employee, editingEmployee: employee });
  };

  // Delete employee
  handleDelete = (id: number) => {
    const { employees } = this.state;
    const filteredEmployees = employees.filter((employee) => employee.id !== id);
    this.setState({ employees: filteredEmployees });
  };

  // Reset form
  resetForm = () => {
    this.setState({
      newEmployee: {
        id: 0,
        name: '',
        email: '',
        phone: '',
        department: '',
        designation: '',
        salary: 0,
        dateOfJoining: '',
        location: '',
        manager: ''
      },
    });
  };

  render() {
    const { employees, newEmployee, editingEmployee } = this.state;

    return (
      <div>
        <h2>Employee Management</h2>

        <form>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newEmployee.name}
            onChange={this.handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newEmployee.email}
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={newEmployee.phone}
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={newEmployee.department}
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            name="designation"
            placeholder="Designation"
            value={newEmployee.designation}
            onChange={this.handleInputChange}
          />
          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={newEmployee.salary}
            onChange={this.handleInputChange}
          />
          <input
            type="date"
            name="dateOfJoining"
            placeholder="Date of Joining"
            value={newEmployee.dateOfJoining}
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={newEmployee.location}
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            name="manager"
            placeholder="Manager"
            value={newEmployee.manager}
            onChange={this.handleInputChange}
          />
          <button type="button" onClick={this.handleAddOrEditEmployee}>
            {editingEmployee ? 'Update Employee' : 'Add Employee'}
          </button>
        </form>

        <table border={1}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Salary</th>
              <th>Date of Joining</th>
              <th>Location</th>
              <th>Manager</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.phone}</td>
                <td>{employee.department}</td>
                <td>{employee.designation}</td>
                <td>{employee.salary}</td>
                <td>{employee.dateOfJoining}</td>
                <td>{employee.location}</td>
                <td>{employee.manager}</td>
                <td>
                  <button onClick={() => this.handleEdit(employee)}>Edit</button>
                  <button onClick={() => this.handleDelete(employee.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default EmployeeManagement;
