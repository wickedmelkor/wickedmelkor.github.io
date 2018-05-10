let c2;
let ctx2;
let formContainer;
let video;
let blur;
let screenfixed = false;
let refixed = false;
function loadVideo() {
    c2 = document.getElementById("videoCanvas");
    c2.width = window.screen.availWidth;
    c2.height = window.screen.availHeight / 2 + 200;
    ctx2 = c2.getContext("2d");
    blur = document.querySelectorAll(".blur");


    formContainer = document.querySelectorAll(".formContainer")[0];
    configVideo();

}

function configVideo() {
    video = document.querySelector("video");
    video.loop = true;
    video.autoplay = true;
    video.width = c2.width;
    video.height = c2.height;
    video.load();
    video.play();
    requestAnimationFrame(updateCanvas);

    for (let b of blur) {
        b.addEventListener("mouseover", function () {
            c2.style.filter = "blur(7px) sepia(100%)";
        }, false);
        b.addEventListener("mouseleave", function () {
            c2.style.filter = "blur(0px) sepia(0%)";
        }, false);
    }

}

function updateCanvas() {
    ctx2.clearRect(0, 0, c2.width, c2.height);
    ctx2.drawImage(video, 0, 0, c2.width, c2.height);
    requestAnimationFrame(updateCanvas);
}
