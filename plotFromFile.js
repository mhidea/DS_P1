const fs = require("fs")
const line_chart = require("./test/plot")

const datasets = JSON.parse(fs.readFileSync("datasets.txt"))
const st = fs.readFileSync("labels.txt")
const labels = st.toString().split(",")
line_chart(datasets, labels, "recovered.png")