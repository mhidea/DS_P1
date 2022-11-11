const express = require('express')
var timeout = require('connect-timeout')
const router = require('./routes')
const app = express()
app.use(timeout('30s'))
const port = 3000

app.use('/', router)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})