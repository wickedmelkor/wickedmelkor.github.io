let sIndex = 1;

function initSearchFunctionality() {

    $("#search").keypress(function (event) {
        if (event.keyCode === 13 && $("#search").val() != '') {
            resetSearchItems();
            requestSearch($("#search").val(), sIndex);
            sessionStorage.setItem("search", $("#search").val());
        }
    });
    $(".searchButton").on("click", function () {
        if ($("#search").val() != '') {
            resetSearchItems();
            requestSearch($("#search").val(), sIndex);
            sessionStorage.setItem("search", $("#search").val());
        }
    });
    $(".searchFooter").on("click", function(){
        sIndex += 10;
        requestSearch(sessionStorage.getItem("search"),sIndex);
    });
}

function resetSearchItems() {
    sIndex = 1;
    $(".displayedList").empty();
}
