const express = require('express')
const router = express.Router()
const fs = require('fs')
const m = require('mathjs')
// Home
router.get('/', (req, res) => {
    res.send("Home")
})
// define the cpu-intensive route
router.get('/cpu', (req, res) => {
    for (let i = 0; i < 10; i++) {
        let mr = m.random([100, 100])
        m.inv(mr)
    }
    res.send("Done.")
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