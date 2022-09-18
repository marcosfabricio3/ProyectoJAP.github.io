// funcion para almacenar el email ingresado
function storage () {

var inputEmail = document.getElementById('emailImput');

localStorage.setItem("email", inputEmail.value);

}

// insercion del mail ingresado en la barra superior
function cartelDelUsuario() {


//Cortar Email
    var emailObtenido = localStorage.getItem('email');
var username = emailObtenido.slice(0,emailObtenido.indexOf('@'));

//Guardar username
    var inputEmail = document.getElementById('emailImput');
        document.getElementById('LoginOrUser').innerHTML = username;

    }
    
cartelDelUsuario();