'use strict';
const loadtest = require('loadtest');
const fs = require("fs")

var finalResult = {};
const lastRps = 100;
const lastIteration = 4;
const filaname = "./loop.csv"
const baseUrl = "http://169.254.45.41:3000/"
const paths = ["cpu", "io"]
var obj = {}
paths.map(v => {
    obj[v] = 0
})
const emptyRps = obj

const options = {
    url: 'cpu',
    concurrency: 5,
    method: 'GET',
    body: '',
    requestsPerSecond: 5,
    maxSeconds: 5,
    requestGenerator: (params, options, client, callback) => {
        const request = client(options, callback);
        return request;
    }
};
const rpsStep = 5;

var currentRps = 5;
var currentIteration = 1;

//Write header
fs.writeFileSync(filaname, `lastRps,${lastRps},lastIteration,${lastIteration}\n`)

//write columns' headers
fs.appendFileSync(filaname, "rps,")
paths.forEach(v => {
    fs.appendFileSync(filaname, `${v},`)
})
fs.appendFileSync(filaname, "\n")

var lock = false;
while (currentRps <= lastRps) {
    finalResult[currentRps] = emptyRps
    paths.forEach(v => {
        for (let it = 0; it < lastIteration; it++) {
            lock = true
            loadtest.loadTest({ ...options, requestsPerSecond: currentRps, url: baseUrl + v }, (error, results) => {
                //finalResult[rps][v] += results.meanLatencyMs
                console.log(`path=${v} rps= ${currentRps} it=${it} current mean= ${results.meanLatencyMs}`);
                lock = false
            })
            while (lock) {

            }
        }
    })
    currentRps += rpsStep
}
