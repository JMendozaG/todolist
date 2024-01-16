import{saveTask, OnGetTasks, deleteTask, getTask, UpdateTask } from './firebase.js'

const taskform = document.getElementById('task-form')
const tasksContainer = document.getElementById('tasks-container')
let editStatus = false;
let id = '';

//info date
const dateNumber = document.getElementById('dateNumber');
const dateText = document.getElementById('dateText');
const dateMonth = document.getElementById('dateMonth');
const dateYear = document.getElementById('dateYear');

//Task container


const setDate = () => {
  const date = new Date();
  dateNumber.textContent = date.toLocaleString('es', { day: 'numeric' });
  dateText.textContent = date.toLocaleString('es', { weekday: 'long' });
  dateMonth.textContent = date.toLocaleString('es', { month: 'short' });
  dateYear.textContent = date.toLocaleString('es', { year: 'numeric' });
};


setDate();



//Firebase
window.addEventListener('DOMContentLoaded', async ()=>{
    OnGetTasks((querySnapshot) => {
        
let html = "";
   querySnapshot.forEach(doc => {
    const task = doc.data()
    html += `
    <div class ="task roudnBorder">
        <h3 class ="">${task.title}</h3>
        <p>${task.description} </p>
        <div class="btn-flex">
        <button class='btn-form btn-delete' data-id="${doc.id}">Delete</button>
        <button class='btn-form btn-edit' data-id="${doc.id}">Edit</button>
        </div>
    </div>
    `;
   });

   tasksContainer.innerHTML = html;

   const btnsDelete = tasksContainer.querySelectorAll('.btn-delete')
   btnsDelete.forEach(btn => {
    btn.addEventListener('click', ({target: {dataset}}) => {
       deleteTask(dataset.id)
    });
   });

   const btnsEdit = tasksContainer.querySelectorAll('.btn-edit')
   btnsEdit.forEach(btn => {
    btn.addEventListener('click', async(e)  =>{
        console.log(e)
        const doc = await getTask(e.target.dataset.id)
       const task = doc.data()

       taskform['task-title'].value = task.title
       taskform['task-description'].value = task.description

       editStatus = true;
       id = doc.id;
       taskform['btn-task-save'].innerText = 'Update'

   })

    });
});


taskform.addEventListener('submit', (e)=> {
    e.preventDefault()
    

   const title = taskform['task-title']
   const description = taskform['task-description']

   if(!editStatus){
    
    saveTask(title.value, description.value)

   }else{
    UpdateTask(id, {
        title: title.value,
        description: description.value
    });
    editStatus = false;
    taskform['btn-task-save'].innerText = 'Agregar'
   }
   
   taskform.reset();
})
})