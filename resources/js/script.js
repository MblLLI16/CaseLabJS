console.log('lol')

const addButton = document.getElementById('add');

addButton.addEventListener('click', () => {
    const userInput = document.getElementsByTagName('input')[0];
    if (userInput.value) {
        addItemTodoList(userInput.value);
        userInput.value = '';
    }
})

function addItemTodoList(text) {
    const todoList = document.querySelector('.todo');

    const listItem = document.createElement('li');
    listItem.innerText = text;

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', () => {
        todoList.removeChild(listItem);
    });

    listItem.appendChild(deleteButton);
    todoList.appendChild(listItem);
}