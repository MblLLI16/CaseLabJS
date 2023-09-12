console.log('lol')

const addButton = document.getElementById('add');
const userInput = document.querySelector('.styled-input');

const emptyInputMessage = document.createElement('span');
const inputContainer = document.querySelector('.input-container');

emptyInputMessage.className = 'emptyInputMessage';
emptyInputMessage.textContent = 'Поле ввода пусто';

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
        } else if (completed.contains(listItem)) {
            todoList.appendChild(listItem);
            listItem.classList.add('.todo')
            checkIcon.src = './resources/assets/unCheckIcon.svg';
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
        } else if (completed.contains(listItem)) {
            completed.removeChild(listItem);
        } else (console.log('Ошибка delButton'))

    });

    listItem.appendChild(checkButton);
    listItem.appendChild(delButton);
    todoList.appendChild(listItem);
}

function listeners() {
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
        // const userInput = input;
        if (userInput.value) {
            addItemTodoList(userInput.value);
            userInput.value = '';
        }
    })

    userInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            if (userInput.value) {
                addItemTodoList(userInput.value);
                userInput.value = '';

                emptyInputMessage.style.display = 'none';
                inputContainer.appendChild(emptyInputMessage);
            } else {
                emptyInputMessage.style.display = 'block';
                inputContainer.appendChild(emptyInputMessage);
            }
        }
    })

    userInput.addEventListener('input', () => {
        if (userInput.value) {
            console.log('зашли в обработчик скрытия при вводе')
            emptyInputMessage.style.display = 'none';
            inputContainer.appendChild(emptyInputMessage);
        }
    })
}