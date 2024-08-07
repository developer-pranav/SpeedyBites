const popup = document.getElementsByClassName('popup')[0];
const form = document.querySelector('.contact-form form');

form.addEventListener('submit', e => {
    e.preventDefault()
    popup.style.top = '80px';
    console.log('pop')
    setInterval(() => {
        popup.style.top = '0'
    }, 3000);
    form.reset()
})