function loadAllCourses(userCoursesNames, userCourseProgress, courseCategory) {
    let xhttp2 = new XMLHttpRequest();

    xhttp2.onreadystatechange = function () {

        if (this.readyState === 4) {
            let ul = document.createElement("ul");
            cursosInfo = this.responseXML.getElementsByTagName("curso");
            for (let i = 0; i < cursosInfo.length; i++) {
                let curName = cursosInfo[i].getElementsByTagName("nombre")[0].innerHTML;
                //console.log("@CURSOS: " + curName);
                let progress = "";
                for (let j = 0; j < userCoursesNames.length; j++) {
                    if (curName === userCoursesNames[j]) progress = userCourseProgress[j];
                }
                let pathImg = cursosInfo[i].getElementsByTagName("pathImg")[0].innerHTML;
                let desc1 = cursosInfo[i].getElementsByTagName("desc")[0].innerHTML;
                let desc2 = cursosInfo[i].getElementsByTagName("desc")[1].innerHTML;
                let desc3 = cursosInfo[i].getElementsByTagName("desc")[2].innerHTML;
                let nombreUni = cursosInfo[i].getElementsByTagName("nombreUni")[0].innerHTML;
                let category = cursosInfo[i].getElementsByTagName("categoria")[0].innerHTML;

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
                strOut += "<h4 class='pValue'>" + progress + "</h4>";
                strOut += "</div>";
                strOut += "<h3>" + curName + "</h3>";
                strOut += "<p>" + desc2 + "</p>";
                strOut += "<p>" + desc3 + "</p>";
                strOut += "<div class='entrar'>Entrar en el curso</div>";
                strOut += "</div>";
                if (courseCategory) {
                    if (courseCategory === category) {
                        li.innerHTML = strOut;
                        ul.appendChild(li);
                        document.getElementById("output").appendChild(ul);
                        loadUserInfo();
                    }
                } else {
                    li.innerHTML = strOut;
                    ul.appendChild(li);
                    document.getElementById("output").appendChild(ul);
                    loadUserInfo();
                }


            }
        }
        setCourseDestination();
    };
    xhttp2.open("GET", "../xml/cursos.xml", true);
    xhttp2.send();
}
