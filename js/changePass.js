let changePass1;
let changePass2;
let changePass0;
let doChange;
let exitUser;
let userPicture;
let confirmPicture;
let imgHolder;
let userName;
let userMail;
let userId;

let courses;
let progressBar;
let progressInfo
let pValues;

let actualCourse;
let actualCourseProgress;
let actualPinfo;


let progressCounter = 0;
let maxProgress = 0;

let r = 255;
let g = 0;
let b = 0;

let progressLoop;
let progressLooping = false;

let coursesSelectors;

function loadUserHTML() {
    uni = "undefined";
    userPicture = document.getElementById("userpicture");
    confirmPicture = document.getElementById("confirmpicture");
    confirmPicture.addEventListener("click", changePicture, false);
    coursesSelectors = document.querySelectorAll(".courseSelector");
    for (let c of coursesSelectors) {
        c.addEventListener("click", function (Event) {
            document.getElementById("output").innerHTML = "";
            document.getElementById("output").innerHTML = "";
            document.querySelectorAll(".cabecera")[0].innerHTML = event.target.innerHTML;
            init(event.target.innerHTML);
        }, false);
    }
}

function loadUserInfo() {

    changePass0 = document.getElementById("realpass")
    changePass1 = document.getElementById("pass");
    changePass2 = document.getElementById("repass");

    doChange = document.getElementById("validate");
    doChange.addEventListener("click", confirmPass, false);

    imgHolder = document.getElementById("imgHolder");

    userName = document.getElementById("name");
    userMail = document.getElementById("mail");
    userId = document.getElementById("id");

    setUserData();

    progressBar = document.querySelectorAll(".progreso");
    progressInfo = document.querySelectorAll(".pInfo");
    courses = document.querySelectorAll(".curso");
    pValues = document.querySelectorAll(".pValue");

    setCoursesData();
    //console.log(progressBar);
    //console.log(courses);
}

function confirmPass() {
    if (changePass0.value === pass) {
        changePass0.style.backgroundColor = "rgba(255,255,255,1)";
        if (changePass1.value === changePass2.value && changePass1.value != "") {
            alert("Has cambiado la contraseña");
            changePass0.value = "";
            changePass1.value = "";
            changePass2.value = "";
            changePass0.style.backgroundColor = "rgba(255,255,255,1)";
            changePass1.style.backgroundColor = "rgba(255,255,255,1)";
            changePass2.style.backgroundColor = "rgba(255,255,255,1)";
        } else if (changePass1.value != changePass2.value) {
            changePass1.style.backgroundColor = "rgba(250,100,100,0.5)";
            changePass2.style.backgroundColor = "rgba(250,100,100,0.5)";
        }
    } else {
        changePass0.style.backgroundColor = "rgba(250,100,100,0.5)";
    }

}

function logOut() {
    alert("Hasta la próxima " + name);
    sessionStorage.setItem("logging", "false");
}

function changePicture() {
    if (userPicture.value != "") {
        imgHolder.src = "../img/user/" + userPicture.files[0].name;
    }
}

function setUserData() {
    if (name.length > 28) userName.style.fontSize = "14px";
    else if (name.length > 24) userName.style.fontSize = "16px";
    userName.innerHTML = name;

    if (user.length > 34) userMail.style.fontSize = "11.5px";
    else if (user.length > 28) userMail.style.fontSize = "14px";
    else if (user.length > 24) userMail.style.fontSize = "16px";
    userMail.innerHTML = user;
    userId.innerHTML = id;
}

function setCoursesData() {
    for (let i = 0; i < courses.length; i++) {
        courses[i].addEventListener("mouseover", initProgress, false);
        courses[i].addEventListener("mouseleave", clearProgress, false);
    }

}



function clearProgress(Event) {
    maxProgress = 0;
    r = 255;
    g = 0;
    b = 0;
    progressCounter = 0;
    actualCourse = null;
    clearInterval(progressLoop);
    progressLooping = false;

}

function initProgress(Event) {
    if (!progressLooping) {
        actualCourse = event.target;
        if (actualCourse.className != "curso") {
            actualCourse = event.target.parentElement;
        }
        for (let i = 0; i < courses.length; i++) {
            if (actualCourse === courses[i]) {
                actualCourseProgress = progressBar[i];
                actualPinfo = progressInfo[i];
                if(pValues[i].innerHTML != "")maxProgress = parseInt(pValues[i].innerHTML);
                else maxProgress = 0;
                break;
            }
        }
        progressLooping = true;
        progressLoop = setInterval(completedProgress, 20);
    }

    //console.log(event.target);
}

function completedProgress() {
    actualCourseProgress.style.width = progressCounter + "%";
    actualCourseProgress.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
    if (progressCounter < 50) {
        g += 5;

    } else {
        r -= 5;
    }

    actualPinfo.innerHTML = progressCounter + " %" + " Completado";
    progressCounter++;

    if (progressCounter > maxProgress) {
        if (progressCounter >= 100) {
            actualPinfo.innerHTML = "Enhorabuena 100%";
        }
        clearInterval(progressLoop);
    }
    //console.log(maxProgress);
}
