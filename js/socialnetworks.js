$(document).ready(function(){

	$(".redes").mouseover(function(){
		$(this).css("transform", "scale(1.5)");
		$(this).css("transition", "all 0.5s");
	});

	$(".redes").mouseout(function(){
		$(this).css("transform", "scale(1)");
		$(this).css("transition", "all 0.5s");
	});

});
