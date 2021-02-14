var lista = ["Portada.jpg", "ca1.jpg", "im2.jpg", "ca2.jpg", "ds1.jpg"];

var i = 0;
var estado;

function carrusel(){
	document.querySelector('.main-header--inicio').classList.toggle("appearing");
	document.querySelector('.main-header--inicio').style.backgroundImage =`url(img/${lista[i]})`;
	setTimeout(() => {
		document.querySelector('.main-header--inicio').classList.toggle("appearing");
	}, 1000);
	
	i++;

	if(i >= lista.length){
		i = 0;
	}

	estado = setTimeout("carrusel()", 2600);
}

$(document).ready(function(){

	carrusel();

	$(".redes").mouseover(function(){
		$(this).css("transform", "scale(1.5)");
		$(this).css("transition", "all 0.5s");
	});

	$(".redes").mouseout(function(){
		$(this).css("transform", "scale(1)");
		$(this).css("transition", "all 0.5s");
	});
});