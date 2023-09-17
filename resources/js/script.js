const data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : {
    todo: [],
    completed: []
};

console.log(data);
console.log(data.todo);
console.log(data.completed);

renderTodoList();
inputHandler();


function renderTodoList() {
    if (!data.todo.length && !data.completed.length) return;

    // Очистить контейнеры перед добавлением элементов
    const todoListContainer = document.querySelector('.todo');
    const completedListContainer = document.querySelector('.completed');
    todoListContainer.innerHTML = '';
    completedListContainer.innerHTML = '';

    for (let i = 0; i < data.todo.length; i++) {
        let value = data.todo[i];
        addItemToDOM(value, 'todo');
    }

    for (let j = 0; j < data.completed.length; j++) {
        let value = data.completed[j];
        addItemToDOM(value, 'completed');
    }
}

function addItemToDOM(text, status) {
    let list = (status === 'completed') ? document.getElementById('completed') : document.getElementById('todo');

    const todoList = document.querySelector('.todo');
    const completed = document.querySelector('.completed');

    const listItem = document.createElement('li');
    listItem.innerText = text;

    const checkButton = document.createElement('button');
    checkButton.className = 'check-button';
    //svg
    const checkIcon = document.createElement('img');
    checkIcon.src = './resources/assets/unCheckIcon.svg';
    checkIcon.alt = 'Check Icon';
    checkButton.appendChild(checkIcon);

    checkButton.addEventListener('click', () => {
        if (todoList.contains(listItem)) {
            completed.appendChild(listItem);
            listItem.classList.add('.completed')
            checkIcon.src = './resources/assets/CheckIcon.svg';
            saveTaskToLocalStorage(text, taskType = 'completed');

            data.todo.splice(data.todo.indexOf(text), 1);
            dataObjectUpdated();

        } else if (completed.contains(listItem)) {
            todoList.appendChild(listItem);
            listItem.classList.add('.todo')
            checkIcon.src = './resources/assets/unCheckIcon.svg';
            saveTaskToLocalStorage(text, taskType = 'todo');

            data.completed.splice(data.completed.indexOf(text), 1);
            dataObjectUpdated();
        } else (console.log('Ошибка checkButton'))
    });

    const delButton = document.createElement('button');
    delButton.className = 'del-button';
    //svg
    const delIcon = document.createElement('img');
    delIcon.src = './resources/assets/Vector.svg';
    delIcon.alt = 'Delete Icon'
    delButton.appendChild(delIcon);

    delButton.addEventListener('click', () => {
        removeItem(listItem)
    });

    listItem.appendChild(checkButton);
    listItem.appendChild(delButton);
    todoList.appendChild(listItem);

    // list.insert(todoList, list.childNodes[0]);
}

function saveTaskToLocalStorage(taskText, taskType) {

    if (taskType === 'todo') {
        data.todo.push(taskText);
    } else if (taskType === 'completed') {
        data.completed.push(taskText);
    }
    localStorage.setItem('todoList', JSON.stringify(data));
    console.log(`saveTaskToLocalStorage call, ${taskType}`);
}

function inputHandler() {

    const addButton = document.getElementById('add');
    const userInput = document.querySelector('.styled-input');

    const emptyInputMessage = document.createElement('span');
    const inputContainer = document.querySelector('.input-container');

    emptyInputMessage.className = 'emptyInputMessage';
    emptyInputMessage.textContent = 'Поле ввода пусто';

    const highlightEvenElementButton = document.querySelector('.highlight-evenElement-button');
    const highlightOddElementButton = document.querySelector('.highlight-oddElement-button');

    // Все элементы li из списка todo
    const todoListItems = document.querySelectorAll('.todo li');

    document.addEventListener('keydown', (event) => {
        if (document.activeElement !== userInput) {
            if (event.key === '/') {
                event.preventDefault();
                userInput.focus();
            }
        }
        if (document.activeElement === userInput) {
            if (event.key === 'Escape') {
                userInput.blur();
            }
        }
    })

    addButton.addEventListener('click', () => {
        if (userInput.value) {
            saveTaskToLocalStorage(userInput.value, taskType = 'todo');
            renderTodoList();
            userInput.value = '';
        } else {
            emptyInputMessage.style.display = 'block';
            inputContainer.appendChild(emptyInputMessage);
        }
    })

    userInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            if (userInput.value) {
                saveTaskToLocalStorage(userInput.value, taskType = 'todo');
                renderTodoList();
                userInput.value = '';
            } else {
                emptyInputMessage.style.display = 'block';
                inputContainer.appendChild(emptyInputMessage);
            }
        }
    })

    userInput.addEventListener('input', () => {
        if (userInput.value) {
            emptyInputMessage.style.display = 'none';
            inputContainer.appendChild(emptyInputMessage);
        }
    })

    //action-panel buttons
    highlightEvenElementButton.addEventListener('click', () => {
        const isEvenHighlighted = todoListItems[1].style.color === 'red';
        // Перебор всех элементов li и применение стиля к четным элементам
        todoListItems.forEach((item, index) => {
            if (index % 2 === 1) { // Четные элементы (индексы с 0)
                item.style.color = isEvenHighlighted ? '' : 'red'; 
            }
        });
    });

    highlightOddElementButton.addEventListener('click', () => {
        const isEvenHighlighted = todoListItems[0].style.color === 'red';
        // Перебор всех элементов li и применение стиля к нечетным элементам
        todoListItems.forEach((item, index) => {
            if (index % 2 === 0) { // Нечетные элементы (индексы с 0)
                item.style.color = isEvenHighlighted ? '' : 'red'; 
            }
        });
    })
}

function removeItem(itemToRemove) {
    let parent = itemToRemove.parentNode;

    if (parent) {
        let parentClass = parent.classList;
        let value = itemToRemove.innerText;

        if (parentClass.contains('todo')) {
            data.todo.splice(data.todo.indexOf(value), 1);
        } else {
            data.completed.splice(data.completed.indexOf(value), 1);
        }
        dataObjectUpdated();

        parent.removeChild(itemToRemove);
    }
}

function dataObjectUpdated() {
    localStorage.setItem('todoList', JSON.stringify(data));

    console.log('after removeItem and dataObjectUpdated func')
    console.log(data);
    console.log(data.todo);
    console.log(data.completed);
}