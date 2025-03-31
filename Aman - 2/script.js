document.addEventListener("DOMContentLoaded", function() {
    let username = localStorage.getItem("username") || prompt("Enter your name:");
    localStorage.setItem("username", username);
    document.getElementById("username").innerText = username;
    
    loadTasks();
});

function addTask(type) {
    let taskInput = document.getElementById(type + "Task");
    let startInput = document.getElementById(type + "Start");
    let endInput = document.getElementById(type + "End");
    
    let task = { text: taskInput.value };
    
    if (type !== "daily") {
        task.start = startInput.value;
        task.end = endInput.value;
    }
    
    let tasks = JSON.parse(localStorage.getItem(type)) || [];
    tasks.push(task);
    localStorage.setItem(type, JSON.stringify(tasks));
    
    taskInput.value = "";
    if (startInput) startInput.value = "";
    if (endInput) endInput.value = "";
    
    loadTasks();
}

function loadTasks() {
    ["daily", "weekly", "monthly"].forEach(type => {
        let list = document.getElementById(type + "List");
        list.innerHTML = "";
        let tasks = JSON.parse(localStorage.getItem(type)) || [];
        
        tasks.forEach((task, index) => {
            let li = document.createElement("li");
            li.innerHTML = `${task.text} ${task.start ? `(${task.start} - ${task.end})` : ""} 
                <button onclick="removeTask('${type}', ${index})">❌</button>`;
            list.appendChild(li);
        });
    });
}

function removeTask(type, index) {
    let tasks = JSON.parse(localStorage.getItem(type)) || [];
    tasks.splice(index, 1);
    localStorage.setItem(type, JSON.stringify(tasks));
    loadTasks();
}

function logout() {
    localStorage.removeItem("username");
    window.location.reload();
}
