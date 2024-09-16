// Function to fetch and display user data
// async function fetchTasksData() {
//     await fetch('http://localhost/back/index.php')
//     .then(response => response.json())
//     .then(data =>{
//         if(Array.isArray(data)){
//             filltable(data)
//         }
//     })
//     await fetch('http://localhost/back/index.php',{
//         method:'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(create_obj())

//     })
//     .then()
// }
const xhr = new XMLHttpRequest()
let tasks =""
function readtasks(){
    xhr.open('GET', 'http://localhost/back/index.php', true)
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 400) {
            tasks = JSON.parse(xhr.responseText);
            filltable(tasks)
        } else {
            console.log('Error: ' + xhr.status);
        }
    }
    
    xhr.onerror = function() {
        console.log('Request failed');
    };

    xhr.send();
}

// Fetch tasks data when the page loads
window.onload = readtasks;

function createtasks(){
    const nom = create_obj().nom
    const date = create_obj().date
    const done = create_obj().done
    xhr.open('POST', 'http://localhost/back/index.php?action=create', true)
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 400) {
            const response = JSON.parse(xhr.responseText);
            console.log(response.success || response.error);
            readtasks()
        } else {
            console.error('Error: ' + xhr.status);
        }
        }
        xhr.onerror = function() {
            console.log('Request failed');
        }
    xhr.send(JSON.stringify({nom, date, done}));

}

function updatetasks(itemId, itemName, done) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost/back/index.php?action=update", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);
          console.log("Item updated:", response);
          console.log(itemId,itemName,done)
            readtasks()
        } else {
          console.error("Error updating item:", xhr.statusText);
        }
      }
    };
    let data = JSON.stringify({ id: itemId, nom: itemName, date: create_obj().date, done: done});
    xhr.send(data);
}

function deleteItem(itemId) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost/back/index.php?action=delete", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
          console.log("Item deleted"+itemId, response);
          readtasks()
        } else {
          console.error("Error deleting item:", xhr.statusText);
        }
      }
    };
    let data = JSON.stringify({ id: itemId});
    xhr.send(data);
  }

function thisday(){
    let today = new Date()
    let dd = today.getDate()
    let mm = today.getMonth()
    let yy =today.getFullYear()
    if(dd<10) 
        {
            dd = '0'+ dd
        }
    if (mm < 10) {
        mm = '0' + mm;
    }
    today = yy + '/' + mm + '/' + dd;
    return today    
}
    
function create_obj(){
    let obj = {}
    obj["nom"] = document.getElementById('name').value
    obj["date"] = thisday()
    obj["done"] = false

    return obj
}

function filltable(data){
    document.getElementById('tasks').innerHTML = '';
    data.forEach(task => {
        document.getElementById('tasks').innerHTML +=
        `
            <div class = 'rows'>
                <div class="row1">
                    <p>
                        ${task.nom}
                    </p>
                    <spam>${task.date}</spam>
                </div>
                <div class="row2">
                    <button class="btn btn-d" onclick='openModal(${task.id}); deleteTask(${task.id})' ><span class="material-symbols-outlined">Delete</span>
                    </button>
                    
                    <button class="btn btn-v ${task.done ==0 ? 'done':''} " id='btn-v${task.id}' onclick = "toggle(${task.id}, '${task.nom}',${task.done})"><span id='span${task.id}' class="material-symbols-outlined">
                        ${task.done == 0 ? 'done_all':'Close'}
                    </span></button>
                    
                    <button class="btn btn-u" onclick ="openModalUpdat(${task.id},'${task.nom}',${task.done})"><span class="material-symbols-outlined">
                        edit
                    </span></button>
                </div>
            </div>
        `
    })  
}

//add tasks
var modal_Ajt = document.getElementById("myModal");

document.getElementById('add').addEventListener('click', function(){
    modal_Ajt.style.display = "block";
})
document.getElementById('sbmt').addEventListener('click',function(){
    createtasks()
    modal_Ajt.style.display= "none"
})

// Get the <span> element that closes the modal_Ajt
var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
  modal_Ajt.style.display = "none";
}

// When the user clicks anywhere outside of the modal_Ajt, close it
window.ondblclick = function(event) {
  if (event.target == modal_Ajt) {
    modal_Ajt.style.display = "none";
  }
}
// delete task
// Get modalDeleteelement
var modalDelete = document.getElementById("deleteModal");
// Get the confirm and cancel buttons
var confirmBtn = document.getElementById("confirmDelete");
var cancelBtn = document.getElementById("cancelDelete");
let idcontent = document.getElementById('iddelete');
let closeModalBtn = document.getElementById('closeModalBtn')
// Function to open the modalDelete and set the item to be deleted
function openModal(id) {
    idcontent.innerHTML = id
    modalDelete.style.display = "block";  // Show modalDelete
}

// Function to close the modalDelete
function closeModal() {
    modalDelete.style.display = "none";  // Hide modalDelete
}

// When the user clicks the "Cancel" button, close the modalDelete
cancelBtn.onclick = function() {
    closeModal();
}
closeModalBtn.onclick = function (){
    closeModal()
}

// When the user clicks the "Delete" button, remove the item
confirmBtn.onclick = function(){
    if(itemId !== null){
        console.log(item)
        deleteItem(itemId)
        closeModal()
    }
}
function deleteTask(id){
    if(id !== null){
        deleteItem(id)
        closeModal()
    }

}

// Close the modalDelete if the user clicks outside the modalDeletecontent
window.ondblclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}
// update task
// Get modalUpdateelement
var modalUpdate = document.getElementById("updateModal");
// Get the confirm and cancel buttons
var confirmBtnU = document.getElementById("confirmUpdate");
var cancelBtnU = document.getElementById("cancelUpdate");
let closeModalBtnU = document.getElementById('closeModalBtnU')
let id = ''
let nom = ''
let done = ''
let Updatename = document.getElementById('Updatename')
// Function to open the modalUpdat and set the item to be deleted
function openModalUpdat(ide,name,donee) {// Store item ID
    modalUpdate.style.display = "block";  // Show modalUpdate
    Updatename.value = name
    nom = name
    id = ide
    done = donee
}

// Function to close the modalUpdate
function closeModalUpdate() {
    modalUpdate.style.display = "none";  // Hide modalUpdate
}

// When the user clicks the "Cancel" button, close the modalUpdate
cancelBtnU.onclick = function() {
    closeModalUpdate();
}
closeModalBtnU.onclick = function (){
    closeModalUpdate()
}

// When the user clicks the "Update" button, remove the item
confirmBtnU.onclick = function(){
    if(nom !== null){
        nom = Updatename.value
        updatetasks(id,nom,done)
        closeModalUpdate()
    }
}


// Close the modalUpdate if the user clicks outside the modalDeletecontent
window.ondblclick = function(event) {
    if (event.target == modalUpdate) {
        closeModal();
    }
}

//done or not

function toggle(id,nom,done){
    
    if(done == 0){
        done= 1
        console.log('if',id,nom,done)
        updatetasks(id,nom,done)  
    }else{
        done= 0
        console.log('else',id,nom,done)
        updatetasks(id,nom,done)
    }
}

