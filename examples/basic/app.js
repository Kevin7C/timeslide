import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TimeSlide from 'reactlib';
const appElement = document.getElementById('example');


class App extends Component {
  render() {
    return (
      <div>
        <TimeSlide/>
      </div>
    );
  }
}

ReactDOM.render(<App />, appElement);