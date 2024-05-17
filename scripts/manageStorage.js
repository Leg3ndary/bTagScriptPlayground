let useLocal = document.getElementById("useLocal");
let useSession = document.getElementById("useSession");

if (window.localStorage.getItem("useLocal") === true) {
    useLocal.checked = true;
    useSession.checked = false;
}

if (useLocal.checked === true) {
    if (window.localStorage.getItem("tagscript") === null) {
        editor.setValue("");
    } else {
        editor.setValue(window.localStorage.getItem("tagscript"));
    }
} else if (useSession.checked === true) {
    if (window.sessionStorage.getItem("tagscript") === null) {
        editor.setValue("");
    } else {
        editor.setValue(window.sessionStorage.getItem("tagscript"));
    }
}

useLocal.addEventListener("change", (event) => {
    if (event.currentTarget.checked) {
        useSession.checked = false;
        window.localStorage.setItem("useLocal", true);
        window.localStorage.setItem("useSession", false);
        window.localStorage.setItem("tagscript", editor.getValue());
        window.sessionStorage.removeItem("tagscript");
    }
});

useSession.addEventListener("change", (event) => {
    if (event.currentTarget.checked) {
        useLocal.checked = false;
        window.localStorage.setItem("useLocal", false);
        window.localStorage.setItem("useSession", true);
        window.sessionStorage.setItem("tagscript", editor.getValue());
        window.localStorage.removeItem("tagscript");
    }
});

editor.on("change", function () {
    if (useLocal.checked) {
        window.localStorage.setItem("tagscript", editor.getValue());
    } else if (useSession.checked) {
        window.sessionStorage.setItem("tagscript", editor.getValue());
    }
});

let clearLocal = document.getElementById("clearLocal");
clearLocal.addEventListener("click", function () {
    window.localStorage.removeItem("tagscript");
    window.localStorage.removeItem("useLocal");
    window.localStorage.removeItem("useSession");
    editor.setValue("");
});
let clearSession = document.getElementById("clearSession");
clearSession.addEventListener("click", function () {
    window.sessionStorage.removeItem("tagscript");
    window.sessionStorage.removeItem("useLocal");
    window.sessionStorage.removeItem("useSession");
    editor.setValue("");
});
let clearAll = document.getElementById("clearAll");
clearAll.addEventListener("click", function () {
    window.localStorage.removeItem("tagscript");
    window.localStorage.removeItem("useLocal");
    window.localStorage.removeItem("useSession");
    window.sessionStorage.removeItem("tagscript");
    window.sessionStorage.removeItem("useLocal");
    window.sessionStorage.removeItem("useSession");
    editor.setValue("");
});
