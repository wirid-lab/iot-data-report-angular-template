import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts'
// import   * as echarts  from 'echarts/dist/echarts-en' 
import { NodeService } from './services/node.service';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';
declare var require: any
const moment = require('moment');
const NODE_API_NAME = 'demo-wirid-lab-iot-data' 
@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    name = 'Angular';

    private myChart: any = null;
    public totalData = [];
    public start: Date = new Date(
        new Date().getFullYear(),
        new Date().getMonth() - 1,
        new Date().getDate()
    );
    public end: Date = new Date();
    public optionHistory = {
        colors: ['#e5323e', '#003366'],
        title: {
            //  text: 'Title Chart'
        },
        tooltip: {
            renderMode: 'richText',
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: []
        },
        toolbox: {
            show: false,
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [],
        yAxis: [
            {
                type: 'value'
            }
        ],
        dataZoom: [{
            type: 'inside'
        },
        {
            type: 'slider'
        }],
        series: []
    };

    constructor(
        private _nodeServices: NodeService
    ) {


    }


    ngOnInit() {
        this.getNodeData()
    }

    getNodeData(dates?: any) {
        if (dates) {
            this.start = dates.value[0];
            this.end = dates.value[1];
        }
        this._nodeServices.getDataByNodeId(NODE_API_NAME).pipe(take(1)).subscribe(data => {
            this.totalData = data;
            this.changeRangeData()
        }, err => alert("Error getting data"))
    }


    fromJsonToDataChart(data: any[], queryName: string, colorHexa?: string): { axisData: object, seriesData: object } {
       
        let months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        // Extract all dates (UTC0)
        let tempDataAxisX = data.map(x => x["created"])
        for (let index = 0; index < tempDataAxisX.length; index++) {
            let element = tempDataAxisX[index];
            let dateTime = new Date(element);
            let formatted_date = dateTime.getDate() + "-" + (months[dateTime.getMonth()]) + "-" + dateTime.getFullYear() + " " + dateTime.getHours() + ":" + dateTime.getMinutes() + ":" + dateTime.getSeconds()
            tempDataAxisX[index] = formatted_date;
        }

        let axisData = {
            type: 'category',
            axisTick: {
                alignWithLabel: true
            },
            axisLine: {
                onZero: false,
                lineStyle: {
                    color: colorHexa ? colorHexa : '#e5323e'
                }
            },
            axisPointer: {
                label: {
                    formatter: function (params) {
                        // console.log(params)
                        return `${queryName} At ` + params.value
                        //   + (params.seriesData.length>0 ? '：' + params.seriesData[0].data : '');
                    }
                }
            },
            // boundaryGap: false,
            data: tempDataAxisX
        }
        // Ectract values of variable queryName
        let tempDataValues = data.map(x => x[queryName])
        let seriesData = {
            name: queryName,
            type: 'line',
            data: tempDataValues,
            smooth: true
        }
        return { axisData: axisData, seriesData: seriesData }
    }

    changeRangeData() {
        this.optionHistory.series = []
        this.optionHistory.xAxis = []
        this.optionHistory.legend.data = []


        let startDayMoment = moment(this.start).startOf('day');
        let endDayMoment = moment(this.end).endOf('day');

        let selectVariable= '';
        let valueVariable;
        let chartDataTemp;

        // Show Temperature
        selectVariable= 'temperature';
        valueVariable = this.totalData.filter(x => (x[selectVariable] != null || x[selectVariable] != undefined) && moment(x.created).isBetween(startDayMoment, endDayMoment));
        chartDataTemp = this.fromJsonToDataChart(valueVariable, selectVariable, '#e5323e');
        this.optionHistory.xAxis.push(chartDataTemp.axisData);
        this.optionHistory.series.push(chartDataTemp.seriesData);
        this.optionHistory.legend.data.push(selectVariable);


        // Show Humidity
        selectVariable= 'humidity';
        valueVariable = this.totalData.filter(x => (x[selectVariable] != null || x[selectVariable] != undefined) && moment(x.created).isBetween(startDayMoment, endDayMoment));
        chartDataTemp = this.fromJsonToDataChart(valueVariable, selectVariable, '#003366');
        this.optionHistory.xAxis.push(chartDataTemp.axisData);
        this.optionHistory.series.push(chartDataTemp.seriesData);
        this.optionHistory.legend.data.push(selectVariable);
      


        this.loadChart();
    }

    loadChart() {
        // Set Chart in html
        this.myChart = echarts.init((document.getElementById('history-graph')) as any);
        this.myChart.setOption(this.optionHistory);
    }
}
