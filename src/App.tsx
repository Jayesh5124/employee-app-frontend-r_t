import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddEmployeeWithNavigate from './components/AddEmployee';
import EditEmployeeWithParams from './components/EditEmployee';
import EmployeeList from './components/EmployeeList';
import { Employee } from './components/Employee';
import './App.css';

interface AppState {
  employees: Employee[];
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      employees: [],
    };
  }

  addEmployee = (employee: Employee) => {
    this.setState((prevState) => ({
      employees: [...prevState.employees, employee],
    }));
  };

  editEmployee = (editedEmployee: Employee) => {
    const updatedEmployees = this.state.employees.map((emp) =>
      emp.id === editedEmployee.id ? editedEmployee : emp
    );
    this.setState({ employees: updatedEmployees });
  };

  deleteEmployee = (id: number) => {
    const filteredEmployees = this.state.employees.filter((emp) => emp.id !== id);
    this.setState({ employees: filteredEmployees });
  };

  render() {
    return (
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<AddEmployeeWithNavigate onAddEmployee={this.addEmployee} />} />
            <Route 
              path="/employees" 
              element={<EmployeeList onDeleteEmployee={this.deleteEmployee} />} 
            />
            <Route 
              path="/edit/:id" 
              element={<EditEmployeeWithParams employees={this.state.employees} onEditEmployee={this.editEmployee} />} 
            />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
