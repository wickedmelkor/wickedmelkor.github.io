let loading = "true";

function requestSearch(word, startingIndex) {

    $('.loadAnimation').css('display', 'inherit');
    if (word === '') word = sessionStorage.getItem("search");
    if (startingIndex < 1 || !startingIndex) startingIndex = 1;
    else if (startingIndex > 91) startingIndex = 91;
    let key = "AIzaSyCEXSc-xBT0kDQ3Yb-gaxAdJKQZa6eyE-E";
    let cx = "002578163200508136970:crlapyyaqoc";
    if (startingIndex == 1) {
        $(".displayedList").empty();
    }
    $.ajax({
            url: "https://www.googleapis.com/customsearch/v1",
            type: "GET",
            data: {
                key: key,
                cx: cx,
                lr: "lang_es",
                start: startingIndex,
                q: word
            },


        })
        .done(function (data) {
            $(".searchHeader").text("Resultado de la busqueda: " + word);
            for (let i = 0; i < data.items.length; i++) {
                if (data.items[i].pagemap.cse_image) {
                    let li = document.createElement("li");
                    $('<img/>', {
                        src: data.items[i].pagemap.cse_image[0].src
                    }).appendTo(li);

                    $('<h3>' + data.items[i].title + '</h3>').appendTo(li);
                    $('<p>' + data.items[i].snippet + '</p>').appendTo(li);
                    $('<a/>', {
                        class: 'courseLink',
                        text: 'Más información',
                        href: data.items[i].link,
                        target: "_blank"
                    }).appendTo(li);
                    $(".courseLink").mouseover(function () {
                        $(this).parent().append(document.createElement("div"));
                    });
                    $(".courseLink").mouseout(function () {
                        $(this).parent().children("div").remove();
                    });

                    $(".displayedList").append(li);
                }
            }
            $('.loadAnimation').css('display', 'none');
        })
        .fail(function (xhr, status, errorThrown) {
            console.log("STATUS: " + status);
            console.log("ERROR: " + errorThrown);
            console.dir(xhr);
            alert("PROBLEM KO");
        }).always(function (xhr, status) {

        });

}

function loadAnimation() {

}
