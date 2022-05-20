const list = document.querySelector('ul');
const input = document.querySelector('input');
const button = document.querySelector('button');

button.addEventListener('click', () => {
  const myScripture = input.value;
  input.value = '';

  const newItem = document.createElement('li');
  const newText = document.createElement('span');
  const newBtn = document.createElement('button');

  newItem.appendChild(newText);
  newText.textContent = myScripture;
  newItem.appendChild(newBtn);
  newBtn.textContent = '❌';
  list.appendChild(newItem);

  newBtn.addEventListener('click', () => {
    list.removeChild(newItem);
  });

  input.focus();
});