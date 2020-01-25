'use strict'
let apiUrl = sessionStorage.getItem('results')
sessionStorage.clear();

chartIt();
async function chartIt() {
    let rawData = await getData();
    let keyArr = Object.keys(rawData);
    let stockData = rawData[keyArr[1]];
    let timestamps = [];
    let sharePrices = {};
    let openArr = [];
    let closeArr = [];
    let highArr = [];
    let lowArr = [];
    for (let [key, value] of Object.entries(stockData)) {
        timestamps.push(new Date(key));

        openArr.push(value['1. open']);
        closeArr.push(value['4. close']);
        highArr.push(value['2. high']);
        lowArr.push(value['3. low']);
    }
    sharePrices['open'] = openArr;
    sharePrices['close'] = closeArr;
    sharePrices['high'] = highArr;
    sharePrices['low'] = lowArr;

    let ctx = document.getElementById('myChart');
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timestamps,
            datasets: [{
                label: 'Open',
                data: sharePrices.open,
                borderColor: 'rgba(255, 0, 0, 0.3)'
            },
            {
                label: 'Close',
                data: sharePrices.close,
                borderColor: 'rgba(0, 0, 255, 0.3)'
            },
            {
                label: 'High',
                data: sharePrices.high,
                borderColor: 'rgba(0, 255, 0, 0.3)'
            },
            {
                label: 'Low',
                data: sharePrices.low,
                borderColor: 'rgba(120, 120, 0, 0.3)'
            }]
        }
    });


}
async function getData() {
    return await callEndpoint(apiUrl);
}

async function callEndpoint(endpointUrl) {
    const response = await fetch(endpointUrl, {
        method: 'GET',
    });
    return await response.json(); 
}