function requestCourse(course, courseIndex) {

    $.ajax({
        dataType: "json",
        url: "../xml/" + course + ".Json",
        type: "GET"

    }).done(function (data) {

        $("<header class='courseHeader'>Curso de " + data.nombre + "</header>").appendTo($(".card2"));

        if (data.clases[courseIndex].video) setNormalGrid(data, courseIndex);
        else setPracticeGrid(data, courseIndex);


        $("<footer></footer>").append($("<div class='previousLesson'>Anterior</div>")).appendTo($(".card2"));

        $(".card2").children("footer").append($("<div class='nextLesson'>Siguiente clase</div>"));

        configureCss(data, courseIndex);
        configureNextPrev(data.clases.length - 1, courseIndex);


    }).fail(function (xhr, errorThrown, status) {
        console.log(errorThrown);
        console.log(xhr);
    });
}

function setPracticeGrid(data, courseIndex) {
    let article2 = document.createElement("article");
    article2.className = "lesson data";
    $("<header>" + data.clases[courseIndex].titulo + "</header>").appendTo(article2);
    $(".card2").append(article2);
    $("<iframe class='blocky' src='" + data.clases[courseIndex].reto + "' frameborder='0'></iframe>").appendTo(article2);
}

function setNormalGrid(data, courseIndex) {
    let div1 = document.createElement("div");
    div1.className = "grid";
    $(".card2").append(div1);

    let article1 = document.createElement("article");
    article1.className = "lesson video";
    $("<iframe src='" + data.clases[courseIndex].video + "' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen></iframe>").appendTo(article1);
    div1.appendChild(article1);

    let article2 = document.createElement("article");
    article2.className = "lesson data";
    $("<header>" + data.clases[courseIndex].titulo + "</header>").appendTo(article2);
    $(".grid").append(article2);

    if (data.clases[courseIndex].info2) setTextCourse(data, article2, courseIndex);
    else if (data.clases[courseIndex].blocky) setInteractiveCourse(data, article2, courseIndex);
}

function setTextCourse(data, article2, courseIndex) {

    let div2 = document.createElement("div");
    div2.className = "grid";

    let splitted = data.clases[courseIndex].info1.split("¿");
    let div2d1 = document.createElement("div");
    for (let s of splitted) {
        $("<p>" + s + "</p>").appendTo(div2d1);
    }

    splitted = data.clases[courseIndex].info2.split("¿");
    let div2d2 = document.createElement("div");
    for (let s of splitted) {
        $("<p>" + s + "</p>").appendTo(div2d2);
    }
    div2.appendChild(div2d1);
    div2.appendChild(div2d2);
    article2.appendChild(div2);
}

function setInteractiveCourse(data, article2, courseIndex) {
    $("<iframe class='blocky' src='" + data.clases[courseIndex].blocky + "' frameborder='0'></iframe>").appendTo(article2);
}

function configureNextPrev(offset, courseIndex) {
    if (courseIndex > 0) $(".previousLesson").css("visibility", "visible");
    else $(".previousLesson").css("visibility", "hidden");

    if (courseIndex < offset) $(".nextLesson").css("visibility", "visible");
    else $(".nextLesson").css("visibility", "hidden");

    $(".nextLesson").click(function () {
        $(".card2").empty();
        requestCourse("cursoJava", courseIndex + 1);

    });

    $(".previousLesson").click(function () {
        $(".card2").empty();
        requestCourse("cursoJava", courseIndex - 1);
    });
}

function configureCss(data, courseIndex) {
    if (data.clases[courseIndex].reto) {
        $(".card2").children("header").remove();
        $(".card2").css({
            "margin-top": "50px",
            "height": "92vh"
        });
        $(".card2").children("footer").css({
            "width": "100%",
            "text-align": "center",
            "bottom": "0%"
        });

        $("iframe").css("height", "99.5%");
    } else {
        $(".card2").css({
            "margin-top": "",
            "height": ""
        });
        $(".card2").children("footer").css({
            "width": "50%",
            "text-align": "right",
            "bottom": "3px"
        });

    }
}
