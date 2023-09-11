console.log('lol')

const addButton = document.getElementById('add');
const input = document.querySelector('.styled-input');

document.addEventListener('keydown', (event) => {
    if (document.activeElement !== input) {
        if (event.key === '/') {
            event.preventDefault();
            input.focus();
        }
    }
})

addButton.addEventListener('click', () => {
    const userInput = document.getElementsByTagName('input')[0];
    if (userInput.value) {
        addItemTodoList(userInput.value);
        userInput.value = '';
    }
})

input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const userInput = document.getElementsByTagName('input')[0];
        if (userInput.value) {
            addItemTodoList(userInput.value);
            userInput.value = '';
        }
    }
})

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