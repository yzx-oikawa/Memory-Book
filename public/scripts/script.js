$(document).ready(function() {
	$(".btn").on("click", function(){
		var allImages = $("img");
		allImages.addClass("hide-img");
		var option = "." + $("label.active input").attr("id");
		var chosenImages = $(option);
		chosenImages.removeClass("hide-img");
	});
});