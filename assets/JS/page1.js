const PUBLIC_KEY = '6cfaa22001d90ba525edf5f35f990929';  //public key //
const PRIVATE_KEY = '18d1ebb4b3d6404ac515fa404c6c395bb083fb3f' //private key //
const BASE_URL = 'https://gateway.marvel.com:443/v1/public';
const inputBox = document.getElementById('search-input-box');
const searchForm = document.getElementById('search-form');

function getCharacter(event) {
    event.preventDefault();
    const inputText = inputBox.value;
    inputBox.value = '';
    searchForCharacter(inputText); // issue 
}

function searchForCharacter(inputText) {
    const ts = Number(new Date());
    const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY); //issue with md5 not defined - consolelog
    //const hash = md5.create(); //
    //hash.update(ts + PRIVATE_KEY + PUBLIC_KEY); //
    const url = `${BASE_URL}/characters?ts=${ts}&name=${inputText}&apikey=${PUBLIC_KEY}&hash=${hash}`;
    fetch(url)
    .then(function(results){
        return results.json();
    })
    .then(function(data){
        const count = data.data.count;
        if(count > 0) {
            const characterId = data.data.results[0].id;
            console.log(characterId);
            searchForComic(characterId);
        } else {
            //TODO: show an error message - use modal - Semantic UI
            alert('No characters found by that name');
            // get the modal
            const modal = document.querySelector("#modal");
            // button that opens the modal
            const openModal = document.querySelector("#refresh");
            // get the span that closes the modal>
            const closeModal = document.querySelector(".close");
            // when user clicks on button, open modal
            openModal.addEventListener('click', () => {
                modal.showModal()
            })
            closeModal.addEventListener('click', () => {
                modal.closest();
            })
            }
        }
    );
}

function searchForComic(characterId) {
    const ts = Number(new Date());
    const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY);
    // const hash = md5.create();
    // hash.update(ts + PRIVATE_KEY + PUBLIC_KEY);
    const url = `${BASE_URL}/comics?limit=9&ts=${ts}&characters=${characterId}&apikey=${PUBLIC_KEY}&hash=${hash}`;
    fetch(url)
    .then(function(results){
        return results.json();
    })
    .then(function(data){
        console.log(data);
        const count = data.data.count;
        if(count > 0) {
            const comicsArray = data.data.results;
            console.log(comicsArray)
            // display the comics - via query selector
            for (let i = 0; i < comicsArray.length; i++) {
                const element = array[i];
                // creating elements card, div
    
                //set the text of the link

                //append the link to card, div etc
            }
            document.querySelector(".title" + i).innerHTML = " Title:" + results;
            document.querySelector(".image" + i).src =``; // back ticks and $ link
            document.querySelector(".author" + i).innerHTML = "Author:" + results;
        } else {
            //TODO: show an error message - use modal
            alert('No comics found');
            $('.ui.tiny.modal')
            .modal('show');
        }
    });
      // creating elements card, div appending child
  // parent element
  function displayComics(){
    const displayResults = document.getElementById("display");
  
    let comicTitle = document.getElementById("titleComic");
    let comicImage = document.getElementById("comicImg");
    let comicAuthor = document.getElementById("comicAuth");
    //set the text of the link
    let newTitle = document.createElement("div");
    newTitle.textContent = (displayResults);
  
    let newImage = document.createElement("img");
    newImage.src = 'http://i.annihil.us/u/prod/marvel/i/mg/';
  
    let newAuthor = document.createElement("div");
    newAuthor.textContent = (displayResults);
  
    //append the link to card, div etc
    displayResults.appendChild(newTitle, newImage, newAuthor);
    $('#refresh').click(function(){
      $('div').append("<div[displayResults]</div>")
    })
    }
}


searchForm.addEventListener('submit', getCharacter);