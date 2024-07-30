let tasks = [];

window.onload = function() {
    if (localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem(tasks));
        render();
    }
}

function saveTasks() {
    localStorage.setItem('task', JSON.stringify(tasks));
}
function task() {
    let temp = document.getElementById("taskInput").value;
    if (temp) { 
        tasks.push(temp);
        document.getElementById("taskInput").value = ''; 
        saveTasks();
        render();
    }
}

function deleteTask(i) {
    tasks.splice(i, 1);
    saveTasks();
    render();
}

function edit(index) {
    let temp = document.getElementById("editInput" + index).value;
    if (temp) { 
        tasks[index] = temp;
        saveTasks();
        render();
    }
}

function editTask(index) {
    let container = document.getElementById("taskContainer" + index);

    let editInput = document.createElement("input");
    let editSave = document.createElement("button");

    editInput.id = "editInput" + index;
    editSave.innerText = "Save";
    editSave.onclick = function() {
        edit(index);
    };

    container.appendChild(editInput);
    container.appendChild(editSave);
}

function renderTask() {
    let tasksListView = document.createElement("div");
    for (let i = 0; i < tasks.length; i++) {
        let container = document.createElement('div');
        let editButton = document.createElement('button');
        let deleteButton = document.createElement('button');

        container.innerText = tasks[i];
        container.id = "taskContainer" + i;
        deleteButton.innerText = 'Delete';
        editButton.innerText = 'Edit';

        deleteButton.onclick = (function(index) {
            return function() {
                deleteTask(index);
            };
        })(i);

        editButton.onclick = (function(index) {
            return function() {
                editTask(index);
            };
        })(i);
        
        container.appendChild(deleteButton);
        container.appendChild(editButton);
        tasksListView.appendChild(container);
    }
    return tasksListView;
}

    function render() {
        let tasksList = document.getElementById("tasksList");
        tasksList.innerHTML = ''; 
        tasksList.appendChild(renderTask());
    }