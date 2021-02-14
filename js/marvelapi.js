addEventListener("DOMContentLoaded", () => {
	// Detectamos los elementos HTML que van a contener a nuestros datos de los personajes
	const ironmanContainer = document.getElementById("ironman-container"),
		  capitanamericaContainer = document.getElementById("capitanamerica-container"),
		  doctorstrangeContainer = document.getElementById("doctorstrange-container");

	/*

	¿Qué es AJAX?
	A = Asincrono
	J = Javascript
	A = And (Y)
	X = XML

	Básicamente es una forma de hacer peticiones de información a un servidor de forma asíncrona, por eso "Asíncrono".
	Además, estas peticiones no nos cargan una pagina web nueva, sino que podemos acceder a la información desde la página actual
	Pero estas peticiones siempre son de datos, anteriormente se usaba mucho el XML para poder acceder a la data del
	backend, pero actualmente se usa más JSON, que es una forma de ordenar datos mucho más intuitiva y menos pesada.

	Siempre cuando hagamos peticiones al servidor para poder usar su API, obtendremos un archivo JSON para hacerlo

	¿Qué es la API?
	A = Aplicacion
	P = Programación
	I = Interface

	Pongamos de ejemplo a Google Maps, podríamos decir que es una aplicación, porque tiene un frontend, backend y 
	porque podemos acceder a ella desde cualquier dispositivo; ahora, ¿Te imaginas si quisieras hacer algo parecido
	a Google Maps? Te llevaría mucho tiempo y dinero, por eso es mejor usar la API de google maps para hacer aplicaciones 
	parecidas, ya que usaríamos los datos que tiene guardados. Aplicaciones que usan la API de Google Maps podríamos poner
	de ejemplo: TuRuta y Moovit.

	Ahora sí le entramos al código...

	*/

	// Se crea el método ajax que nos devolverá información de la petición
	const ajax = (request) => {
		/*

		¿Qué son las promesas?
		Son una forma de controlar los errores que podrían venir del servidor o del cliente y que denegarían
		la consulta a los datos de la API que querramos usar.

		*/
		return new Promise((resolve, reject) => {
			// Se crea la variable xhr que va a ser una petición por el protocolo HTTP
			const xhr = new XMLHttpRequest();
			// Se abre la petición HTTP que hicimos al servidor
			xhr.open(request.method, request.url, true);
			// Cuando la petición se cargue, se debe especificar qué se hará con la data
			xhr.addEventListener("load", (event1) => {
				resolve(event1.target);
			});
			// Enviamos la data a nuestra web local
			xhr.send();
		});
	}

	const showMarvel = () => {
		loadAPI("iron man",ironmanContainer);
		loadAPI("captain america",capitanamericaContainer);
		loadAPI("doctor strange",doctorstrangeContainer);
	}

	const loadAPI = async (characterMarvel, containerOfComics) => {
		// Este método nos hace cargar la API de marvel por cada personaje que querramos consultar.
		console.log(characterMarvel);

	/*

	Pero... ¿Qué significa el async? ¿Y el await que está más abajo?
	Estas palabras clave hacen que nuestra petición al servidor y la inserción de datos se hagan de forma síncrona
	resulta que javascript es asíncrono.

	¿Qué se imprimirá primero? ¿El 1 o el 2?

		var a = 1;
		setTimeout(() => {
			document.write(2);
		}, 2000);
		document.write(a);

	La respuesta correcta es el 1, luego de dos segundos se imprimirá el 2.

	Como vemos, no se ha esperado a que el 2 se imprima para que recién lo haga el 1, eso es asincronía, el código sigue
	ejecutandose a pesar que hay código que no lo hizo.

	Ahora imaginémos hacer esto pero haciendo peticiones a un servidor, nosotros no sabemos cuánto tiempo se demorará
	en darnos respuesta. por eso necesitamos que al momento de hacer la petición AJAX, Javascript espere a que el servidor nos 
	brinde una respuesta, por eso el async y await

	*/

		let character = characterMarvel.split(" ");
		// Aquí hay códigos de acceso a la API de Marvel
		const hash = "394a7fb3ae9d2d6af7b66fc7d7a72ef8";
		const apiKey = "a54e9d1ed7b3e1b43f1a69cffa56e75a";
		const url = `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${character[0]}%20${character[1]}&ts=1&apikey=${apiKey}&hash=${hash}&limit=5`;
		const request = {
			method: "GET",
			url
		}
		const response = await ajax(request);
		// Detectará qué mensaje o estado se muestra para luego informar sobre este.
		switch (response.status) {
			case 200:
				draw(JSON.parse(response.responseText).data.results, containerOfComics);
				console.log(JSON.parse(response.responseText).data.results);
				break;
			case 400:
				console.log("No se encontró el item");
		}
	}

	const drawFragment = (data, containerOfComics) => {
		const fragment = `
<div class="main-content__comic">
	<div class="main-content__comic__image">
		<a href="${data.urls[1].url}" target="_blank">
			<img src="${data.thumbnail.path + `/portrait_incredible.` + data.thumbnail.extension}">
		</a>
	</div>
	<h1 class="main-title__small main-content__comic__title"><a href="${data.urls[1].url}" target="_blank">${data.name}</a></h1>
</div>
`;
		containerOfComics.insertAdjacentHTML("beforeend", fragment);
	}

	const draw = (datas, containerOfComics) => {
		containerOfComics.innerHTML = "";
		datas.forEach((data) => {
			drawFragment(data, containerOfComics);
		});
	}

	addEventListener("load", () => {
		showMarvel();
	});
});