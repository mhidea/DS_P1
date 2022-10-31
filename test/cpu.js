'use strict';

/**
 * Sample request generator usage.
 * Contributed by jjohnsonvng:
 * https://github.com/alexfernandez/loadtest/issues/86#issuecomment-211579639
 */

const loadtest = require('loadtest');
const fs = require("fs")

var finalResult = {};
const lastRps = 10;
const lastIteration = 3;
const filaname = "./f.csv"
const baseUrl = "http://169.254.45.41:3000/"
const paths = ["cpu", "io"]
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


function begin(rps, pathIndex, iteration) {
    loadtest.loadTest({ ...options, requestsPerSecond: rps, url: baseUrl + paths[pathIndex] }, (error, results) => {
        finalResult[rps][paths[pathIndex]] += results.meanLatencyMs
        console.log(`path=${paths[pathIndex]} rps= ${rps} it=${iteration} current mean= ${results.meanLatencyMs}`);
        if (iteration == lastIteration) {
            finalResult[rps] /= lastIteration

            //reached tha last rps
            if (rps == lastRps) {
                //reached last path.
                if (pathIndex == paths.length - 1) {

                } else {

                }
            } else {
                //start first iteration for next rps
                begin(rps + rpsStep, pathIndex, 1)
            }

            fs.appendFileSync(filaname, `${rps},${finalResult[rps]} \n`)

        } else {
            begin(rps, pathIndex, iteration + 1)
        }



    });
}