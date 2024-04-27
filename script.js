// Access key
const key = "KRa2YadcsGdP8gNVUmO853YfscPJU5jje7tnrgAecek"

const formE1 = document.querySelector("form")
const inputE1 = document.getElementById("search-input")
const searchResults = document.querySelector(".search-results")
const showMore = document.getElementById("show-more-button")

let inputData = ""
let page = 1;

// Input section
async function searchImages(){
    inputData = inputE1.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${key}`

    // fetching data from api
    const response = await fetch(url)
    const data = await response.json()

    // converting the data into images by converting it into variables
    const results = data.results


    // Wrapping images from our search into our container that we made
    if (page === 1){
        searchResults.innerHTML = ""
    }

    results.map((result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result");
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement('a');
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;
    
        // appending images to our html 
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper); // Changed this line to append imageWrapper to searchResults
    });
    

    // Increasing pagae number
    page++
    if(page > 1){
        showMore.style.display = "block"
    }
}

// Event listener
formE1.addEventListener("submit", (event) =>{
    event.preventDefault();
    page=1;
    searchImages();
});

showMore.addEventListener("click", (event) =>{
    searchImages()
});
