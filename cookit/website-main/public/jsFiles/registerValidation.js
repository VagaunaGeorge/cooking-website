
// Fetch all the forms we want to apply custom Bootstrap validation styles to
var form = document.getElementById('registerForm')
// Loop over them and prevent submission

form.addEventListener('submit', function (event) {
    let first_name = document.getElementById("fname").value;
    let last_name = document.getElementById("lname").value;
    let password = document.getElementById("password").value;
    let repassword = document.getElementById("repassword").value;

    if (first_name.length < 3) {
        event.preventDefault();
        document.querySelector('.ferror').className = 'showErrorFirst';
    } else {
        if (document.querySelector('.showErrorFirst'))
            document.querySelector('.showErrorFirst').className = 'ferror';
        form.type = "submit";
    }

    if (last_name.length < 3) {
        event.preventDefault();

        document.querySelector('.lerror').className = 'showErrorLast';
    } else {
        if (document.querySelector('.showErrorLast'))
            document.querySelector('.showErrorLast').className = 'lerror';
        form.type = "submit";
    }

    if (password.length < 6) {
        event.preventDefault();

        document.querySelector('.passerror').className = 'showErrorPass';
    } else {
        if (document.querySelector('.showErrorPass'))
            document.querySelector('.showErrorPass').className = 'passerror';
        form.type = "submit";
    }

    if (repassword != password) {
        event.preventDefault();

        document.querySelector('.repasserror').className = 'showErrorRePass';
    } else {
        if (document.querySelector('.showErrorRePass'))
            document.querySelector('.showErrorRePass').className = 'repasserror';
        form.type = "submit";
    }

}, false)

