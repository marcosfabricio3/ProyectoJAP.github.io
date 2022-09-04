// funcion para almacenar el email ingresado
function storage () {

var inputEmail = document.getElementById('emailImput');
localStorage.setItem("email", inputEmail.value);

}
// insercion del mail ingresado en la barra superior
function cartelDelUsuario() {

    var inputEmail = document.getElementById('emailImput');
        document.getElementById('LoginOrUser').innerHTML = localStorage.getItem('email');

    }
    
cartelDelUsuario();