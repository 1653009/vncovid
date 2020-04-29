import React, { Component } from 'react';
import './App.css';
import List from './component/List';
import Seekbar from './component/Seekbar';
import CovidMap from './component/CovidMap';
import Patient from './component/Patient';
class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            patientsDisplay: [],
            patients: [],
            selectedDate: Date.parse("08/12/2019"),
            isPlaying: false,
            index:0,
            patient:{name: "Hiển thị địa điểm đang chọn", address: " ", verifyDate: " ", note: " ", lat:1, lng: 1}
        };
    }

    tick = () => {
        var step = Date.parse("04 Jan 1970 00:00:00 GMT");
        if(this.state.isPlaying) {
            var newValue = this.state.selectedDate + step;
            this.setState({selectedDate: newValue});
            this.state.patientsDisplay = [];
            this.state.patients.map((item) => {
                if(this.state.selectedDate >= Date.parse(item.verifyDate)){
                    this.state.patientsDisplay.push(item);
                }
                else {
                    this.state.patientsDisplay.pop(item);
                }
            });
        }
        if(!this.state.isPlaying) {

        }
    }

// componentWillMount(){}

    componentWillUnmount(){
        clearInterval(this.interval);
    }

// componentWillReceiveProps(){}
// shouldComponentUpdate(){}
// componentWillUpdate(){}
// componentDidUpdate(){}
    componentDidMount(){
        fetch('https://cors-anywhere.herokuapp.com/https://maps.vnpost.vn/apps/covid19/api/patientapi/list')
        .then(res => res.json())
        .then((json, tmp) => {
            console.log(json);
            tmp = json.data;
            tmp.sort(function (a, b){
                return Date.parse(b.verifyDate) - Date.parse(a.verifyDate);
            });
            this.setState({patients: tmp});
        });
        this.interval = setInterval(() => this.tick(), 500);
    }

    updateSelectDate = (newDate) => {
        this.setState({selectedDate: newDate});
        this.state.patientsDisplay = [];
        this.state.patients.map((item) => {
            if(newDate >= Date.parse(item.verifyDate)){
                this.state.patientsDisplay.push(item);
            }
            else {
                this.state.patientsDisplay.pop(item);
            }
        });

    }

    playSlider = () => {
        this.setState({isPlaying: true});
    }
    displayDetail = (index) =>{
      this.setState({index:index});
      this.setState({patient:this.state.patientsDisplay[index]});
    }
    pauseSlider = () => {
        this.setState({isPlaying: false});
    }

    render() {
        return (
            <div className="container">
                <CovidMap data={this.state.patientsDisplay} getIndex={this.displayDetail}/>
                <List data={this.state.patientsDisplay}/>
                <Seekbar onChange={this.updateSelectDate} selectedDate={this.state.selectedDate} playSlider={this.playSlider} pauseSlider ={this.pauseSlider}/>
                <div className="Patient">
                <Patient  name={this.state.patient.name} 
                        address={this.state.patient.address} 
                        time={this.state.patient.verifyDate} 
                        note={this.state.patient.note}
                        lat={this.state.patient.lat}
                        lng={this.state.patient.lng} />
                        </div>
            </div>
        );
    }
}

export default App;
