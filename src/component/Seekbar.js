import React, { Component } from 'react';
import Slider from 'rc-slider/lib/Slider'
import 'rc-slider/assets/index.css'
const  minDate="8/12/2019";

class Seekbar extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {
    //     };
    // }

    // componentWillMount(){}
    // componentDidMount() {}
    // componentWillUnmount() {}

    

    // componentWillReceiveProps(){}
    // shouldComponentUpdate(){}
    // componentWillUpdate(){}
    // componentDidUpdate(){}

    render() {
        return (
            <div className="seekbar-layout">
                <button className="playbtn" onClick={this.props.playSlider}>Play</button>
                <button className="pausebtn" onClick={this.props.pauseSlider}>Pause</button>
                <Slider 
                    min={Date.parse(minDate)}
                    max={Date.parse(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()))}
                    step={Date.parse("02 Jan 1970 00:00:00 GMT")}
                    value={this.props.selectedDate}
                    onChange={this.props.onChange}
                    />
                
            </div>
        );
      }
}

export default Seekbar;