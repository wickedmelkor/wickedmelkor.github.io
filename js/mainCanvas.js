let c1;
let ctx1;
let interval1;
let resolution;
let border;
let universities = new Array();
let universitiesBack = new Array();

let superContainer;
let firstEffect = false;
let globalTopMargin = 0;
let marginTopOffset;

let arrowUp;
let isResetingView = false;

let info1;
let info2;
let info3;
let info4;
let info5;
let infos = new Array();

let speed;

function loadCanvas() {

    superContainer = document.getElementById("card1");
    c1 = document.getElementById("mainCanvas");
    c1.style.backgroundColor = "#E5ECFC";

    info1 = document.getElementById("info1");
    info2 = document.getElementById("info2");
    info3 = document.getElementById("info3");
    info4 = document.getElementById("info4");
    info5 = document.getElementById("info5");

    info5.style.fontFamily = "MyFont";
    info5.addEventListener("click", registerView, false);
    loadInfo();

    updateResolution();
    loadPictures();

    ctx1 = c1.getContext("2d");
    ctx1.font = "40px FangSong";
    ctx1.fillStyle = "#415FA5";

    border = new BorderAnimation();
    drawCanvas();
}

function registerView() {
    window.location.href = "html/register.html";
}

function setUniView() {

    globalTopMargin = window.scrollY;
    speed = parseInt((((marginTopOffset - globalTopMargin) * 100) / marginTopOffset) / 4);
    if (speed < 2) speed = 2;

    if (globalTopMargin < marginTopOffset && !firstEffect) {
        globalTopMargin += speed;
        if (globalTopMargin >= marginTopOffset) {
            window.scrollTo(0, marginTopOffset);
            firstEffect = true;
        }
    } else if (globalTopMargin > marginTopOffset && !firstEffect) {
        globalTopMargin -= speed;
        if (globalTopMargin <= marginTopOffset) {
            window.scrollTo(0, marginTopOffset);
            firstEffect = true;
        }
    }

    window.scrollTo(0, globalTopMargin);
}

function updateResolution() {
    resolution = window.screen.availWidth;
    if (resolution <= 1600) {
        c1.width = 1680;
        c1.height = 400;
        marginTopOffset = 355;
    } else if (resolution <= 1680) {
        c1.width = 1680;
        c1.height = 450;
        marginTopOffset = 375;
    } else if (resolution <= 1750) {
        c1.width = 1665;
        c1.height = 403;
        marginTopOffset = 375;
    } else if (resolution <= 1920) {
        c1.width = 1680;
        c1.height = 400;
        marginTopOffset = 390;
    }
}

function loadPictures() {

    for (let i = 0; i < 12; i++) {
        universities.push(document.getElementById(i));
        universities[i].addEventListener("dragend", dragging, false);
        universities[i].addEventListener("mousemove", dragging, false);
        universitiesBack.push(new Image());
        universitiesBack[i].src = "img/centros/" + (i + 1) + "back.png";
    }

}

function loadInfo() {

    infos.push(new Info(info1, 150, 20, 5, 20, 4));
    infos.push(new Info(info2, 25, -50, 25, 10, 3));
    infos.push(new Info(info3, 10, 100, 10, 72, 1));
    infos.push(new Info(info4, 40, 150, 40, 40, 4));
    infos.push(new Info(info5, 60, 180, 60, 10, 4));
    for (let i = 0; i < infos.length; i++) {
        infos[i].reset();
    }

}

function dragging(Event) {

    let x = Event.pageX - c1.offsetLeft;
    let y = Event.pageY - c1.offsetTop;
    if (x >= 0 && x <= c1.width && y >= 0 && y <= c1.height) {
        uni = Event.target;
        border.imgX = x;
        border.imgY = y;
        border.reset();
        clearInterval(interval1);
        loadJSON("xml/universidades.json", Event.target.name);

        interval1 = setInterval(drawCanvas, 25);
        for (let i of infos) {
            i.reset();
        }
    }
}

function BorderAnimation() {

    this.increment = 1;
    this.switch = true;
    this.r = 182;
    this.g = 200;
    this.b = 239;
    this.a = 0.5;
    this.offset = 5;
    this.w = 0;
    this.nw = c1.width;
    this.h = 0;
    this.nh = c1.height;
    this.triggerEvent = false;

    this.imgX = null;
    this.imgY = null;
    this.img = null;

    this.switchImg = true;

    this.backgroundEffect = function () {
        ctx1.save();
        ctx1.globalAlpha = this.a - 0.5;
        ctx1.drawImage(universitiesBack[this.img.id], 0, 0);
        ctx1.restore();
    }
    this.updateImgPosition = function () {

        if (this.switchImg) {
            if (this.imgX > 20) {
                this.imgX -= 30;
            } else {
                this.imgX = 20;
                this.switchImg = false;
            }
        } else {
            if (this.imgY > 20) {
                this.imgY -= 15;
            } else {
                this.imgY = 20;
            }
        }

    }
    this.updateSize = function () {
        if (this.switch) {
            if (this.w < c1.width) {
                this.w += 40;
                this.nw -= 40;
            }
            if (this.h < c1.height) {
                this.h += 15;
                this.nh -= 15;
            }

            if (this.w >= c1.width && this.h >= c1.height) {
                this.switch = false;
            }

        }
        if (!this.switch && !isResetingView) {
            if (this.a < 1.5) {
                this.a += 0.008;
            }
        }


    }
    this.draw = function () {

        if (this.triggerEvent) {
            this.backgroundEffect();
            ctx1.strokeStyle = "rgba(" + this.r +
                "," + this.g +
                "," + this.b +
                "," + this.a + ")";
            ctx1.shadowColor = "rgba(" + this.r +
                "," + this.g +
                "," + this.b +
                "," + this.a + ")";
            ctx1.lineWidth = 10;

            ctx1.save();

            ctx1.beginPath();
            ctx1.moveTo(c1.width - this.offset, 0);
            ctx1.lineTo(c1.width - this.offset, this.h);
            ctx1.shadowBlur = 20;
            ctx1.shadowOffsetX = -10;
            ctx1.shadowOffsetY = -10;
            ctx1.fill();
            ctx1.closePath();
            ctx1.stroke();

            ctx1.beginPath();
            ctx1.moveTo(c1.width - this.offset, c1.height - this.offset);
            ctx1.lineTo(this.nw, c1.height - this.offset);
            ctx1.closePath();
            ctx1.stroke();

            ctx1.beginPath();
            ctx1.moveTo(0, this.offset);
            ctx1.lineTo(this.w - this.offset, this.offset);
            ctx1.shadowBlur = 30;
            ctx1.shadowOffsetX = 10;
            ctx1.shadowOffsetY = 10;
            ctx1.fill();
            ctx1.closePath();
            ctx1.stroke();

            ctx1.beginPath();
            ctx1.moveTo(this.offset, c1.height);
            ctx1.lineTo(this.offset, this.nh);
            ctx1.closePath();
            ctx1.stroke();

            ctx1.shadowColor = "black";
            ctx1.shadowBlur = 20;
            ctx1.shadowOffsetX = 15;
            ctx1.shadowOffsetY = 15;
            ctx1.drawImage(this.img, this.imgX, this.imgY);

            ctx1.restore();

            this.updateImgPosition();
            this.updateSize();
        }
    }
    this.reset = function () {
        this.img = uni;
        this.triggerEvent = true;
        this.switch = true;
        this.switchImg = true;
        this.w = 0;
        this.h = 0;
        this.nw = c1.width;
        this.nh = c1.height;
        this.a = 0.5;
        this.r = 65; //Math.floor(Math.random() * 50) + 100;
        this.g = 95;
        Math.floor(Math.random() * 50) + 100;
        this.b = 165; //Math.floor(Math.random() * 50) + 200;

    }
}

function Info(elem, top, right, offTop, offRight, speed) {
    this.elem = elem;
    this.topOrigin = top;
    this.rightOrigin = right;
    this.top = top;
    this.right = right;
    this.offsetTop = offTop;
    this.offRight = offRight;
    this.speed = speed;

    this.update = function () {
        if (this.top < this.offsetTop) {
            this.top++;
        } else if (this.top > this.offsetTop) {
            this.top -= this.speed;
        }
        if (this.right < this.offRight) {
            this.right += 2;
        } else if (this.right > this.offRight) {
            this.right -= this.speed;
        }
        this.elem.style.top = this.top + "%";
        this.elem.style.right = this.right + "%";
    }
    this.reset = function () {
        this.top = this.topOrigin;
        this.right = this.rightOrigin;
        this.elem.style.top = this.top + "%";
        this.elem.style.right = this.right + "%";
        firstEffect = false;
    }

}

function drawCanvas() {
    ctx1.clearRect(0, 0, c1.width, c1.height);
    if (uni != "undefined") {

        for (let i of infos) {
            i.update();
        }
        setUniView();
        border.draw();
        if (border.a >= 1.5) clearInterval(interval1);

    } else if (!firstEffect) {
        ctx1.fillText("Arrastra una universidad aqui", c1.width / 3, c1.height / 2.5);
    }

}
