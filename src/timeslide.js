import React from "react";
import PropTypes from "prop-types";
// import cx from 'classnames';
// import css from './timeselect.module.scss'

// import "./timeslide.css";

const TimeSelectPadding = 10; //插件的左右padding
const ValueWith = 60; //时间块宽
const ValueHeight = 20;
const ValueStep = 20; //时间块 间距
//

let timeitemcss = {
  display: "inline-block",
  width: ValueWith,
  height: ValueHeight,
  marginRight: ValueStep,
  backgroundColor: "#ffffff",
  border: "1px solid rgba(219,224,230,1)",
  borderRadius: 4,
  cursor: "pointer",
};
let timeitemactive={
    backgroundColor: "red",
}

let labelcss = {
  display: "inline-block",
  width: ValueStep,
  height: ValueHeight,
  marginRight: ValueWith,
  textAlign: "center",
};
export default class TimeSlide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      times: [
        {
          value: 1,
          isSelected: false,
        },
        {
          value: 2,
          isSelected: false,
        },
        {
          value: 3,
          isSelected: false,
        },
      ],
      timeLabels: [1, 2, 3, 4],
    };

    this.refTimeSlide = React.createRef();
    this.current = {
      isdown: false,
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      width: 0,
      height: 0,
      start:0,
      end:0,
      active:false
    };
  }

  componentDidMount() {
    const dom = this.refTimeSlide.current.getBoundingClientRect();
    const { left, top, right, bottom, width, height } = dom;
    Object.assign(this.current, { left, top, right, bottom, width, height });
  }

  getIndex = (e) => {
    const { clientX, clientY } = e;
    const { left, width } = this.current;
    const cX = clientX - left;
    const index = (clientX - left) / (ValueWith + ValueStep);
    return Math.floor(index);
  };
  handleMouseDown = (e) => {
    const {times}=this.state;
    const index=this.getIndex(e);
    this.current.isdown = true;
    this.current.start=index
    this.current.active=!times[index].isSelected;
  };
  handleMouseUp = (e) => {
    this.current.isdown = false;
    this.current.end=this.getIndex(e);

  };

  handleMouseMove = (e) => {
    if (this.current.isdown) {
      const {times}=this.state;
      const index=this.getIndex(e);
      const selectedItem=times[index];
      selectedItem.isSelected=this.current.active;
      this.setState({
        times
      })
    }
  };

  render() {
    const { times, timeLabels } = this.state;
    return (
      <div>
        <div
          style={{ display: "inline-block", marginLeft: 20 }}
          ref={this.refTimeSlide}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
        >
          {times.map((item) => (
            <span key={item.value} style={Object.assign({},timeitemcss,item.isSelected?timeitemactive:{})}></span>
          ))}
        </div>
        <p>
          {timeLabels.map((index) => (
            <span key={index} style={labelcss}>
              {index}
            </span>
          ))}
        </p>
      </div>
    );
  }
}

TimeSlide.propTypes = {
  test: PropTypes.string,
  disabled: PropTypes.bool,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  onChange: PropTypes.func,
};

TimeSlide.defaultProps = {
  test: "sfsdfd",
};
