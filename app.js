
class Topic {

    constructor(id, name, description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

}

class Subject {

    constructor(name) {
        this.name = name;
        this.topics = [];
    }

}

class StudyManager {

    constructor() {

        this.subjects = [
            new Subject("Java"),
            new Subject("OOP"),
            new Subject("IT"),
            new Subject("DBMS")
        ];

        this.nextId = 1;

    }

    
    addTopic(subjectName, name, description) {

        let subject = this.subjects.find(
            s => s.name === subjectName
        );

        let topic = new Topic(
            this.nextId++, name, description
        );

        subject.topics.push(topic);

    }

    
    searchTopics(subjectName, keyword) {

        let subject = this.subjects.find(
            s => s.name === subjectName
        );

        return subject.topics.filter(topic =>
            topic.name.toLowerCase().includes(keyword.toLowerCase()) ||
            topic.description.toLowerCase().includes(keyword.toLowerCase())
        );

    }

    
    updateTopic(subjectName, id, name, description) {

        let subject = this.subjects.find(
            s => s.name === subjectName
        );

        let topic = subject.topics.find(
            t => t.id === id
        );

        if (topic) {
            topic.name = name;
            topic.description = description;
        }

    }

    
    deleteTopic(subjectName, id) {

        let subject = this.subjects.find(
            s => s.name === subjectName
        );

        subject.topics = subject.topics.filter(
            t => t.id !== id
        );

    }

}



const manager = new StudyManager();



manager.addTopic("Java", "Variables", "Java variables");
manager.addTopic("Java", "Data Types", "Primitive data types");
manager.addTopic("OOP", "Inheritance", "Parent and child classes");
manager.addTopic("OOP", "Polymorphism", "Many forms");
manager.addTopic("IT", "HTML", "Web page structure");
manager.addTopic("IT", "CSS", "Web page styling");
manager.addTopic("DBMS", "SQL", "Database queries");
manager.addTopic("DBMS", "Tables", "Database tables");


let editingId = null;



function displayTopics() {

    let subject = document.getElementById("subject").value;

    let keyword = document.getElementById("search").value;

    let topics = manager.searchTopics(subject, keyword);

    let output = "";

    topics.forEach(topic => {

        output += `
            <div class="topic">

                <h4>${escapeHTML(topic.name)}</h4>

                <p>${escapeHTML(topic.description)}</p>

                <button class="edit"
                onclick="editTopic(${topic.id})">
                Update
                </button>

                <button class="delete"
                onclick="removeTopic(${topic.id})">
                Delete
                </button>

            </div>
        `;

    });

    document.getElementById("topicList").innerHTML =
        output || "<p class='empty'>No Topics Found!</p>";

}



function saveTopic() {

    let subject = document.getElementById("subject").value;

    let name = document.getElementById("topicName").value.trim();

    let description = document.getElementById("description").value.trim();

    if (name === "") {
        alert("Please Enter Topic Name!");
        return;
    }

    if (editingId === null) {

        manager.addTopic(subject, name, description);

    } else {

        manager.updateTopic(
            subject, editingId, name, description
        );

        editingId = null;

        document.getElementById("saveBtn").innerText = "+ Add Topic";

    }

    clearForm();
    displayTopics();

}



function editTopic(id) {

    let subject = document.getElementById("subject").value;

    let topic = manager.subjects
        .find(s => s.name === subject)
        .topics.find(t => t.id === id);

    document.getElementById("topicName").value = topic.name;

    document.getElementById("description").value = topic.description;

    editingId = id;

    document.getElementById("saveBtn").innerText = "Update Topic";

}


function removeTopic(id) {

    if (confirm("Do you want to delete this topic?")) {

        let subject = document.getElementById("subject").value;

        manager.deleteTopic(subject, id);

        if (editingId === id) {
            editingId = null;
            clearForm();
            document.getElementById("saveBtn").innerText = "+ Add Topic";
        }

        displayTopics();

    }

}



function clearForm() {

    document.getElementById("topicName").value = "";

    document.getElementById("description").value = "";

}



function escapeHTML(value) {

    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);

}


displayTopics();
