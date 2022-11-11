'use strict';
const loadtest = require('loadtest');
const fs = require("fs");
const ChartJSImage = require('chart.js-image');

var finalResult = {};
const lastRps = 100;
const lastIteration = 4;
const filaname = "./rs.csv"
const baseUrl = "http://169.254.45.41:3000/"


const options = {
    url: 'cpu',
    concurrency: 10,
    method: 'GET',
    body: '',
    requestsPerSecond: 10,
    maxSeconds: 0,
    maxRequests: 100,
    timeout: 0,
    requestGenerator: (params, options, client, callback) => {
        const request = client(options, callback);
        return request;
    },
    statusCallback(error, result, latency) {
        rs.push({ y: result.requestElapsed, x: latency.totalTimeSeconds })
    }
};


fs.writeFileSync(filaname, "index,elapsed,latency\n")

loadtest.loadTest({ ...options, url: baseUrl + paths[1] }, (err, result) => {
    console.log(result);
    console.log(rs);
    const config = {
        type: 'scatter',
        datasets: [{
            data: rs
        }]
    };

})




