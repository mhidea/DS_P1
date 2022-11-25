const { time } = require('console')
const express = require('express')
const router = express.Router()
const fs = require('fs')

const fibb = function (n) {
    if (n == 1 || n == 2) {
        return 1
    }
    return fibb(n - 1) + fibb(n - 2)
}
const write = function () {
    const filename = "./temp/" + (new Date()).getMilliseconds() + "-" + Math.random()
    for (let i = 0; i < 50; i++) {
        fs.appendFileSync(filename, 'Hey there!\n');
    }
    fs.rmSync(filename);
}
// Home
router.get('/', (req, res) => {
    res.send("Home")
})
// define the cpu-intensive route
router.get('/cpu', (req, res) => {
    fibb(35)
    res.send("Node finished.")
})
// define the io-intensive route
router.get('/io', (req, res) => {
    write()
    res.send("Node finished.")
})

module.exports = router