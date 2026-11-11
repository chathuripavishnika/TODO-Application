
function showTasks(button) {

    let taskArea = button.nextElementSibling;

    if (taskArea.style.display === "none") {
        taskArea.style.display = "block";
        button.innerHTML = "Close";
    } else {
        taskArea.style.display = "none";
        button.innerHTML = "Click";
    }
}



function addTask(button) {

    let taskArea = button.parentElement;

    let input = taskArea.querySelectorAll("input")[1];

    let taskList = taskArea.querySelector(".task-list");

    let taskName = input.value.trim();

    if (taskName === "") {
        alert("Please Enter a Topic!");
        return;
    }

    let li = document.createElement("li");

    li.textContent = taskName + " ";

    let deleteBtn = document.createElement("button");

    deleteBtn.textContent = "Delete";

    deleteBtn.onclick = function() {
        deleteTask(this);
    };

    li.appendChild(deleteBtn);

    taskList.appendChild(li);

    input.value = "";
}



function deleteTask(button) {

    button.parentElement.remove();

}



function searchTasks(input) {

    let taskArea = input.parentElement;

    let searchValue = input.value.toLowerCase();

    let tasks = taskArea.querySelectorAll(".task-list li");

    tasks.forEach(function(task) {

        let taskName = task.firstChild.textContent.toLowerCase();

        if (taskName.includes(searchValue)) {
            task.style.display = "list-item";
        } else {
            task.style.display = "none";
        }

    });

}