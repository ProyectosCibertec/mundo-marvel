function formularioMundoMarvel(formulario) {
	var nombres = formulario.nombres;

	if (nombres.value == "" || nombres.value == "Escribir sus nombres") {
		alert("Ingrese sus nombres por favor");
		nombres.focus();
		nombres.select();
		return false;
	}

	var apellidos = formulario.apellidos;
	if (apellidos.value == "" || apellidos.value == "Escribir sus apellidos") {
		alert("Ingrese sus apellidos por favor");
		apellidos.focus();
		apellidos.select();
		return false;
	}

	var email = formulario.email;
	if (!(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(email.value))) {
		alert("Correo no válido");
		email.focus();
		email.select();
		return false;
	}

	var mundoMarvel = formulario.mundoMarvel;

	var personajeSeleccionado = false;
	for (var i = 0; i < mundoMarvel.length; i++) {
		if (mundoMarvel[i].checked) {
			personajeSeleccionado = true;
		}
	}

	if (!personajeSeleccionado) {
		alert("Seleccione un personaje");
		return false;
	}

	if (formulario.opiniones.value == 0) {
		alert("Ingrese sus opiniones por favor");
		formulario.opiniones.select();
		formulario.opiniones.focus();
		return false;
	}

	alert("Formulario completado, sus datos serán enviados");
	return true;
}