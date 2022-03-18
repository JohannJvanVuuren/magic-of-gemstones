'use strict';

// Cache DOM selectors
const savedCards = document.querySelector('.saved-items');
const numberOfSavedItems = document.getElementById('saved-page-items');

//Retrieve savedItems from local storage
let savedItems = JSON.parse(localStorage.getItem('storage'))

//Update saved-items.html with the current number of saved items
numberOfSavedItems.textContent = `${savedItems.length}`


/*Using a for loop to add the individual saved items using the concatenation of template literals at each iteration through the loop until all objects in savedItems have been looped through */ 
  for (let i = 0; i < savedItems.length; i++) {
    savedCards.innerHTML += `
    <div>
      <h3>${savedItems[i].stoneName}</h3>
      <img src="${savedItems[i].image}" />
      <h4>${savedItems[i].description}</h4>
    </div>`;
  }


