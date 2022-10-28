const express = require('express')
const router = require('./routes')
const app = express()
const port = 3000

app.use('/', router)

app.listen(port, "169.254.63.180", () => {
    console.log(`Example app listening on port ${port}`)
})