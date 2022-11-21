'use strict';
const loadtest = require('loadtest');
const lineChart = require('./plot');
const fs = require("fs")
const firstRps = 5;
const lastRps = 35;
const rpsStep = 5;
const iterationNum = 2;
const filaname = "./loop.png"

const requestOptions = {
    method: 'GET',
    body: '',
    requestGenerator: (params, options, client, callback) => {
        const request = client(options, callback);
        return request;
    }
}
const datasets = [
    {
        "data": [],
        "label": "cpu",
        "tension": 0.1,
        "fill": false,
        "backgroundColor": "rgb(77,137,249)",
        "borderColor": "rgba(77,137,249,.3)",
        "url": "http://169.254.45.41:3000/cpu"

    },
    {
        "data": [],
        "label": "io",
        "tension": 0.1,
        "fill": false,
        "backgroundColor": "rgb(0,184,138)",
        "borderColor": "rgba(0,184,138,.3)",
        "url": "http://169.254.45.41:3000/io"
    }
]

const labels = [];
for (let step = firstRps; step <= lastRps; step = step + rpsStep) {
    labels.push(step);
}
const dataNum = labels.length
const datasetNum = datasets.length

//Begin for first dataset, get first step at first iteration
name(0, 0, 0)

function name(datasetIndex, dataIndex, iteration) {

    requestOptions.requestsPerSecond = labels[dataIndex]
    requestOptions.maxRequests = labels[dataIndex]
    requestOptions.concurrency = labels[dataIndex]
    requestOptions.maxSeconds = labels[dataIndex]

    //begining of dataset
    if (dataIndex == 0 && iteration == 0) {
        console.log('#############################');
        console.log("New path " + datasets[datasetIndex]['label']);
        requestOptions.url = datasets[datasetIndex]['url']
    }

    loadtest.loadTest(requestOptions, (error, results) => {
        //first iteration is for warm up.
        if (iteration == 0) {
            console.log('******************');
            console.log(`New rps= ` + labels[dataIndex]);
            console.log(`Current latency = ${results.meanLatencyMs} (warm up)`);
            datasets[datasetIndex]["data"].push(0)
        } else {
            console.log(`   it=${iteration} current latency= ${results.meanLatencyMs}`);
            datasets[datasetIndex]["data"][dataIndex] += results.meanLatencyMs
        }

        //last iteration
        if (iteration == iterationNum) {
            datasets[datasetIndex]["data"][dataIndex] /= iterationNum
            console.log(`    avg=` + datasets[datasetIndex]["data"][dataIndex]);
            console.log('******************');
            //if not reached to last rps, begin iterations for next rps
            if (dataIndex < dataNum - 1) {
                name(datasetIndex, dataIndex + 1, 0)
            } else if (datasetIndex < datasetNum - 1) {
                name(datasetIndex + 1, 0, 0)
            } else {
                try {
                    lineChart(datasets, labels, filaname)
                } catch (error) {
                    fs.writeFileSync("labels.txt", labels.toString())
                    fs.writeFileSync("datasets.txt", JSON.stringify(datasets))
                }
            }
        }
        //next iteration
        else {
            name(datasetIndex, dataIndex, iteration + 1)
        }

    })
}

