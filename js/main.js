let arrowLeft;
let arrowRight;
let container;
let left = 0;
const imgWidth = 33.4;
let interval;
let interval2;
let sInterval = true;
let log;
let logLink;
let reg;
let regLink;
let logo;
let completePath = "";
let uni = "undefined";

function loadSlider() {
    if(window.screen.availWidth < 1680) alert("Cambia tu resolución a  1920x1080");
    arrowLeft = document.getElementById("arrowLeft");
    arrowRight = document.getElementById("arrowRight");
    container = document.getElementById("schoolContainer");

    if (arrowLeft) {
        arrowLeft.addEventListener("click", moveSchools, false);
        arrowRight.addEventListener("click", moveSchools, false);
        $(".searchButton").on("click", function () {
            if ($("#search").val() != '') {
                sessionStorage.setItem("search", $("#search").val());
                window.location.href = "html/search.html";
            }

        });
        $("#search").keypress(function (event) {
            if (event.keyCode === 13 && $("#search").val() != '') {
                sessionStorage.setItem("search", $("#search").val());
                window.location.href = "html/search.html";
            }
        });
    } else {
        completePath = "../";
    }
    log = document.getElementById("login");
    logLink = document.getElementById("loginLink");
    reg = document.getElementById("register");
    regLink = document.getElementById("regLink");

    logo = document.getElementById("logo");
    window.addEventListener("scroll", checkPos, false);
    setNavFunctionality();

    if (sessionStorage.getItem("logging") === "true") {
        log.innerHTML = sessionStorage.getItem("userName");
        log.addEventListener("click", changeToUserView, false);
        reg.innerHTML = "Salir";
        reg.addEventListener("click", resetLogin, false);
    }
    uniSetUpLinks();
}

function setNavFunctionality() {
    $(".other").children().children().each(function () {
        $(this).click(function () {
            if (!window.location.href.includes("search.html")) {
                sessionStorage.setItem("search", $(this).text());
                window.location.href = completePath + "html/search.html";
            } else {
                requestSearch($(this).text(), 1);
            }

        });
    });
    $(".scholarship").click(function(){
        if(!window.location.href.includes("search.html")){
            sessionStorage.setItem("search", "becas");
            window.location.href = completePath + "html/search.html";
        }else{
            requestSearch("becas",1);
        }
    });

}

function changeToUserView() {
    if (arrowLeft) window.location.href = "./html/user.html";
    else window.location.href = "./user.html";
}

function checkPos() {

    if (uni != "undefined" || window.pageYOffset >= 50) {
        logo.style.backgroundImage = "url(" + completePath + "img/logo2.png)";
        logo.style.minWidth = "90px";
        logo.style.minHeight = "78px";
    } else {
        logo.style.backgroundImage = "url(" + completePath + "img/logo.png)";
        logo.style.minWidth = "123px";
        logo.style.minHeight = "107px";
    }
}

function resetLogin() {
    alert("Hasta la próxima " + sessionStorage.getItem("userName"));
    sessionStorage.setItem("logging", "false");
    window.location.href = completePath + "index.html";
}

function moveSchools(Event) {
    if (sInterval && Event.target == arrowRight && left > -100.2) {
        startLeft();
    } else if (sInterval && Event.target == arrowLeft && left < 0) {
        startRight();
    }
}

function startLeft() {
    interval = setInterval(moveLeft, 1);
}

function stopLeft() {
    clearInterval(interval);
}

function moveLeft() {
    sInterval = false;
    left -= 0.25;
    left = Math.round(left * 10) / 10;
    container.style.marginLeft = left + "%";
    if (Math.round((Math.abs(left) % imgWidth) * 10) / 10 == 0) {
        stopLeft();
        sInterval = true;
    }
}

function startRight() {
    interval2 = setInterval(moveRight, 1);
}

function stopRight() {
    clearInterval(interval2);
}

function moveRight() {
    sInterval = false;
    left += 0.25;
    left = Math.round(left * 10) / 10;
    container.style.marginLeft = left + "%";
    if (Math.round((Math.abs(left) % imgWidth) * 10) / 10 == 0) {
        stopRight();
        sInterval = true;
    }
}

function uniSetUpLinks() {

    $.ajax({
        dataType: "json",
        url: completePath + "xml/universidades.json",
        type: "GET"

    }).done(function (data) {
        insertUnis(data);
    }).fail(function (xhr, status, errorThrown) {
        console.log(errorThrown);
        console.log(status);
        alert("Request failed");
    });
}

function insertUnis(data) {

    for (let i = 0; i < data.universidades.length; i++) {
        $(".other2").children("ul").append($("<li>" + data.universidades[i].nombreCorto + "</li>"));
    }
    $(".other2").children("ul").css({
        "font-size": "16px"
    });
    $(".other2").children("ul").children("li").each(function(index){
        $(this).click(function(){
            window.location.href = data.universidades[index].url;
        });
    });

}
