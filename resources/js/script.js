console.log('lol')

const addButton = document.getElementById('add');

addButton.addEventListener('click', () => {
    const userInput = document.getElementsByTagName('input')[0];
    if (userInput.value === "") console.log('Ввод пуст')
    else console.log(userInput.value);
})