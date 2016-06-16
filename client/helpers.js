// Price ticker
function updatePrice(price) {
    currentPriceElement.innerText = '$' + price.toFixed(2);
}

function connectionLost() {
    currentPriceElement.innerText = 'Connection lost.';
}

// Floating delta
let deltaAnimation = [
    { opacity: 1, transform: 'translateY(-20px)' },
    { opacity: 0, transform: 'translateY(-70px)' }
];
function showFloatingDelta(delta) {
    let deltaElement = document.createElement('h1');
    deltaElement.classList = 'delta';
    deltaElement.innerText = (delta > 0 ? '+ $' : '- $') + Math.abs(delta).toFixed(2);
    ticker.appendChild(deltaElement);
    deltaElement.animate(deltaAnimation, 1000).onfinish = () => deltaElement.remove();
}

// Chart
let chart = new Highcharts.Chart('chart', chartOptions())

function addPointToChart(price) {
    let now = Date.now();
    let series = chart.series[0];
    if (series.data.length === 1) {
        series.data[0].update(price);
    }
    series.addPoint([now, price], false);
    // while (chart.series[0].data[0].x < now - 10000) {
    //     console.log('removed point');
    //     chart.series[0].data[0].remove(false);
    // }
    chart.xAxis[0].setExtremes(now - 10000, now, false);
    chart.redraw();
}

function chartOptions() {
    return {
        title: {
            text: 'Current price'
        },
        xAxis: {
            type: 'datetime',
            min: Date.now() - 10000,
            max: Date.now()
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },

        series: [{
            type: 'area',
            name: 'price',
            data: [[Date.now(), 1]]
        }]
    };
}