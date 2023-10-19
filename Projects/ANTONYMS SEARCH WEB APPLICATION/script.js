// Get references to HTML elements
const searchInputEl = document.getElementById('searchInput');
const searchButtonEl = document.getElementById('searchButton');
const antonymsListEl = document.getElementById('antonymsList');
const sentenceDisplayEl = document.getElementById('sentenceDisplay');

// Event listener for the search button
searchButtonEl.addEventListener('click', initiateSearch);

// Function to initiate antonym search
function initiateSearch() {
    const inputWord = searchInputEl.value.trim();

    if (inputWord) {
        fetchAntonyms(inputWord);
    } else {
        resetResults();
    }
}

// Function to fetch and display antonyms using Datamuse
function fetchAntonyms(word) {
    const apiUrl = `https://api.datamuse.com/words?rel_ant=${word}&max=10`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(displayAntonymsList)
        .catch(handleError);
}

// Function to display antonyms and handle clicks
function displayAntonymsList(antonyms) {
    resetResults();

    if (antonyms.length === 0) {
        antonymsListEl.innerHTML = 'No antonyms found.';
        return;
    }

    antonyms.forEach(antonym => {
        const antonymItem = createAntonymListItem(antonym.word);
        antonymsListEl.appendChild(antonymItem);

        // Add a click event listener to each antonym item
        antonymItem.addEventListener('click', () => {
            displayAssociatedSentence(antonym.word);
        });
    });
}

// Function to create a list item for antonyms
function createAntonymListItem(text) {
    const listItemEl = document.createElement('li');
    listItemEl.textContent = text;
    return listItemEl;
}

// Function to display a sentence for a selected antonym
function displayAssociatedSentence(word) {
    // Replace this with your code to fetch a sentence containing the selected antonym
    // For demonstration purposes, we'll use a placeholder sentence
    const sentence = `A sentence containing the antonym "${word}" is displayed here.`;

    sentenceDisplayEl.textContent = sentence;
}

// Function to handle API errors
function handleError(error) {
    console.log('An error occurred:', error);
}

// Function to reset search results
function resetResults() {
    antonymsListEl.innerHTML = '';
    sentenceDisplayEl.textContent = '';
    searchInputEl.value = '';
}
