// $(document).ready(function(){


var topics = ["batman", "superman", "green lantern", "wonder woman", "the flash", "aquaman", "bruce wayne", "tony stark", "ironman", "hulk"];
var gifUrl = "https://api.giphy.com/v1/gifs/search?q=" +
gif + "&api_key=dc6zaTOxFJmzC&limit=10";
var gif = "";
var running = false;


console.log(gifUrl);

//This is my button maker. It also assigns the name of the button as a id to that buttons div.
function buttonMaker(){
    for(i = 0; i < topics.length; i++){
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
$(".topicButtons").on("click", function(){
    $("#imageArea").html("");
        gif = this.id;
        gifUrl = "https://api.giphy.com/v1/gifs/search?q=" +
        gif + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(gif);
        console.log(gifUrl);

      

      $.ajax({
        url: gifUrl,
        method: "GET"
      }).then(function(response){


        
     var groupGifUrl = response.data;
        
     
     for(i = 0; i < groupGifUrl.length; i++){
         
         var imageTag = $("<img>");
         
         if(running === true){
             imageTag.attr("src", groupGifUrl[i].images.original.url);
            }else{
                imageTag.attr("src", groupGifUrl[i].images.original_still.url);
            }
            imageTag.attr("width", "200");
            imageTag.attr("height", "200");
            imageTag.attr("class", "img");
            
            $("#imageArea").append(imageTag);
        }
        
        $(".img").on("click", function(){
            running = true;
            console.log(running);
          });

      })


      
    // });











      

    });
