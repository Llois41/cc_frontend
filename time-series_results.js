apiUrl = sessionStorage.getItem('results')
sessionStorage.clear();


callEndpoint(apiUrl)
    .then(response => {
        const tsDiv = document.createElement('div');
        const resP = document.createElement('p');
        resP.innerHTML = JSON.stringify(response);
        tsDiv.appendChild(resP);
        let resDiv = document.getElementById('resDiv')
        document.body.insertBefore(tsDiv, resDiv)
    });

async function callEndpoint(endpointUrl) {
    const response = await fetch(endpointUrl, {
        method: 'GET',
    });
    let data = await response.json();
    return data;
}