async function callEnv() {
    const response = await fetch(`/env`, {
        method: 'GET',
    });
    return response.json();
}

async function setEnv() {
    let env = await callEnv()
    let { DEPOT_SERVICE, STOCK_SERVICE, NEWS_SERVICE } = env
    localStorage.setItem('DEPOT_SERVICE', JSON.stringify(DEPOT_SERVICE));
    localStorage.setItem('STOCK_SERVICE', JSON.stringify(STOCK_SERVICE));
    localStorage.setItem('NEWS_SERVICE', JSON.stringify(NEWS_SERVICE));
}

setEnv();