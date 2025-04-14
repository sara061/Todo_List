// 1. Находим элементы на странице

const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const emptyList = document.querySelector("#emptyList");

let tasks = [];
ckeckEmptyList();

if(localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.forEach((task) => renderTask(task));
   ckeckEmptyList();
}


    
//Добавление задачи

form.addEventListener("submit", addTask);
tasksList.addEventListener('click', deleteTask);
tasksList.addEventListener('click', doneTask );


// Функции
function addTask (event) {
  // е - event
  //Отменяем отправку формы
  event.preventDefault();

  // Достаем данные из поля ввода
  const taskText = taskInput.value;

  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };

  // Добавляем новую задачу в массив 
  tasks.push(newTask);
  saveToLocalStorage();
//Рендерим задачу на страницу

renderTask(newTask);

  //Очищаем поле ввода и возвращем ему фокус
  taskInput.value = "";
  taskInput.focus();

  // Прроверка. Если в списке более 1 элемента то присваивается класс none


 ckeckEmptyList();
};



function deleteTask (event) {
  //Проверяем был ли клик Не по кнопке "удалить"

  if (event.target.dataset.action !== "delete") return;

  //Проверяем был ли клик по кнопке удалить
  const parentNode = event.target.closest(".list-group-item");

  // Определяем ID задачи
  const id = Number(parentNode.id);
 


  //УДаляем задачу через фильтрацию массива

  tasks = tasks.filter((task) => task.id !== id);
saveToLocalStorage();

  parentNode.remove();
ckeckEmptyList();
}

function doneTask(event) {
 // Проверяем был ли клик НЕ по кнопке "Задача выполнена"

 if (event.target.dataset.action !== 'done') return
	const parentNode = event.target.closest(".list-group-item");

	const taskTitle = parentNode.querySelector('.task-title');
// Определяем Id задачи
const id = Number(parentNode.id);

const task = tasks.find((task) => task.id === id)
task.done = !task.done;

saveToLocalStorage();

console.log(tasks);

taskTitle.classList.toggle('task-title--done');
 
ckeckEmptyList();
}

function ckeckEmptyList() {
  if(tasks.length === 0){
    const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
					<img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
					<div class="empty-list__title">Список дел пуст</div>
				</li>`;
        tasksList.insertAdjacentHTML("afterbegin", emptyListHTML);
  }

  if (tasks.length > 0) {
    const emptyListEL = document.querySelector("#emptyList");
    emptyListEL ? emptyListEL.remove() : null;
  }

}

function saveToLocalStorage(){
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTask(task) {
    const cssClass = task.done ? "task-title task-title--done" : "task-title";

    // Добавляем новую задачу

    const taskHtml = `<li id = "${task.id}" class="list-group-item d-flex justify-content-between task-item">
					<span class="${cssClass}">${task.text}</span>
					<div class="task-item__buttons">
						<button type="button" data-action="done" class="btn-action">
							<img src="./img/tick.svg" alt="Done" width="18" height="18">
						</button>
						<button type="button" data-action="delete" class="btn-action">
							<img src="./img/cross.svg" alt="Done" width="18" height="18">
						</button>
					</div>
				</li>`;

    tasksList.insertAdjacentHTML("beforeend", taskHtml);
ckeckEmptyList();
}