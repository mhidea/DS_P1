const loadtest = require('loadtest');
const requestOptions = {
    url: "http://169.254.45.41:3000/cpu",
    method: 'GET',
    body: '',
    maxRequests: 10,
    concurrency: 1,
    requestGenerator: (params, options, client, callback) => {
        const request = client(options, callback);
        return request;
    }
}

var mailResult = null;

function printResult() {
    console.log(mailResult);
}
var a = setTimeout(printResult, 3000);

async function cc() {
    console.log("start");
    loadtest.loadTest(requestOptions, (errror, result) => {
        mailResult = result
        clearTimeout(a)
    })
    console.log("btw");
}

cc()
console.log("after");
