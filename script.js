let tasks = [];

function task() {
    let temp = document.getElementById("taskInput").value;
    if (temp) { 
        tasks.push(temp);
        document.getElementById("taskInput").value = ''; 
        render();
    }
}

function deleteTask(i) {
    tasks.splice(i, 1);
    render();
}

function edit(index) {
    let temp = document.getElementById("editInput" + index).value;
    if (temp) { 
        tasks[index] = temp;
        render();
    }
}

function editTask(index) {
    let container = document.getElementById("taskContainer" + index);

    let editInput = document.createElement("input");
    let editSave = document.createElement("button");

    editInput.id = "editInput" + index;
    editInput.value = tasks[index];

    editSave.innerText = "Save";
    editSave.onclick = function() {
        edit(index);
    };
    container.innerHTML = '';
    container.appendChild(editInput);
    container.appendChild(editSave);
}

function renderTask() {
    let tasksListView = document.createElement("div");
    for (let i = 0; i < tasks.length; i++) {
        let container = document.createElement('div');
        let information = document.createElement('p');
        let editButton = document.createElement('button');
        let deleteButton = document.createElement('button');

        // container.innerText = tasks[i];
        container.id = "taskContainer" + i;
        container.className = 'taskContainer';

        information.textContent = tasks[i];
        information.className = "information"

        deleteButton.innerText = 'Delete';
        deleteButton.className = 'deleteButton';
        deleteButton.onclick = (function(index) {
            return function() {
                deleteTask(index);
            };
        })(i);
        
        editButton.innerText = 'Edit';
        editButton.onclick = (function(index) {
            return function() {
                editTask(index);
            };
        })(i);
        
        container.appendChild(information)
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