// project.js

document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signup-form");
    const loginForm = document.getElementById("login-form");

    if (signupForm) {
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const username = document.getElementById("username").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value;
            const confirmPass = document.getElementById("confirm-password").value;
            const userType = document.getElementById("user-type").value;

            if (password !== confirmPass) {
                alert("Passwords do not match. please check pass");
                return;
            }

            if (username === "" || email === "" || password === "") {
                alert("some fields are empaty ");
                return;
            }

            

        

           

            
        });
    }

    
});
