# timeslide

    时间块选择组件

# 使用
    ```
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
                <TimeSlide startTime={8}  endTime={22} value={value} onChange={this.handleClick} />
            </div>
            );
        }
    }

    ReactDOM.render(<App />, appElement);
    ```


# 后续更新
- 添加disabled
- 支持其他相关参数设置:class、width等
- 支持精度半小时
- p标签更好div