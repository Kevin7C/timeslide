import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TimeSlide from 'reactlib';
const appElement = document.getElementById('example');


class App extends Component {

  constructor(props){
    super(props);
    this.state={
      value:[7,8,11,12]
    }
  }

  handleClick=(value)=>{
    this.setState({
      value
    })
  }
  render() {
    const {value}=this.state;
    return (
      <div>
        <TimeSlide startTime={6}  endTime={22} />
      </div>
    );
  }
}

ReactDOM.render(<App />, appElement);