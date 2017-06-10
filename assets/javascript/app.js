$(document).ready(function(){

	//array of characters; new characters will be pushed into this array
	var characters = ["Richard Hendricks", "Jared Dunn", "Gilfoyle", "Dinesh", "Jian Yang", "Nelson 'Big Head' Bighetti"];

	//function to display gif buttons
	function displayGifButtons(){
		$("#buttons-view").empty(); //erases anything in this div so it does not duplicate the results
		for(var i=0; i < characters.length; i++){
			var gifButton = $("<button>");
			
			// Rather than writing `gifButton.add..` over and over again, you can chain these methods like so:
			gifButton
			  .addClass("btn btn-primary character") // You could also combine these into a space-separated string
			  .attr("data-name", characters[i])
			  .text(characters[i]);
			
        /* --------> */ $("#buttons-view").append(gifButton);
		}
	}
	//function to add a new character gif button
	function addNewButton(){
		$("#addGif").on("click", function(){
        /* --------> */ event.preventDefault();
			var character = $("#person-input").val().trim();
			if (character == ""){
				return false; //added so user cannot add a blank button
			}
			characters.push(character);// pushes new search item into the array "characters"
        displayGifButtons();
        return false; // it's hard to tell where this function ends or what this line is for

    });

	}
  //function that displays the gifs
  function displayGifs(){
    var character = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        character + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(queryURL);//displays the constructed url. these are working
        console.log(character);//displays current character.these are working

        $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response){
          console.log(response);//console log to make sure something returns.
          $("#gifs-view").empty(); //empties everything in this div for the next click
          var results = response.data;
          if(results ===""){
            alert("There's no gif for this selected button");
          }
          for (var i=0; i < results.length; i++){
            var gifDiv = $("<div>"); //uses jQuery to create a div for gifs to go inside
            gifDiv.addClass("gifDiv");
            var gifRating = $("<p>").text("Rating: " + results[i].rating); //create p tag to display rating in upper case letters
            gifDiv.append(gifRating);
            // console.log(gifRating);
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_still.url); //still image stored into src attr
            gifImage.attr("data-still", results[i].images.fixed_height_still.url);
            gifImage.attr("data-animate", results[i].images.fixed_height.url);//animated
            gifImage.attr("data-state", "still"); //sets the image state
            gifImage.addClass("image");

            gifDiv.append(gifImage);
            // gifDiv.append(gifRating);

            $("#gifs-view").prepend(gifDiv);
	    // Now that you're familiar with many of the jQuery methods
	    // you can make things easier on youself by concatenating you html
	    // with strings and your raw data, for e.g.
	    //
	    // $('#gifs-view').html(
	    //      '<div class="gifDiv">'
            //    +   '<p>Rating: ' + results[i].rating + '</p>'
	    //    ... etc.
	    //	  + '</div>'
	    // )
	    //
	    // But, of course, if you prefer the other, that's totally fine
        }
    });
}
  //invoking the functions
  displayGifButtons();
  addNewButton();

  //event listeners
  $(document).on("click", ".character", displayGifs);
  $(document).on("click", ".image", function(){
    var state = $(this).attr("data-state");
    if(state === "still"){
      $(this).attr("src", $(this).data("animate"));
      $(this).attr("data-state", "animate");
    }else{
      $(this).attr("src", $(this).data("still"));
      $(this).attr("data-state", "still");

    }
  });
});
