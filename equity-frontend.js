'use strict'

let baseUrl = 'http://localhost:3000/equities'

async function sendRequest() {
  let equity = document.getElementById('equity').value;
  let equityEndpoint = makeRequest(equity)
  callEndpoint(equityEndpoint).then(
    response => {
      let responseArr = [];

      for (let [key, value] of Object.entries(response)) {
        let obj2Split = value
        for (let [nKey, nValue] of Object.entries(obj2Split)) {
          let resObj = {}
          resObj['key'] = nKey;
          resObj['value'] = nValue['href'];
          console.log(JSON.stringify(resObj));
          responseArr.push(resObj);
        }
      }
      let resDiv = document.createElement("div");

      for (let i = 0; i < responseArr.length; i++) {
        let btn = document.createElement('BUTTON');
        btn.innerHTML = JSON.stringify(responseArr[i].key);
        btn.onclick = function () {
          callEndpoint(baseUrl + responseArr[i].value);
        }
        console.log('url to call: ' + baseUrl + responseArr[i].value);
        resDiv.appendChild(btn);
        resDiv.appendChild(document.createElement("br"));
      }

      let currentDiv = document.getElementById("div1");
      document.body.insertBefore(resDiv, currentDiv);




    }
  );
  //console.log('response' + response)

}

function makeRequest(equity) {
  let equityEndpoint = baseUrl + '/' + equity
  return equityEndpoint
}

async function callEndpoint(endpointUrl) {
  const response = await fetch(endpointUrl, {
    method: 'GET',
  });
  let data = await response.json();
  console.log("[callEndpoint]: ", data);
  return data;
}