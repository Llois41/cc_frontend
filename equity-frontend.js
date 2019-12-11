'use strict'

async function sendRequest() {
  let equity = document.getElementById('equity').value;
  let equityEndpoint = makeRequest(equity)
  callEndpoint(equityEndpoint).then(
    response => {
      let responseArr = [];
      for (let [key, value] of Object.entries(response['Time Series (30min)'])){
        let resObj = {} ;
        resObj['key'] = key;
        resObj['value'] = value;
        responseArr.push(resObj);
        console.log('object: ' + JSON.stringify(resObj));
      }
      var resDiv = document.createElement("div");
      var metaContent = document.createTextNode('Meta: ' + JSON.stringify(response['Meta Data']));
      resDiv.appendChild(metaContent);

      for (let i = 0; i < responseArr.length; i++) {
        let textNode = document.createTextNode(JSON.stringify(responseArr[i]))
        resDiv.appendChild(textNode);
        resDiv.appendChild(document.createElement("br"));
      }
      
      var currentDiv = document.getElementById("div1");
      document.body.insertBefore(resDiv, currentDiv);




    }
  );
  //console.log('response' + response)

}

function makeRequest(equity) {
  let equityEndpoint = 'http://localhost:3000/equities/' + equity
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