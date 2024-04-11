const passInput = document.getElementById("password");
const eye = document.getElementById("eye");

function togglePasswordVisibility() {
    if(passInput.type==='password') {
       passInput.type='text';
       eye.classList.remove("fa-eye");
       eye.classList.add("fa-eye-slash");
    }
    else {
        passInput.type='password';
        eye.classList.remove("fa-eye-slash");
        eye.classList.add("fa-eye");
    }
}