let emailReg = document.getElementById("regInputEmail");
let passReg = document.getElementById("regInputPassword");
let regButton = document.getElementById("regButton");
let statusBar = document.getElementById("registerStatus");



function registerRequest() {
    let user = {
        email: emailReg.value,
        password: passReg.value,
    }

    fetch("/api/users/register", {
        headers: {
            "Content-type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(user)
    })
        .then(res => res.json())
        .then(data => {

            console.log(data);

            // if (data.status) {
            //     modals.classList.add("d-none");
            //     modalRegister.classList.add("d-none");
            //     email.value = "";
            //     password.value = "";
            // } else {
            //     console.log('status')
            // }
        })
        .catch(err => console.log(err))
}

regButton.onclick = registerRequest;
