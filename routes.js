const express = require('express')
const router = express.Router()
const fs = require('fs')
// Home
router.get('/', (req, res) => {
    res.send("Home")
})
// define the cpu-intensive route
router.get('/cpu', (req, res) => {
    let r = 0
    for (let i = 0; i < 1500; i++) {
        r += Math.atan(i) + Math.atanh(i);
    }
    res.send("Done. r= " + r)
})
// define the io-intensive route
router.get('/io', (req, res) => {
    const filename = "./temp/file" + Math.random() * 10000
    for (let i = 0; i < 10; i++) {
        fs.appendFileSync(filename, 'Hey there!');
    }
    //fs.rmSync(filename);
    res.send('io')
})

module.exports = router