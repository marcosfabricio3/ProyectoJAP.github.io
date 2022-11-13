//  funcion para almacenar el email ingresado
function storage () {
    var inputEmail = document.getElementById('emailImput');

    localStorage.setItem("email", inputEmail.value);
}


// insercion del mail ingresado en la barra superior
function makeUsername() {
    
    //Cortar Email
    var email = localStorage.getItem('email');
    var username = email.slice(0,email.indexOf('@'));

    //Guardar username
    var inputEmail = document.getElementById('emailImput');
    
    document.getElementById('dropdownLogin').innerHTML = username;
}



// Example starter JavaScript for disabling form submissions if there are invalid fields BOOTSTRAP
(() => {
    'use strict'
    const forms = document.querySelectorAll('.needs-validation')

    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
})()
    

makeUsername();