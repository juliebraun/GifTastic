$(document).ready(function() {
function createImage(imgObj, i) {
var personDiv = $("<div>");
		var p = $("<p>").text("Rating: " + imgObj[i].rating);
		var personImage =$("<img>");
		personImage.attr("src", imgObj[i].images.original_still.url);
		personImage.addClass("still");
		var imageStill = imgObj[i].images.original_still.url;
		var imageMoving = imgObj[i].images.original.url;
		personImage.attr("data-still", imageStill);
		personImage.attr("data-moving", imageMoving);
		
		$(personImage).on("click", function(e) {
			personImage.toggleClass("still");
			if ($(personImage).hasClass("still")) {
				personImage.attr("src", imageStill);
			}else{
			personImage.attr("src", imageMoving);
			};

			console.log("checking images", imageMoving);
		})
		personDiv.prepend(p);
		personDiv.prepend(personImage);


		$("#gifs-appear-here").prepend(personDiv);
	};
function goFetch() {
var person = $(this).attr("data-person");
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        person + "&rating=pg&limit=10&api_key=dc6zaTOxFJmzC";
$.ajax({
	url: queryURL,
	method: "GET"
})

.done(function(response) {
	console.log(queryURL);
	console.log(response);

	var results = response.data

	for (var i = 0; i<results.length; i++){
		createImage(results, i);
}		
})
}
function renderButtons(input) {
		var a = $("<button>");
		a.addClass("person");
		a.click(goFetch);
		a.attr("data-person", input);
		a.text(input);
		$("#buttons-appear-here").append(a);
		console.log("test");

	}
$("form").submit(function(event) {
	event.preventDefault();
	var input = $("#person-input").val(); 
     renderButtons(input);
     $("#person-input").val("");
})

$(".gifButton").on("click", goFetch); 
});