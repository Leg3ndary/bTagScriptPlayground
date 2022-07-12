// Out of respect, please don't go spamming my API :(

const API_URL = "https://mighty-sea-55702.herokuapp.com/https://btp.leg3ndary.repl.co/process/";

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

button.addEventListener('click', event => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let tagscript = document.getElementById("tagscript").value;
    tagscript = tagscript.replace("\\", "Ꜳ");
    let request = encodeURIComponent(tagscript);

    let response = fetch(API_URL + request, {
        headers: headers
    })
    .then(res => res.json());

    console.log(response);

    response.then(function(resp) {
        console.log(resp);
        response = new Response(resp);
        document.getElementById("output").value = escapeHtml(response.body);
    });
});