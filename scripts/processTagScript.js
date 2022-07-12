// Out of respect, please don't go spamming my API :(

const API_URL = "https://mighty-sea-55702.herokuapp.com/https://btp.leg3ndary.repl.co/process/";

// To start the api in case it's not running
fetch(API_URL);

class Response {
    constructor(data) {
        this.body = data.body;
        this.actions = data.actions;
        this.extras = data.extras;
    }
}

const button = document.getElementById("processBTN");

function escapeHtml(unsafe) {
    // ty asport
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function loadActionTable(actions) {
    const table = document.getElementById("actionBody");

    while(table.hasChildNodes()){
        table.removeChild(table.firstChild);
    }

    for (const [action, value] of Object.entries(actions)) {
        let row = table.insertRow();

        let actionRow = row.insertCell(0);
        actionRow.innerHTML = escapeHtml(action);
        
        let valuesRow = row.insertCell(1);
        valuesRow.innerHTML = escapeHtml(JSON.stringify(value));

        let badge = row.insertCell(2);
        badge.innerHTML = `<div class="badge badge-outline-success">Success</div>`;
    };
}

function loadDebugTable(debug) {
    const table = document.getElementById("debugTable");

    while(table.hasChildNodes()){
        table.removeChild(table.firstChild);
    }

    for (const [name, value] of Object.entries(debug)) {
        let row = table.insertRow();

        let nameRow = row.insertCell(0);
        nameRow.innerHTML = escapeHtml(name);
        
        let valuesRow = row.insertCell(1);
        valuesRow.innerHTML = escapeHtml(value);
    };
}

button.addEventListener('click', event => {
    button.disabled = true;
    button.innerText = "Processing...";

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let tagscript = document.getElementById("tagscript").value;
    tagscript = tagscript.replace("\\", "Ꜳ");
    let request = encodeURIComponent(tagscript);

    let response = fetch(API_URL + request, {
        headers: headers
    })
    .then(res => res.json());

    response.then(function(resp) {
        // console.log(resp);
        response = new Response(resp);
        document.getElementById("output").value = escapeHtml(response.body);

        loadActionTable(response.actions);
        loadDebugTable(response.extras.debug);
    });

    button.disabled = false;
    button.innerText = "Process";
});