// let emailReg = document.getElementById("regInputEmail");
// let passReg = document.getElementById("regInputPassword");
// let regButton = document.getElementById("regButton");
// let statusBar = document.getElementById("registerStatus");

const app = document.getElementById("app");
const userBar = document.getElementById("userBar");
const loginBar = document.getElementById("loginBar");

function registerRequest() {
    let { login, password } = getRegistrationValues();
    
    let user = { "email": login, "password": password }

    console.log(user);

    fetch("/api/users/register", {
        headers: {
            "Content-type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(user)
    })
        .then(res => res.json())
        .then(data => {
            if(data.title === 'User registration succesful') {
                clear(userBar);
                alert(data.detail)
            } 
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
        .catch(err => {
            return console.log(err);
        })
}

// regButton.onclick = registerRequest;

// {"title":"User registration succesful","detail":"Registered new user"}

function loginRequest() {
    let { login, password } = getLoginValues();
    
    let user = { "email": login, "password": password }

    console.log(user);

    fetch("/api/users/login", {
        headers: {
            "Content-type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(user)
    })
        .then(res => res.json())
        .then(data => {
            if(data.title === 'Login Successful') {
                // clear(userBar);
                alert(data.detail)
            }
            console.log(data);
        })
        .catch(err => {
            return console.log(err);
        })
}

function createLoginInputs(parent){
    const emailInput = document.createElement('input');
    emailInput.setAttribute("type", "email");
    emailInput.setAttribute("id", "emailInput");
    emailInput.setAttribute("placeholder", "email");
    const passInput = document.createElement('input');
    passInput.setAttribute("type", "password");
    passInput.setAttribute("id", "passInput");
    passInput.setAttribute("placeholder", "password");
    const loginButton = document.createElement('input');
    loginButton.setAttribute("type", "button");
    loginButton.setAttribute("id", "loginButton");
    loginButton.setAttribute("value", "login");
    loginButton.onclick = loginRequest;
    parent.appendChild(emailInput);
    parent.appendChild(passInput);
    parent.appendChild(loginButton);  
}

function getLoginValues() {
    let login = document.getElementById("emailInput").value;
    let password = document.getElementById("passInput").value;
    return { login, password };
}


function createRegistrationInputs(parent) {
    const loginInput = document.createElement('input');
    loginInput.setAttribute("type", "email");
    loginInput.setAttribute("id", "loginInput");
    loginInput.setAttribute("placeholder", "email");
    const passwordInput = document.createElement('input');
    passwordInput.setAttribute("type", "password");
    passwordInput.setAttribute("id", "passwordInput");
    passwordInput.setAttribute("placeholder", "password");
    const registerButton = document.createElement('input');
    registerButton.setAttribute("type", "button");
    registerButton.setAttribute("id", "registerButton");
    registerButton.setAttribute("value", "register");
    registerButton.onclick = registerRequest;
    parent.appendChild(loginInput);
    parent.appendChild(passwordInput);
    parent.appendChild(registerButton);
}

function getRegistrationValues() {
    let login = document.getElementById("loginInput").value;
    let password = document.getElementById("passwordInput").value;
    return { login, password };
}





function clear(container){
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}


function getTasks() {
    fetch("/api/tasks/all", {
        headers: {
            "Content-type": "application/json"
        },
        method: "get"
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            return console.log(err);
        })
}

createRegistrationInputs(userBar);
createLoginInputs(loginBar);