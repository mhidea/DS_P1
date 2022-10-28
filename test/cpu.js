'use strict';

/**
 * Sample request generator usage.
 * Contributed by jjohnsonvng:
 * https://github.com/alexfernandez/loadtest/issues/86#issuecomment-211579639
 */

const loadtest = require('loadtest');

const options = {
    url: 'http://169.254.45.41:3000/cpu',
    concurrency: 40,
    method: 'GET',
    body: '',
    requestsPerSecond: 5000,
    maxSeconds: 300,
    requestGenerator: (params, options, client, callback) => {
        const request = client(options, callback);
        return request;
    }
};

loadtest.loadTest(options, (error, results) => {
    if (error) {
        return console.error('Got an error: %s', error);
    }
    console.log(results);
    console.log('Tests run successfully');
});