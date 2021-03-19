// ! Variables

const _Formulario = document.querySelector('#enviar-mail');
const _BtnEnviar = document.querySelector('#enviar');
const _BtnResetForm = document.querySelector('#resetBtn');

// * Expresion regular para validar el input de un correo electronico
const emailVerification = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let emailOK; // * Variable para verificaar correo retorna true or false

// ! Variables para cambos del formulario (email, asunto, mensaje)

const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

// ? inicio del form-validator
eventListeners();

function eventListeners() {
	// * Primera vez que carga la pagina
	document.addEventListener('DOMContentLoaded', inicarApp);

	// * Campos para el formulario
	email.addEventListener('blur', validarFormulario);
	asunto.addEventListener('blur', validarFormulario);
	mensaje.addEventListener('blur', validarFormulario);

	// * Btn Enviar
	_BtnEnviar.addEventListener('click', enviarEmail);

	// * Btn Resetear formulario
	_BtnResetForm.addEventListener('click', resetearForm);
}

// ? Funciones
// * Inicio APP
function inicarApp() {
	// * Al iniciar la app se deshabilita el boton
	_BtnEnviar.disabled = true;
	_BtnEnviar.classList.add('cursor-not-allowed');
	_BtnEnviar.classList.add('opacity-50');
}

// * Validacion del formulario
function validarFormulario(event) {
	// * Variable para validar cuando la informacion del correo sea true or false

	const asuntoOK = asunto.value.length > 0;
	const mensajeOK = mensaje.value.length > 0;

	// * verificacion del correo
	if (event.target.type === 'email') {
		if (emailVerification.test(email.value)) {
			emailOK = true;
			event.target.classList.remove('border', 'border-red-500');
			event.target.classList.add('border-2', 'border-green-500');
			if (_Formulario.querySelector('.error')) {
				_Formulario.querySelector('.error').remove();
			}
		} else {
			emailOK = false;
			event.target.classList.remove('border', 'border-green-500');
			event.target.classList.add('border-2', 'border-red-500');
			mensajeError('El correo no es valido');
		}
	} else if (event.target.type === 'text' || event.target.type === 'textarea') {
		if (event.target.value.length > 0) {
			event.target.classList.remove('border', 'border-red-500');
			event.target.classList.add('border-2', 'border-green-500');
		} else {
			event.target.classList.remove('border', 'border-green-500');
			event.target.classList.add('border-2', 'border-red-500');

			mensajeError(`Todos los campos deben ser obligatorios`);
		}
	}

	// * Este condicional para habilitar el boton de enviar siempre y cuando todos los campos esten llenos
	if (emailOK && asuntoOK && mensajeOK) {
		const test = _Formulario.querySelector('.error');
		if (test === null) {
			habilitarBtnEnviar();
		} else {
			_Formulario.querySelector('.error').remove();
			habilitarBtnEnviar();
		}
	}
}

// * Mensaje cuando hay un error en el formulario
function mensajeError(mensaje) {
	_BtnEnviar.disabled = true;
	_BtnEnviar.classList.add('cursor-not-allowed');
	_BtnEnviar.classList.add('opacity-50');

	const parrafoError = document.createElement('p');
	parrafoError.textContent = `${mensaje}`;
	parrafoError.classList.add(
		'border',
		'border-red-500',
		'background-red-100',
		'text-red-500',
		'p-3',
		'mt-5',
		'text-center',
		'error'
	);

	if (_Formulario.querySelectorAll('.error').length === 0) {
		_Formulario.appendChild(parrafoError);
	}
}

// * Funcion para habilitar Btn-enviar
function habilitarBtnEnviar() {
	// * Green border si todos los campos estan completados

	email.classList.add('border-2', 'border-green-500');
	asunto.classList.add('border-2', 'border-green-500');
	mensaje.classList.add('border-2', 'border-green-500');

	// * Habilitamos el btn de enviar siempre y cuando este todos los campos correctamente

	_BtnEnviar.disabled = false;
	_BtnEnviar.classList.remove('cursor-not-allowed');
	_BtnEnviar.classList.remove('opacity-50');
}

// * Funcion para monstrar mensaje enviado
function mensajeHaSidoEnviado(mensaje) {
	const mensajeVerificacion = document.createElement('p');
	mensajeVerificacion.textContent = `${mensaje}`;
	mensajeVerificacion.classList.add(
		'border',
		'border-green-500',
		'background-green-100',
		'text-green-500',
		'p-3',
		'mt-5',
		'text-center',
		'error'
	);
	_Formulario.appendChild(mensajeVerificacion);
}

// * Cuando se envia el email
function enviarEmail(event) {
	event.preventDefault();
	const spinner = document.querySelector('#spinner');
	spinner.style.display = 'flex';

	if ((spinner.style.display = 'flex')) {
		setTimeout(() => {
			spinner.style.display = 'none';
			email.value = '';
			email.classList.remove('border', 'border-green-500');
			asunto.value = '';
			asunto.classList.remove('border', 'border-green-500');
			mensaje.value = '';
			mensaje.classList.remove('border', 'border-green-500');
			mensajeHaSidoEnviado('Su correo ha sido enviado');
			setTimeout(() => {
				if (_Formulario.querySelector('.error')) {
					_Formulario.querySelector('.error').remove();
					inicarApp();
				}
			}, 2000);
		}, 3000);
	}
}

// * reset Form function
function resetearForm(event) {
	email.value = '';
	asunto.value = '';
	mensaje.value = '';

	if (
		email.classList.contains('border') ||
		asunto.classList.contains('border') ||
		mensaje.classList.contains('border')
	) {
		email.classList.remove('border', 'border-green-500', 'border-red-500');
		asunto.classList.remove('border', 'border-green-500', 'border-red-500');
		mensaje.classList.remove('border', 'border-green-500', 'border-red-500');
	}

	inicarApp();
}
