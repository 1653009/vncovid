import React, { Component } from 'react'
import {Line} from 'react-chartjs-2'
class Chart extends Component {
    constructor(props){
        super(props);
        this.state = {
            vnData: Object,
            totalData: Object
        };
    }
    componentDidMount(){
        fetch('https://td.fpt.ai/corona/corona-chart-vn.json')
        .then(res=> res.json())
        .then(json =>{
            let infec = [];
            let suspe = [];
            let rehib = [];
            Object.values(json).map(item=>{
                infec.push(item[0]);
                suspe.push(item[1]);
                rehib.push(item[2]);
            });
            let vnData ={
                labels: Object.keys(json),
                datasets:[
                    {
                        label: "Đã khỏi",
                        data: rehib,
                        backgroundColor:[
                            'rgb(0,173,80)'
                        ],
                        borderWidth:2
                    },{
                        label: "Nhiễm",
                        data: infec,
                        backgroundColor:[
                            'rgb(209,173,80)'
                        ],
                        borderWidth:2
                    },{
                        label: "Nghi Nhiễm",
                        data: suspe,
                        backgroundColor:[
                            'rgb(255,173,80)'
                        ],
                        borderWidth:2
                    }
                ]
            }
            this.setState({vnData});
        });
        fetch('https://td.fpt.ai/corona/corona-total.json')
        .then(res => res.json())
        .then(json => {
            let infec = [];
            let dead = [];
            let rehib = [];

            Object.values(json).map(item => {
                infec.push(item[0]);
                dead.push(item[1]);
                rehib.push(item[2])
            });

            let totalData = {
                labels: Object.keys(json),
                datasets: [
                    {
                        label: 'Tử vong',
                        data: dead,
                        backgroundColor: [
                            '#ff1100'
                        ],
                        borderWidth: 2
                    },
                    {
                        label: 'Khỏi',
                        data: rehib,
                        backgroundColor: [
                            '#00ff37'
                        ],
                        borderWidth: 2
                    },
                    {
                        label: 'Nhiễm',
                        data: infec,
                        backgroundColor: [
                            '#ffe600'
                        ],
                        borderWidth: 2
                    }
                ]
            }
            this.setState({totalData});
        });

    }
    render() {
        return (
            <div className="charts">
                <div className="chart">
                    <Line data={this.state.vnData}/>
                </div>
                <div className="chart">
                    <Line data={this.state.totalData}/>
                </div>
            </div>
        );
    }
}
export default Chart;