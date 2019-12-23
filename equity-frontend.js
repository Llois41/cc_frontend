'use strict'

let baseUrl = 'http://localhost:3000/equities';

async function sendRequest() {
  let equity = document.getElementById('equity').value;
  let equityEndpoint = makeRequest(equity);
  callEndpoint(equityEndpoint).then(
    response => {
      let responseArr = [];


      for (let [key, value] of Object.entries(response['_links'])) {
        let resObj = {};
        resObj['key'] = key;
        resObj['value'] = value['href'];
        responseArr.push(resObj);
      }
      let resDiv = document.createElement("div");

      for (let i = 0; i < responseArr.length; i++) {
        let btn = document.createElement('BUTTON');
        btn.innerHTML = JSON.stringify(responseArr[i].key);
        btn.onclick = function () {
          callEndpoint(baseUrl + responseArr[i].value)
            .then(response => {
              const tsDiv = document.createElement('div');
              const resP = document.createElement('p');
              resP.innerHTML = JSON.stringify(response);
              tsDiv.appendChild(resP);
              document.body.insertBefore(tsDiv, resDiv)
            });
        }
        resDiv.appendChild(btn);
        resDiv.appendChild(document.createElement("br"));
      }

      let currentDiv = document.getElementById("div1");
      document.body.insertBefore(resDiv, currentDiv);
    }
  );
}

function makeRequest(equity) {
  let equityEndpoint = baseUrl + '/' + equity;
  return equityEndpoint;
}

async function callEndpoint(endpointUrl) {
  const response = await fetch(endpointUrl, {
    method: 'GET',
  });  
    let data = await response.json();
    return data;
}