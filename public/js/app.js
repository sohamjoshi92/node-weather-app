//Fetch API for client side javascript.

//Not a part of NODE JS. Executed in a browser only.
const form = document.querySelector('form')
const search = document.querySelector('input')
search.focus()
const pOne = document.querySelector('#message-one')
const ptwo = document.querySelector('#message-two')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    pOne.textContent = 'Loading....'
    ptwo.textContent = ''
    fetch('/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            pOne.textContent = data.error
        }
        else{
            pOne.textContent = data.location
            ptwo.textContent = 'Weather : '+data.weather+' | Current Temperature : '+data.current+' °F | Feels Like : '+data.feelslike+' °F'
        }
    })
})
})
