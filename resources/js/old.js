console.log('lol')
const data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')): {
    todo: [],
    completed: []
};

listeners();


function addItemTodoList(text) {
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
            saveTaskToLocalStorage(text, taskType = 'completed');//save при смене типа таски
        } else if (completed.contains(listItem)) {
            todoList.appendChild(listItem);
            listItem.classList.add('.todo')
            checkIcon.src = './resources/assets/unCheckIcon.svg';
            saveTaskToLocalStorage(text, taskType = 'todo');//save при смене типа таски
        } else (console.log('Ошибка checkButton'))
    })

    const delButton = document.createElement('button');
    delButton.className = 'del-button';
    //svg
    const delIcon = document.createElement('img');
    delIcon.src = './resources/assets/Vector.svg';
    delIcon.alt = 'Delete Icon'
    delButton.appendChild(delIcon);

    delButton.addEventListener('click', () => {
        if (todoList.contains(listItem)) {
            todoList.removeChild(listItem);
            deleteTaskFromLocalStorage(text)

        } else if (completed.contains(listItem)) {
            completed.removeChild(listItem);
        } else (console.log('Ошибка delButton'))

    });

    saveTaskToLocalStorage(text, taskType = 'todo');
    listItem.appendChild(checkButton);
    listItem.appendChild(delButton);
    todoList.appendChild(listItem);
}

function listeners() {

    const addButton = document.getElementById('add');
    const userInput = document.querySelector('.styled-input');

    const emptyInputMessage = document.createElement('span');
    const inputContainer = document.querySelector('.input-container');

    emptyInputMessage.className = 'emptyInputMessage';
    emptyInputMessage.textContent = 'Поле ввода пусто';

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
            addItemTodoList(userInput.value);
            userInput.value = '';
        } else {
            emptyInputMessage.style.display = 'block';
            inputContainer.appendChild(emptyInputMessage);
        }
    })

    userInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            if (userInput.value) {
                addItemTodoList(userInput.value);
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
} 

function saveTaskToLocalStorage(taskText, taskType) {

    const data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')): {
        todo: [],
        completed: []
    };
    
    // if(taskType === 'todo') {
    //     data.todo.push(taskText);
    // } else if(taskType === 'completed') {
    //     data.completed.push(taskText);
    // }
    // localStorage.setItem('todoList', JSON.stringify('data'))
    console.log(`saveTaskToLocalStorage call, ${taskType}`)
}

function loadTasksFromLocalStorage() {
    localStorage.getItem('todoList')
    console.log('loadTasksFromLocalStorage call')
}

function deleteTaskFromLocalStorage(taskText) {
    console.log('deleteTaskFromLocalStorage call')
}