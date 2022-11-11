'use strict';
const loadtest = require('loadtest');
const fs = require("fs")

var finalResult = {};
const lastRps = 20;
const lastIteration = 4;
const filaname = "./recursice.csv"
const baseUrl = "http://169.254.45.41:3000/"
const paths = ["cpu", 'io']
var obj = {}
paths.map(v => {
    obj[v] = 0
})
const emptyRps = obj
const options = {
    url: 'cpu',
    concurrency: 1,
    method: 'GET',
    body: '',
    requestsPerSecond: 5,
    maxSeconds: 5,
    agentKeepAlive: false,
    requestGenerator: (params, options, client, callback) => {
        const request = client(options, callback);
        return request;
    }
};
const rpsStep = 5;


//Write header
fs.writeFileSync(filaname, `lastRps,${lastRps},lastIteration,${lastIteration}\n`)

//write columns' headers
fs.appendFileSync(filaname, "rps,")
paths.forEach(v => {
    fs.appendFileSync(filaname, `${v},`)
})
fs.appendFileSync(filaname, "\n")
begin(5, 0, 1)

function begin(rps, pathIndex, iteration) {
    loadtest.loadTest({ ...options, maxSeconds: rps, requestsPerSecond: rps, url: baseUrl + paths[pathIndex] }, (error, results) => {
        if (!finalResult[rps]) {
            finalResult[rps] = emptyRps
        }
        finalResult[rps][paths[pathIndex]] += results.meanLatencyMs
        console.log(`path=${paths[pathIndex]} rps= ${rps} it=${iteration} current mean= ${results.meanLatencyMs}`);
        //iteration loop
        if (iteration == lastIteration) {
            finalResult[rps][paths[pathIndex]] /= lastIteration
            console.log(`avg=   ${finalResult[rps][paths[pathIndex]]}`);
            //path loop
            if (pathIndex == paths.length - 1) {
                //reached last path. Start next rps
                //reached tha last rps
                fs.appendFileSync(filaname, `${rps},`)
                paths.forEach(v => {
                    fs.appendFileSync(filaname, `${finalResult[rps][v]},`)
                })
                fs.appendFileSync(filaname, "\n")
                if (rps == lastRps) {
                    console.log("FINISHED");
                    console.log(finalResult);
                } else {
                    //start first iteration for next rps
                    begin(rps + rpsStep, 0, 1)
                }
            } else {
                //try the next path
                begin(rps, pathIndex + 1, 1)
            }
        } else {
            begin(rps, pathIndex, iteration + 1)
        }
    });
}