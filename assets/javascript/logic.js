var topics = ["batman", "superman", "green lantern", "wonder woman", "the flash", "aquaman", "bruce wayne", "tony stark", "ironman", "hulk"];
var gifUrl = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC&limit=10";
var gif;
buttonMaker();

console.log(gifUrl);

//This is my button maker. It also assigns the name of the button as a id to that buttons div.
function buttonMaker() {
    $("#buttonWrapper").empty();
    for (i = 0; i < topics.length; i++) {
        $("#buttonWrapper").append(
            $("<div/>")
                .attr('id', topics[i])
                .addClass('x topicButtons')
                .text(topics[i])
        );

    }

}




//This is the function that controls my onclick event for my created buttons
function buttonClick() {
    $(".imageArea").html("");
    gif = $(this).attr("id");
    console.log(gif);
    gifUrl = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log(gifUrl);

    //this is also where I store the API data for the gifs displayed in imageArea. I call on my imgCreator to actually create the gifs.
    $.ajax({
        url: gifUrl,
        method: "GET"
    }).then(function (response) {

        var groupGifUrl = response.data;
        imgCreator(groupGifUrl);
        
    });
    
}


//This is where the gifs are created and given attributes. Also this is where I store my onclick function for pausing or starting them.
function imgCreator(groupGifUrl) {
    for (i = 0; i < groupGifUrl.length; i++) {
        
        var rating = groupGifUrl[i].rating;
        var thingImage = $("<img>");
        var p = $("<div>").text("Rating: " + rating).attr("class", "rating");

        thingImage.attr({
            "width": "230",
            "height": "230",
            "class": "img",
            "src": groupGifUrl[i].images.original_still.url,
            "data-still": groupGifUrl[i].images.original_still.url,
            "data-animate": groupGifUrl[i].images.original.url,
            "data-state": "still"
        })


        $(".imageArea").append(p);
        p.append(thingImage);



    }

    $(".img").on("click", function () {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
            console.log(this);
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");

        }
    });
}


$("#submit").on("click", function (event) {
    event.preventDefault();
    var newButtonItem = $("#userInput").val().trim();
    console.log(topics);
    topics.push(newButtonItem);


    buttonMaker();



})

$(document).on("click", ".topicButtons", buttonClick);
