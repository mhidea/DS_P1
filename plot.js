const ChartJSImage = require('chart.js-image');



const line_chart = function (datasets, labels, filename) {
    ChartJSImage()
        .chart({
            "type": "line",
            "data": {
                "labels": labels,
                "datasets": datasets
            },
            "options": {
                radius: 5,
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Value'
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Value'
                        }
                    }
                }
            }
        })
        .bkg('white')
        .width(700)
        .height(390)
        .toFile(filename)
        .then(() => console.log('Image chart written at %s', filename))
}

module.exports = line_chart