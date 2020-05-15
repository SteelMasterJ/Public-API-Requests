//global variables
const gallery = document.getElementById('gallery');


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


const promise = fetchData('https://randomuser.me/api/?results=12&nat=us,dk,fr,gb,ie,au,es,de,fi,nl,nz')
  .then(res => {
        const resultsArray = res.results;
        createCardDivs(resultsArray);
        return resultsArray;
    })
    
//testing
const promiseJSONArray = promise.then(results => {
    console.log(results[0].picture.large)
})

//let promiseResults = promise.then(res => console.log(res.results));

//function to create cards for each of teh returned results
function createCardDivs(data) {
    const cardDivs = data.map(item => `
    <div class='card'></div>
  `).join('');
    gallery.innerHTML = cardDivs;
}

//createCardDivs(promise);