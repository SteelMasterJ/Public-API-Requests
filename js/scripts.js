//global variables
const gallery = document.getElementById('gallery');
const body = document.querySelector('body');
const script = document.querySelector('script');
const apiUrl = 'https://randomuser.me/api/?results=12&nat=us,dk,fr,gb,ie,au,es,de,fi,nl,nz';


//function to fetch data and return it or throw error and log error to console
async function fetchData(url) {
    try {
        const res = await fetch(url);
        return res.json();
    }
    catch (error) {
        return console.log('problem!', error);
    }
  }

//this activates the fetch and returns the results along with calling the createCardDivs function
const promise = fetchData(apiUrl)
    .then(res => {
        const resultsArray = res.results;
        createCardDivs(resultsArray);
        return resultsArray;
    })
    

//testing
// const imageUrl = promise.then(results => {
//     console.log(results[0].name.first)
// })

//function to create card Divs for each of the returned results
function createCardDivs(data) {
    const cardDivs = data.map((item, index, array) => `
    <div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${item.picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${item.name.first} ${item.name.last}</h3>
            <p class="card-text">${item.email}</p>
            <p class="card-text cap">${item.location.city}, ${item.location.state}</p>
        </div>
        <div class="extra-info" id="phone" style="display: none;">${item.phone}</div>
        <div class="extra-info" id="full-addy" style="display: none;">${item.location.street.number} ${item.location.street.name} ${item.location.city}, ${item.location.state} ${item.location.postcode}</div>
        <div class="extra-info" id="city" style="display: none;">${item.location.city}</div>
        <div class="extra-info" id="birthday" style="display: none;">${item.dob.date}</div>
        <div class="extra-info" id="email" style="display: none;">${item.email}</div>

    </div>`).join('');
    gallery.innerHTML = cardDivs;
}

//function to display modal window of a selected random user
function generateModalHTML() {
    const modalHTML = `
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="" alt="profile picture">
            <h3 id="name" class="modal-name cap"></h3>
            <p id ="modal-email" class="modal-text"></p>
            <p id ="modal-city" class="modal-text cap"></p>
            <hr>
            <p id ="modal-phone" class="modal-text"></p>
            <p id ="modal-addy" class="modal-text"></p>
            <p id ="modal-dob" class="modal-text">Birthday: </p>
     </div>`;
    const modal = document.createElement('div');
    modal.className = "modal-container";
    modal.innerHTML += modalHTML;
    body.insertBefore(modal, script);
}

//function to populate the modal window with data
function addModalInfo(userHTML) {
    let user = userHTML.closest('.card');
    let userChildren = user.childNodes;
    //const modal = document.querySelector('.modal');

    let img = document.querySelector('.modal-img');
    let modalName = document.querySelector('div.modal-info-container h3');
    let email = document.querySelector('#modal-email');
    let city = document.querySelector('#modal-city');
    let phone = document.querySelector('#modal-phone');
    let addy = document.querySelector('#modal-addy');
    let dob = document.querySelector('#modal-dob');

    img.src = userChildren[1].firstElementChild.src;
    modalName.textContent = userChildren[3].firstElementChild.textContent;
    email.textContent = userChildren[13].textContent;
    city.textContent = userChildren[9].textContent;
    phone.textContent = userChildren[5].textContent;
    addy.textContent = userChildren[7].textContent;
    dob.textContent = userChildren[11].textContent;
}

//calling generateModalHTML
//generateModalHTML();

//event listener for clicks to display modal window
gallery.addEventListener('click', (e) => {
    // let user = e.target.closest('.card');
    // let userChildren = user.childNodes;
    console.log(e.target.parentNode.className);
    // console.log(userChildren[13].textContent)

    if (e.target.parentNode.className === 'card-info-container' || e.target.parentNode.className === 'card' || e.target.parentNode.className === 'card-img-container' || e.target.className === 'card') {
        generateModalHTML();
        addModalInfo(e.target);

        const xButton = document.querySelector('#modal-close-btn');
        xButton.addEventListener('click', (e) => {
            const modalDiv = document.querySelector('.modal-container');
            modalDiv.style.display = 'none';
            modalDiv.remove();
        });
    } 
});

// body.addEventListener('click', (e) => {
//     console.log(e.target.parentNode.className);
//     if (e.target.parentNode.className === 'modal-close-btn') {
//         const modalDiv = document.querySelector('.modal-container');
//         modalDiv.style.display = 'none';
//         modalDiv.innerHTML = '';
//     }
// });