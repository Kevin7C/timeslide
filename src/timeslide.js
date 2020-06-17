import React from "react";
import PropTypes from "prop-types";

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
    backgroundColor: "#3091ff",
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
    const {startTime,endTime}=props;
    const times=[];
    const timeLabels=[];
    for(let i=startTime;i<=endTime;i++){
      times.push({
        value:i,
        isSelected:false
      })
    }
    for(let i=startTime;i<=endTime+1;i++){
      timeLabels.push(i);
    }
    this.state = {
      preValue:[],
      times: times,
      timeLabels: timeLabels,
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
      startIndex:0,
      endIndex:0,
      startPoint:{},
      endPoint:{},
      active:false,
      abs:0
    };
  }

  static getDerivedStateFromProps(nextProps,state){
    if("value" in nextProps && nextProps.value!==undefined&&!!state.times.length&&nextProps.value!==state.preValue){
      
      const {value}=nextProps;
      const {times}=state;
      for(let item of times){
        if(value.includes(item.value)){
          item.isSelected=true;
        }else{
          item.isSelected=false;
        }
      }
      return {
        ...state,
        preValue:value
      }
    }

    return state;
  }

  componentDidMount() {
    const dom = this.refTimeSlide.current.getBoundingClientRect();
    const { left, top, right, bottom, width, height } = dom;
    Object.assign(this.current, { left, top, right, bottom, width, height });
  }

  getCurrentValue=()=>{
    let result=[]
    const {times}=this.state;
    result=times.filter(item=>item.isSelected).map(item=>item.value);
    return result;
  }

  getIndex = (e) => {
    const { clientX, clientY } = e;
    const { left, width } = this.current;
    const cX = clientX - left;
    const index = (clientX - left) / (ValueWith + ValueStep);
    return Math.floor(index);
  };
  handleMouseDown = (e) => {
    const { clientX, clientY } = e;
    const {times}=this.state;
    const index=this.getIndex(e);
    this.current.isdown = true;
    this.current.startIndex=index
    this.current.startPoint={clientX, clientY};
    this.current.active=!times[index].isSelected;
  };
  handleMouseUp = (e) => {
    const { clientX, clientY } = e;
    this.current.isdown = false;
    this.current.endIndex=this.getIndex(e);
    this.current.endPoint={clientX, clientY};

    const {times}=this.state;
    times[this.current.startIndex].isSelected=this.current.active;
    this.setState({
      times
    },()=>{
      const {onChange}=this.props;
      if(!onChange){
        return;
      }
      const result=this.getCurrentValue();
      onChange(result);
    })
  };

  handleMouseMove = (e) => {
    let {isdown,active,startIndex,startPoint,abs}=this.current
    if (isdown) {
      const { clientX, clientY } = e;
      const {times}=this.state;
      const index=this.getIndex(e);
      if(index<0){
        return;
      }

      const currentAbs=Math.abs(clientX-startPoint.clientX);
      let currentActive=active
      if(currentAbs>=abs){
        currentActive=active;
      }else{
        currentActive=!active;
      }
      this.current.abs=currentAbs;
      times[index].isSelected=currentActive;
      this.setState({
        times
      });
    }
  };

  handleMouseLeave=(e)=>{
    console.log("leave-out")
  }

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
          onMouseLeave={this.handleMouseLeave}
        >
          {times.map((item) => (
            <span key={`item${item.value}`} style={Object.assign({},timeitemcss,item.isSelected?timeitemactive:{})}></span>
          ))}
        </div>
        <p>
          {timeLabels.map((index) => (
            <span key={`label${index}`} style={labelcss}>
              {index}
            </span>
          ))}
        </p>
      </div>
    );
  }
}

TimeSlide.propTypes = {
  value:PropTypes.oneOfType(PropTypes.array,null),
  startTime: PropTypes.number,
  endTime: PropTypes.number,
  onChange: PropTypes.func,
};

TimeSlide.defaultProps = {
  value:[],
  startTime:6,
  endTime:23,
  onChange:()=>{}
};
