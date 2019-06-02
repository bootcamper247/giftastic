$(document).ready(function () {


    const key = "G46lZIryTGCUU";
    var queryURL = "https://api.giphy.com/v1/gifs/search?rating=g&api_key=" + key + "&limit=10&q=";

    var topics = ["Tennis", "Swimming", "Soccer", "Skiing", "Nascar", "Hockey"];


    createButtons();


    // Event handler for user clicking the topic button
    $(document.body).on("click", ".btnTopic", function () {
        // $(".btnTopic").on("click", function () {


        $("#imagesDiv").empty();

        var searchStr = $(this).attr("data-name");
        var newURL = queryURL + searchStr;

        // Run Query and process data
        $.ajax({
            url: newURL,
            method: "GET"
            // We store all of the retrieved data inside of an object called "response"
        }).then(function (response) {

            displayGifs(response)
        });
    });

    //Event handler for submit button
    $("#btnSubmit").on("click", function (event) {

        //Preventing the button from trying to submit the form
        event.preventDefault();

        var sport = $("#sport").val().trim().toLowerCase();
        if (sport != "") {
            topics.push(sport);
            createButtons();
        }
        $("#sport").val(" ");
    });


    function displayGifs(response) {
        for (var i = 0; i < 10; i++) {

            // Read the properties
            var image_still = response.data[i].images.fixed_height_still.url;
            var image_animate = response.data[i].images.fixed_height.url;
            var rating = response.data[i].rating;

            // Create the HTML Tags
            var gifDiv = $("<div id = 'gifDiv' >");
            var displayImage = $("<img>");
            var displayRating = $("<h6>");

            // Set their attributes
            displayRating.attr("id", "idRating");
            displayRating.text("Rating: " + rating.toUpperCase());
            
            displayImage.attr("src", image_still);
            displayImage.attr("data-stillURL", image_still);
            displayImage.attr("data-animatedURL", image_animate);
            displayImage.attr("data-state", "still");
            displayImage.attr("alt", "Sports Picture");
            displayImage.addClass("gifs");

            // Appending the image and rating to the gifDiv
            displayRating.appendTo(gifDiv);
            displayImage.appendTo(gifDiv);

            // render gifDiv onto HTML page
            $("#imagesDiv").append(gifDiv);
        }
    }

    //create buttons
    function createButtons() {

        $("#buttonsDiv").empty();

        for (var i = 0; i < topics.length; i++) {

            var newBtn = $('<button class = "btn btn-info btnTopic" >');

            //customize buttons
            newBtn.text(topics[i].toUpperCase());
            newBtn.attr("data-name", topics[i].toLowerCase());
            newBtn.css("margin", "10px");
            // newBtn.addClass("btn btn-primary");

            //append buttons
            newBtn.appendTo($("#buttonsDiv"));
        }
    }

    $(document.body).on("click", ".gifs", toggle);

    function toggle() {

        var state = $(this).attr("data-state");
        var stillURL = $(this).attr("data-stillURL");
        var animatedURL = $(this).attr("data-animatedURL");

        if (state == "still") {
            $(this).attr("src", animatedURL);
            $(this).attr("data-state", "animate");
        } else if (state == "animate") {
            $(this).attr("src", stillURL);
            $(this).attr("data-state", "still");
        }
    };

});     //end of document.ready
