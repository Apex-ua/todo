// let emailReg = document.getElementById("regInputEmail");
// let passReg = document.getElementById("regInputPassword");
// let regButton = document.getElementById("regButton");
// let statusBar = document.getElementById("registerStatus");


const registerButton = document.getElementById("registerButton");
const loginButton = document.getElementById("loginButton");
const createTaskButton = document.getElementById("createTaskButton");
const globalStatus = document.getElementById("globalStatus");
const tasksContainer = document.getElementById("tasksContainer");


const app = document.getElementById("app");
const registerBar = document.getElementById("registerBar");
const loginBar = document.getElementById("loginBar");
const modalContent = document.getElementById("modalContent");



function registerRequest() {
    let {
        login,
        password
    } = getRegistrationValues();

    let user = {
        "email": login,
        "password": password
    }

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
            if (data.title === 'User registration succesful') {
                alert(data.detail);
                clearCloseModal();
            }
            console.log(data);
        })
        .catch(err => {
            return console.log(err);
        })
}


function loginRequest() {
    let {
        login,
        password
    } = getLoginValues();

    let user = {
        "email": login,
        "password": password
    }

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
            if (data.title === 'Login Successful') {
                alert(data.detail);
                clearCloseModal();
            } else if (data.title === 'Invalid Credentials' || 'Bad request') {
                const statusBar = document.getElementById("statusBar");
                statusBar.innerText = data.detail;
            }
            console.log(Object.values(data));
            console.log(`aaaa ${data}`);
            console.log(JSON.stringify(data));
            getTasks();
        })
        .catch(err => {
            return console.log(err);
        })
}

function createLoginInputs(parent) {
    const header = document.createElement('h3');
    header.innerText = 'Login';
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
    loginButton.setAttribute("value", "Login");
    loginButton.onclick = loginRequest;
    const statusBar = document.createElement('div');
    statusBar.setAttribute("id", "statusBar");
    statusBar.innerText = "Enter your data and press 'Login'";
    parent.appendChild(header);
    parent.appendChild(emailInput);
    parent.appendChild(passInput);
    parent.appendChild(loginButton);
    parent.appendChild(statusBar);
}

function getLoginValues() {
    let login = document.getElementById("emailInput").value;
    let password = document.getElementById("passInput").value;
    return {
        login,
        password
    };
}


function createRegistrationInputs(parent) {
    const header = document.createElement('h3');
    header.innerText = 'Register new accaunt';
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
    parent.appendChild(header);
    parent.appendChild(loginInput);
    parent.appendChild(passwordInput);
    parent.appendChild(registerButton);
}

function getRegistrationValues() {
    let login = document.getElementById("loginInput").value;
    let password = document.getElementById("passwordInput").value;
    return {
        login,
        password
    };
}





function clear(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}


function getTasks() {
    fetch("/api/task/all", {
            headers: {
                "Content-type": "application/json"
            },
            method: "get"
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            data.tasks.forEach(task => {
                createTaskCard(task, tasksContainer);
            });
            addListenerToTaskCard();
        })
        .catch(err => {
            return console.log(err);
        })
}

// createRegistrationInputs(userBar);
// createLoginInputs(loginBar);

// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
registerButton.onclick = function () {
    modal.style.display = "block";
    createRegistrationInputs(modalContent);
}
loginButton.onclick = function () {
    modal.style.display = "block";
    createLoginInputs(modalContent);
}

createTaskButton.onclick = function () {
    modal.style.display = "block";
    createTaskInputs(modalContent, 'Create new task');
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    // modal.style.display = "none";
    // clear(modalContent);
    clearCloseModal();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        // modal.style.display = "none";
        // clear(modalContent);
        clearCloseModal();
    }
}

function clearCloseModal() {
    modal.style.display = "none";
    clear(modalContent);
}

var testTask = {
    author: "5d9fa144e822b1068797b100",
    completed: false,
    createdAt: "2019-10-11T18:53:44.567Z",
    updatedAt: "2019-10-11T18:53:44.567Z",
    __v: 0,
    _id: "5da0cfb85a1e6e06571e9652",
}

function createTaskCard(task, container) {
    const wrapper = document.createElement('div');
    wrapper.setAttribute("id", task._id);
    wrapper.setAttribute("class", "taskCard");
    const title = document.createElement('h4');
    if (task.title) {
        title.innerText = `Title: ${task.title}`;
    } else {
        title.innerText = 'No title';
    }
    const body = document.createElement('p');
    if (task.body) {
        body.innerText = `Task: ${task.body}`;
    } else {
        body.innerText = 'No task body';
    }
    const status = document.createElement('p');
    if (task.completed === false) {
        status.innerText = `Done: ${task.completed}`;
    } else {
        status.innerText = `Done: ${task.completed}`;
    }
    const editTaskButton = document.createElement('input');
    editTaskButton.setAttribute("type", "button");
    editTaskButton.setAttribute("class", "editTaskButton");
    editTaskButton.setAttribute("id", `edit_${task._id}`);
    editTaskButton.setAttribute("value", "Edit");
    // editTaskButton.onclick = newTaskRequest;

    wrapper.appendChild(title);
    wrapper.appendChild(body);
    wrapper.appendChild(status);
    wrapper.appendChild(editTaskButton);
    container.appendChild(wrapper);
}

window.onload = function () {
    try {
        getTasks();
    } catch (error) {
        console.error(error);
    }
}

function createTaskInputs(parent, heading) {
    const wrapper = document.createElement('div');
    wrapper.setAttribute("class", "create-task-inputs");
    const header = document.createElement('h3');
    header.innerText = heading;
    const taskTitleInput = document.createElement('input');
    taskTitleInput.setAttribute("type", "text");
    taskTitleInput.setAttribute("id", "taskTitleInput");
    taskTitleInput.setAttribute("class", "new-task-input");
    taskTitleInput.setAttribute("placeholder", "Enter task title here");
    const taskBodyInput = document.createElement('input');
    taskBodyInput.setAttribute("type", "text");
    taskBodyInput.setAttribute("id", "taskBodyInput");
    taskBodyInput.setAttribute("class", "new-task-input");
    taskBodyInput.setAttribute("placeholder", "Enter task description here");
    const createTaskButton = document.createElement('input');
    createTaskButton.setAttribute("type", "button");
    createTaskButton.setAttribute("id", "createTaskButton");
    createTaskButton.setAttribute("value", "Add new task");
    createTaskButton.onclick = newTaskRequest;
    wrapper.appendChild(header);
    wrapper.appendChild(taskTitleInput);
    wrapper.appendChild(taskBodyInput);
    wrapper.appendChild(createTaskButton);
    parent.appendChild(wrapper);
}

function editTaskInputs(parent, task) {
    const wrapper = document.createElement('div');
    wrapper.setAttribute("class", "edit-task-inputs");
    const header = document.createElement('h3');
    header.innerText = 'Edit task';
    const taskTitleInput = document.createElement('input');
    taskTitleInput.setAttribute("type", "text");
    taskTitleInput.setAttribute("id", "taskTitleInput");
    taskTitleInput.setAttribute("class", "edit-task-input");
    taskTitleInput.value = task.title;
    const taskBodyInput = document.createElement('input');
    taskBodyInput.setAttribute("type", "text");
    taskBodyInput.setAttribute("id", "taskBodyInput");
    taskBodyInput.setAttribute("class", "edit-task-input");
    taskBodyInput.value = task.body;
    const editTaskButton = document.createElement('input');
    editTaskButton.setAttribute("type", "button");
    editTaskButton.setAttribute("id", `save_${task._id}`);
    editTaskButton.setAttribute("value", "Save");
    editTaskButton.onclick = saveEditedTask;
    const deleteTaskButton = document.createElement('input');
    deleteTaskButton.setAttribute("type", "button");
    deleteTaskButton.setAttribute("id", `delete_${task._id}`);
    deleteTaskButton.setAttribute("value", "Delete");
    deleteTaskButton.onclick = deleteEditedTask;
    wrapper.appendChild(header);
    wrapper.appendChild(taskTitleInput);
    wrapper.appendChild(taskBodyInput);
    wrapper.appendChild(editTaskButton);
    wrapper.appendChild(deleteTaskButton);
    parent.appendChild(wrapper);
}

function getNewTaskValues() {
    let title = document.getElementById("taskTitleInput").value;
    let body = document.getElementById("taskBodyInput").value;
    return {
        title,
        body
    };
}


function newTaskRequest() {
    let {
        title,
        body
    } = getNewTaskValues();

    let task = {
        "task": {
            "title": title,
            "body": body
        }
    };

    fetch("/api/task/create", {
            headers: {
                "Content-type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(task)
        })
        .then(res => res.json())
        .then(data => {
            if (data.title === 'Task creating succesful') {
                alert(data.detail);
                clearCloseModal();
                clear(tasksContainer);
                getTasks();
            }
            console.log(data);
        })
        .catch(err => {
            return console.log(err);
        })
}

function addListenerToTaskCard() {
    taskCards = document.querySelectorAll('.editTaskButton');
    for (let i = 0; i < taskCards.length; i++) {
        taskCards[i].addEventListener('click', editTaskPopup);
    }
}

function editTaskPopup(e) {
    event.stopPropagation();
    const tempId = e.target.getAttribute('id');
    const taskCardId = clearId(tempId, 'edit_');
    modal.style.display = "block";
    getTask(taskCardId);
}

function saveEditedTask(e) {
    event.stopPropagation();
    const tempId = e.target.getAttribute('id');
    const taskCardId = clearId(tempId, 'save_');
    // alert(taskCardId);
    editTaskRequest(taskCardId);
    clearCloseModal();
    clear(tasksContainer);
    alert('saved');
    getTasks();
}

function deleteEditedTask(e) {
    event.stopPropagation();
    const tempId = e.target.getAttribute('id');
    const taskCardId = clearId(tempId, 'delete_');
    deleteTask(taskCardId);
    clearCloseModal();
    clear(tasksContainer);
    alert('deleted');
    getTasks();
}

function getTask(id) {
    fetch(`/api/task/${id}`, {
            headers: {
                "Content-type": "application/json"
            },
            method: "get"
        })
        .then(res => res.json())
        .then(data => {
            editTaskInputs(modalContent, data.task);
        })
        .catch(err => {
            return console.log(err);
        })
}

// function editTaskRequest

function clearId(prefixedId, prefixToDelete) {
    return prefixedId.replace(prefixToDelete, '');
}

function editTaskRequest(id) {
    let {
        title,
        body
    } = getNewTaskValues();

    let task = {
        "task": {
            "title": title,
            "body": body,
            "_id": id
        }
    };

    fetch("/api/task/update", {
            headers: {
                "Content-type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify(task)
        })
        .then(res => res.json())
        .catch(err => {
            return console.log(err);
        })
}

function clearAndRender() {
    clearCloseModal();
    clear(tasksContainer);
    getTasks();
}

function deleteTask(id) {
    fetch(`/api/task/${id}`, {
            headers: {
                "Content-type": "application/json"
            },
            method: "delete"
        })
        .then(res => res.json())
        .catch(err => {
            return console.log(err);
        })
}