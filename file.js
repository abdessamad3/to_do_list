var tasks = [
    {   "nom" :"حفظ القران",
        "date" :"10/08/2024",
        "done" : true

    },
    {   "nom" :"قراءة التجويد",
        "date" :"20/08/2024",
        "done" : false

    }]

    
    function localInfo(){
        let getLocalInfo = localStorage.getItem('tasks')
        if(!getLocalInfo){
            localStorage.setItem('tasks',JSON.stringify(tasks))
        } else{
            tasks = JSON.parse( localStorage.getItem('tasks'))
            return tasks
        }

    }
function clear (){
    localStorage.removeItem('tasks')
}
clear()

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
        today = dd + '/' + mm + '/' + yy;
        return today    
    }
    
    function create_obj(){
    let obj = {}
    obj["nom"] = document.getElementById('name').value
    obj["date"] = thisday()
    obj["done"] = ''

    return obj
    }
    function filltable(){
        let id_btnd = 0
        document.getElementById('tasks').innerHTML = '';
        for(task of tasks){
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
                    <button class="btn btn-d" onclick='openModal(${id_btnd})' ><span class="material-symbols-outlined">Delete</span>
                    </button>
                    
                    <button class="btn btn-v ${task.done ? 'done':''} " id='btn-v${id_btnd}' onclick = "toggle(${id_btnd})"><span id='span${id_btnd}' class="material-symbols-outlined">
                        ${task.done ? 'done_all':'Close'}
                    </span></button>
                    
                    <button class="btn btn-u" onclick ='openModalUpdat(${id_btnd})'><span class="material-symbols-outlined">
                        edit
                    </span></button>
                </div>
            </div>
            `
            id_btnd++
        }  
    }
    localInfo()
    filltable()


    

var modal_Ajt = document.getElementById("myModal");

document.getElementById('add').addEventListener('click', function(){
    modal_Ajt.style.display = "block";
})

document.getElementById('sbmt').addEventListener('click',function(){
    tasks.push(create_obj())
    localStorage.setItem('tasks',JSON.stringify(tasks))

    modal_Ajt.style.display = "none";
    filltable()
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
// Get modalDeleteelement
var modalDelete = document.getElementById("deleteModal");
// Get the confirm and cancel buttons
var confirmBtn = document.getElementById("confirmDelete");
var cancelBtn = document.getElementById("cancelDelete");
// Store which item to delete
var itemToDelete = null;
let closeModalBtn = document.getElementById('closeModalBtn')
// Function to open the modalDelete and set the item to be deleted
function openModal(id) {
    itemToDelete = id;  // Store item ID
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
    if(itemToDelete !== null){
        tasks.splice(itemToDelete,1)
        localStorage.setItem('tasks', JSON.stringify(tasks))
        localInfo()
        filltable()
        closeModal()
    }
}

// Close the modalDelete if the user clicks outside the modalDeletecontent
window.ondblclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}

// Get modalUpdateelement
var modalUpdate = document.getElementById("updateModal");
// Get the confirm and cancel buttons
var confirmBtnU = document.getElementById("confirmUpdate");
var cancelBtnU = document.getElementById("cancelUpdate");
// Store which item to Update
var itemToUpdate = null;
let closeModalBtnU = document.getElementById('closeModalBtnU')

let Updatename = document.getElementById('Updatename')
// Function to open the modalUpdat and set the item to be deleted
function openModalUpdat(id) {
    itemToUpdate = id;  // Store item ID
    modalUpdate.style.display = "block";  // Show modalUpdate
    Updatename.value = tasks[itemToUpdate].nom
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
    if(itemToUpdate !== null){
        tasks[itemToUpdate].nom = Updatename.value
        localStorage.setItem('tasks', JSON.stringify(tasks))
        localInfo()
        filltable()
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

function toggle(id){
    let span = document.getElementById(`span${id}`)
if(tasks[id].done){
    tasks[id].done = false
    console.log(tasks[id].done)
    localStorage.setItem('tasks', JSON.stringify(tasks))
    localInfo()
    filltable()
}else{
    tasks[id].done = true
    localStorage.setItem('tasks', JSON.stringify(tasks))
    console.log(tasks[id].done)
    localInfo()
    filltable()
}

}


