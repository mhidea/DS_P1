const express = require('express')
const router = express.Router()
const fs = require('fs')
// Home
router.get('/', (req, res) => {
    res.send("Home")
})
// define the cpu-intensive route
router.get('/cpu', (req, res) => {
    for (let i = 0; i < 30; i++) {
        Math.atan(i) + Math.atanh(i);
    }
    res.send("done")
})
// define the io-intensive route
router.get('/io', (req, res) => {
    const filename = "./temp/file" + Math.random() * 10000
    for (let i = 0; i < 100; i++) {
        fs.appendFileSync(filename, 'Hey there!');
    }
    //fs.rmSync(filename);
    res.send('io')
})

module.exports = router