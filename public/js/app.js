// console.log('cliente side javascript file loaded');
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault(); // bloquea que por defecto se recargue otra vez la pagina 
    const location = search.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    // con fetch podemos recoger data del servidor y mostrarlo en el lado del cliente
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
                messageTwo.textContent = '';
            } else {
                console.log(data);
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
    });
});
