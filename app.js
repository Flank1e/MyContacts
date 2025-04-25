const greetingElement = document.getElementById('greeting');
const changeGreetingBtn = document.getElementById('changeGreetingBtn');
const clickCountElement = document.getElementById('clickCount');
const changeBackgroundBtn = document.getElementById('changeBackgroundBtn');

let clickCount = 0;
const greetings = ['Hello World', 'Hola Mundo', 'Bonjour le monde', 'Konnichiwa Sekai'];
let greetingIndex = 0;

changeGreetingBtn.addEventListener('click', () => {
    greetingIndex = (greetingIndex + 1) % greetings.length;
    greetingElement.classList.add('bounce');
    greetingElement.addEventListener('animationend', () => {
        greetingElement.classList.remove('bounce');
    }, { once: true });
    greetingElement.textContent = greetings[greetingIndex];
    clickCount++;
    clickCountElement.textContent = clickCount;
});

changeBackgroundBtn.addEventListener('click', () => {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    document.body.style.backgroundColor = randomColor;
});