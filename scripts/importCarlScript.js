function isInt(str) {
    if (typeof str !== 'string') {
        return false;
    }
    
    const num = Number(str);
    
    if (Number.isInteger(num) && num > 0) {
        return true;
    }
    
    return false;
}


const CARL_API_URL = "https://mighty-sea-55702.herokuapp.com/https://carl.gg/api/v1/tags/";


const carlImportBtn = document.getElementById("carlImport");

function parseID(str) {
    if ( isInt(str) == true ) {
        tagID = str;
    } else {
        tagID = str.split("/").pop();
        if ( isInt(tagID) == false ) {
            console.log("Add something here when tag isn't found idiot");
            // Custom tag I made lul
            tagID = 1479390;
        }
    }
    return tagID;
}

carlImportBtn.addEventListener("click", event => {

    let importURL = document.getElementById("carlImportURL").value;

    let tagID = parseID(importURL);
    
    let response = fetch(CARL_API_URL + tagID).then(response => response.json());

    response.then(function(resp) {
        // console.log(resp);
        editor.setValue(resp.content);
    });

    tagscript.innerText = "";
});