import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import AttendanceSheet from './AttendanceSheet.js';

class App extends Component {
  state = {
    teacher: '',
    students: [],
    studId1: '',
    studId2: '',
    studId3: '',
    fName: '',
    lName: '',
    age: '',
    showLoader1: 'none',
    showLoader2: 'none',
    showLoader3: 'none',
    studentDetails: ''
  };
  async componentDidMount() {
    const teacher = await AttendanceSheet.methods.teacher().call();
    const students = await AttendanceSheet.methods.getStudents().call();
    this.setState({teacher, students});
  }


  onCreateStudent = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({ showLoader1: 'block' });
    await AttendanceSheet.methods.createStudent(this.state.studId1, this.state.age, web3.utils.fromAscii(this.state.fName), web3.utils.fromAscii(this.state.lName)).send({
      from: accounts[0]
    });
    this.setState({ showLoader1: 'none' });
  };

  onIncrementAttendance = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({ showLoader2: 'block' });
    await AttendanceSheet.methods.incrementAttendance(this.state.studId2).send({
      from: accounts[0]
    });
    this.setState({ showLoader2: 'none' });
  };

  onGetStudentDetails = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({ showLoader3: 'block' });
    var result = await AttendanceSheet.methods.getParticularStudent(this.state.studId3).call();
    this.setState({ studentDetails: 'Mr/Mrs ' + web3.utils.toAscii(result[0]).replace(/\u0000/g, '') + ' ' + web3.utils.toAscii(result[1]).replace(/\u0000/g, '') + ' is ' + result[2] + ' years old and has attended ' + result[3]+ ' classes'});
    this.setState({ showLoader3: 'none' });
  };

  render() {
    return (
      <div>
        <h1>Attendance Sheet</h1>
        <p>
          This contract is owned by teacher {this.state.teacher}.
          <br/>
          There are currently {this.state.students.length} students in this sheet.
        </p>
        <hr/>
        <div class="container">
          <h2>Student Creation</h2>
          <img id="loader" style={{display: this.state.showLoader1}} src="https://loading.io/spinners/double-ring/lg.double-ring-spinner.gif"/>
          <label for="studId1" class="col-lg-2 control-label">Student ID</label>
          <input id="studId1" value={this.state.studId1} onChange={event => this.setState({studId1: event.target.value})} type="text"/>
          <label for="fName" class="col-lg-2 control-label">First Name</label>
          <input id="fName" value={this.state.fName} onChange={event => this.setState({fName: event.target.value})} type="text"/>
          <label for="lName" class="col-lg-2 control-label">Last Name</label>
          <input id="lName" value={this.state.lName} onChange={event => this.setState({lName: event.target.value})} type="text"/>
          <label for="age" class="col-lg-2 control-label">Student Age</label>
          <input id="age" value={this.state.age} onChange={event => this.setState({age: event.target.value})} type="text"/>
          <button onClick={this.onCreateStudent}>Create Student</button>
          <hr/>
        </div>
        <div class="container">
            <h2>Increment Attendance</h2>
            <img id="loader2" style={{display: this.state.showLoader2}} src="https://loading.io/spinners/double-ring/lg.double-ring-spinner.gif"/>
            <label for="studId2" class="col-lg-2 control-label">Student ID</label>
            <input id="studId2" value={this.state.studId2} onChange={event => this.setState({studId2: event.target.value})} type="text"/>
            <button onClick={this.onIncrementAttendance}>Increment Attendance</button>
            <hr/>
        </div>
        <div class="container">
            <h2>View Student Details</h2>
            <img id="loader3" style={{display: this.state.showLoader3}} src="https://loading.io/spinners/double-ring/lg.double-ring-spinner.gif"/>
            <label for="studId3" class="col-lg-2 control-label">Student ID</label>
            <input id="studId3" value={this.state.studId3} onChange={event => this.setState({studId3: event.target.value})} type="text"/>
            <button onClick={this.onGetStudentDetails}>Check</button>

            <span>{this.state.studentDetails}</span>
            <hr/>
        </div>
    </div>

    );
  }
}

export default App;
