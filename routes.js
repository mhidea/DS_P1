const express = require('express')
const router = express.Router()

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
    res.send('io')
})

module.exports = router