let userInfo;
let cursosInfo;
let userIndex = parseInt(sessionStorage.getItem("userIndex"));

function init(toFind) {

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        //console.log("RSTXT: " + this.responseText);
        if (this.readyState == 4 /*&& this.status == 200*/ ) {
            //console.log("READYSTT: " + this.readyState);
            //console.log("STATUS: " + this.status);

            userInfo = this.responseXML.getElementsByTagName("usuario");
            //console.log("USER: " + users[0]);

            //USER INFO
            let img = userInfo[userIndex].getElementsByTagName("pathUsu")[0].innerHTML;
            user = userInfo[userIndex].getElementsByTagName("mail")[0].innerHTML;
            pass = userInfo[userIndex].getElementsByTagName("pass")[0].innerHTML;
            name = userInfo[userIndex].getElementsByTagName("nombreUser")[0].innerHTML;
            id = userInfo[userIndex].getElementsByTagName("id")[0].innerHTML;

            let div = "<div id='userCard' class='userCard'>" +
                "<div class='face A'>" +
                "<img id='imgHolder' src=" + img + ">" +
                "<p id='name' class='userInfo'>" + name + "</p>" +
                "<p id='mail' class='userInfo'>" + user + "</p>" +
                "<p id='id' class='userInfo'>" + id + "</p>" +
                "<p id='userRot' class='userInfo'>Mantén el ratón encima para cambiar contraseña</p> </div>" +
                "<div class='face B'>" +
                "<label>Contraseña <input id='realpass' type='password' name='pass' maxlength='27' size='27' required></label>" +
                "<label>Nueva cont <input id='pass' type='password' name='pass' maxlength='27' size='27' required></label>" +
                "<label>Repítela <input id='repass' type='password' name='pass' maxlength='27' size='27' required></label>" +
                "<button class='button pass' id='validate'>Aceptar</button> </div></div>";

            document.getElementById("userCardContainer").innerHTML = div;

            //USER COURSES
            //let strOut = "<ul>";
            let ul = document.createElement("ul");
            let userCoursesNames = new Array();
            let userCourseProgress = new Array();
            let cursos = userInfo[userIndex].getElementsByTagName("curso");

            for (let j = 0; j < cursos.length; j++) {
                //NOMBRE DEL CURSO DEL USUARIO
                let nombre = cursos[j].getElementsByTagName("nombre")[0].innerHTML;
                userCoursesNames.push(nombre);
                let progreso = cursos[j].getElementsByTagName("progreso")[0].innerHTML;
                userCourseProgress.push(progreso);
                //console.log("@USUARIO: " + nombre);
                //REQUEST A EL XML DE CURSOS
                let xhttp2 = new XMLHttpRequest();

                xhttp2.onreadystatechange = function () {

                    if (this.readyState === 4) {

                        cursosInfo = this.responseXML.getElementsByTagName("curso");
                        for (let i = 0; i < cursosInfo.length; i++) {
                            let curName = cursosInfo[i].getElementsByTagName("nombre")[0].innerHTML;
                            //console.log("@CURSOS: " + curName);
                            if (toFind === "Tus cursos") {
                                if (nombre === curName) {
                                    let pathImg = cursosInfo[i].getElementsByTagName("pathImg")[0].innerHTML;
                                    let desc1 = cursosInfo[i].getElementsByTagName("desc")[0].innerHTML;
                                    let desc2 = cursosInfo[i].getElementsByTagName("desc")[1].innerHTML;
                                    let desc3 = cursosInfo[i].getElementsByTagName("desc")[2].innerHTML;
                                    let nombreUni = cursosInfo[i].getElementsByTagName("nombreUni")[0].innerHTML;
                                    let li = document.createElement("li");
                                    li.className = "curso";

                                    let strOut = "";
                                    strOut += "<img src='" + pathImg + "'>";
                                    strOut += "<h3>" + curName + "</h3>";
                                    strOut += "<h4>" + desc1 + "</h4>";
                                    strOut += "<span>" + nombreUni + "</span>";
                                    strOut += "<div>";
                                    strOut += "<div>";
                                    strOut += "<div class='progreso'>";

                                    strOut += "</div>";
                                    strOut += "<h4 class='pInfo'></h4>";
                                    strOut += "<h4 class='pValue'>" + progreso + "</h4>";
                                    strOut += "</div>";
                                    strOut += "<h3>" + curName + "</h3>";
                                    strOut += "<p>" + desc2 + "</p>";
                                    strOut += "<p>" + desc3 + "</p>";
                                    strOut += "<div class='entrar'>Entrar en el curso</div>";
                                    strOut += "</div>";

                                    li.innerHTML = strOut;
                                    ul.appendChild(li);
                                    document.getElementById("output").appendChild(ul);
                                    loadUserInfo();
                                }
                            }
                        }
                    }
                    setCourseDestination();
                };
                xhttp2.open("GET", "../xml/cursos.xml", true);
                xhttp2.send();

            }
            if (toFind === "Todos los cursos") loadAllCourses(userCoursesNames, userCourseProgress);
            else if (toFind === "Programación" || toFind === "Robótica" || toFind === "Diseño" || toFind === "Mentiras arriesgadas") {
                loadAllCourses(userCoursesNames, userCourseProgress,toFind);
            }
        }
    };

    xhttp.open("GET", "../xml/usuarios.xml", true);
    xhttp.send();

}
function setCourseDestination(){
    $('.entrar').on('click',function(){
        window.location.href = "./curso.html";
    });
}

//window.onload = init;
