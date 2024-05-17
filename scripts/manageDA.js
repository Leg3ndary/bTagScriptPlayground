let actionButton = document.getElementById("clearActions");
let debugButton = document.getElementById("clearDebug");

function clearActions(actions) {
    let table = document.getElementById("actionBody");
    let errorsText = document.getElementById("errors");
    let warningsText = document.getElementById("warnings");

    while (table.hasChildNodes()) {
        table.removeChild(table.firstChild);
    }
    errorsText.innerText = "Errors: None";
    warningsText.innerText = "Warnings: None";
}

function clearDebug(actions) {
    let table = document.getElementById("debugTable");
    let errorsText = document.getElementById("errors");
    let warningsText = document.getElementById("warnings");

    while (table.hasChildNodes()) {
        table.removeChild(table.firstChild);
    }
    errorsText.innerText = "Errors: None";
    warningsText.innerText = "Warnings: None";
}

actionButton.addEventListener("click", clearActions);
debugButton.addEventListener("click", clearDebug);
