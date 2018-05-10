let welcome;
let loopInited = false;
let counter = 0;
let form;
let interval3;
let button;

let user = "";
let name;
let pass = "";
let id = "";

let requiredElems = new Array();
let userOk;

function loadLogin() {
    form = document.getElementById("form");
    welcome = document.getElementById("welcome");
    setRequired();

    button = document.getElementById("submit");
    button.addEventListener("click", sendValidationRequest, false);

}

function setErrorView(elem) {
    elem.style.backgroundColor = "rgba(255,50,50,0.3)";
}

function setNormalView() {
    for (let elem of requiredElems) {
        elem.style.backgroundColor = "rgba(0,0,0,0.2)";
    }

}

function setRequired() {
    let req = document.querySelectorAll("input");
    for (let input of req) {
        if (input.required) {
            requiredElems.push(input);

        }
    }
    for (let elem of requiredElems) {
        elem.addEventListener("input", setNormalView, false);
    }
}

function validate(u, p, n) {

    if (requiredElems[0].value != u) {
        setErrorView(requiredElems[0]);
    }

    if (requiredElems[0].value === u && requiredElems[1].value === p) {
        setNormalView();
        welcome.innerHTML = "Bienvenid@ " + n;
        welcome.style.visibility = "visible";
        sessionStorage.setItem("logging", "true");
        sessionStorage.setItem("userName", n);

        interval3 = setInterval(effect, 30);
    } else {
        setErrorView(requiredElems[1]);
    }
}

function effect() {
    if (counter == 100) {
        clearInterval(interval3);
        window.location.href = "../html/user.html";
    }
    counter++;
}

function sendValidationRequest() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        if (this.readyState == 4) {
            let validUser = this.responseXML.getElementsByTagName("usuario");

            for (let i = 0; i < validUser.length; i++) {
                user = validUser[i].getElementsByTagName("mail")[0].innerHTML;
                pass = validUser[i].getElementsByTagName("pass")[0].innerHTML;
                name = validUser[i].getElementsByTagName("nombreUser")[0].innerHTML;
                id = validUser[i].getElementsByTagName("id")[0].innerHTML;
                validate(user,pass, name);

                if (requiredElems[0].value === user) {

                    if (requiredElems[1].value === pass) {
                        
                        sessionStorage.setItem("userIndex",i);
                        console.log("SESSION USER INDEX: " + sessionStorage.getItem("userIndex"));
                        userIndex = i;
                        break;
                    }
                }
                
            }
        }
    };

    xhttp.open("GET", "../xml/usuarios.xml", true);
    xhttp.send();
}
