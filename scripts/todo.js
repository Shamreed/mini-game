const todoList = JSON.parse(localStorage.getItem('todoList')) || [{
  name: 'make dinner',
  dueDate: '2022-12-22'
}, {
  name: 'wash dishes',
  dueDate: '2022-12-22'
}];


renderTodoList();

/*
  for (let i = 0; i < todoList.length; i++){
    const todoObject = todoList[i];
    
    const name = todoObject.name;
    const dueDate = todoObject.dueDate;
    
    // Destructuring
    const { name, dueDate } = todoObject;
    const html = `
      <div>${name}</div>
      <div>${dueDate}</div>
      <button onclick="
        todoList.splice(${i}, 1);
        renderTodoList();
      " class="todo-delete-button">Delete</button>
    `;
    todoListHtML += html;
  }
*/

function renderTodoList(){
  let todoListHtML = '';

  todoList.forEach((todoObject, index) => {
    const { name, dueDate } = todoObject;
    const html = `
      <div>${name}</div>
      <div>${dueDate}</div>
      <button class="todo-delete-button js-delete-button">Delete</button>
    `;
    todoListHtML += html;
  });

  document.querySelector('.js-div')
    .innerHTML = todoListHtML;

  document.querySelectorAll('.js-delete-button')
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener('click', () => {
        todoList.splice(index, 1);
        renderTodoList();
        localStorage.setItem('todoList', JSON.      stringify(todoList));
      })
    });
}

document.querySelector('.js-add-button')
  .addEventListener('click', () => {
    addTodo();
  })

function addTodo(){
  const inputElement = document.querySelector('.js-input');
  const name = inputElement.value;

  const InputDate = document.querySelector('.js-input-date');
  const dueDate = InputDate.value;

  todoList.push({
    //name: name,
    //dueDate: dueDate
    name,
    dueDate
  });
  
  inputElement.value = '';
  InputDate.value = '';

  renderTodoList();

  localStorage.setItem('todoList', JSON.stringify(todoList));
}