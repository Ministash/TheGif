    var topics = ["batman", "superman", "green lantern", "wonder woman", "the flash", "aquaman", "bruce wayne", "tony stark", "ironman", "hulk"];
    var gifUrl = "https://api.giphy.com/v1/gifs/search?q=" +
        gif + "&api_key=dc6zaTOxFJmzC&limit=10";
    var gif = "";


    console.log(gifUrl);

    //This is my button maker. It also assigns the name of the button as a id to that buttons div.
    function buttonMaker() {
        for (i = 0; i < topics.length; i++) {
            $("#buttons").append(
                $("<div/>")
                    .attr('id', topics[i])
                    .addClass('x topicButtons')
                    .text(topics[i])
            );

        }

    }

    buttonMaker();


    //This is the function that controls my onclick event for my created buttons
    $(".topicButtons").on("click", function () {
        $("#imageArea").html("");
        gif = $(this).attr("id");
        gifUrl = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(gif);
        console.log(gifUrl);

//this is also where I store the API data for the gifs displayed in imageArea. I call on my imgCreator to actually create the gifs.
        $.ajax({
            url: gifUrl,
            method: "GET"
        }).then(function (response) {

            var groupGifUrl = response.data;

            imgCreator(groupGifUrl);
            
        });
        
    })

    
//This is where the gifs are created and given attributes. Also this is where I store my onclick function for pausing or starting them.
function imgCreator(groupGifUrl){
    for (i = 0; i < groupGifUrl.length; i++) {
        $("#imageArea").append(
                $("<img>")
                    .attr({
                        "width": "200",
                        "height": "200",
                        "class": "img",
                        "src": groupGifUrl[i].images.original_still.url,
                        "data-still": groupGifUrl[i].images.original_still.url,
                        "data-animate": groupGifUrl[i].images.original.url,
                        "data-state": "still"

                    })
            );
        
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





