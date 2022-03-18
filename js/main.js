'use strict';

//Run code only after the page has loaded completed
$(document).ready(function () {
  //Caching DOM selectors
  const $externalLinks = $('.external-links');
  const $windowSelector = $(window);
  const $animationElement = $('.article-block');
  const $likeUnlikeButton = $('.image-swap');
  const $dropdownMenu = $('.navbar-item__contact');
  const $openSavedModal = $('#saved-items-modal');
  const $closeSavedModal = $('#close-saved__modal');
  const $showHideSavedButton = $('#show-saved');
  const $savedItemsDiv = $('.saved-items');
  const $savedItemsTotal = $('#selection-page-saved-items')
  let $saveButton = $('.save-icon div');

  /* Declaration and initialisation of empty array to store item objects to be saved for the saved items page */
  let savedItems = [];

  //Function to save the saveItems array to local storage
  function saveToLocalStorage(itemsArray) {
    localStorage.setItem('storage', JSON.stringify(itemsArray));
  }

  /* Check if 'storage' item already exist and if not save the empty 'savedItems' array in local storage */
  if (!JSON.parse(localStorage.getItem('storage'))) {
    saveToLocalStorage(savedItems);
  }

  /* Event handler and function which will create and save card objects in the savedItems array for use in the saved.html page */
  $saveButton.on('click', saveItemObject);

  function saveItemObject() {
    /* Identifying which card was clicked, creates a new object from the information in the card and then adds the new object to the savedItems array after retrieving it from local storage. The updated savedItems is finally saved to local storage again */
    let newObject = {};
    let cardId = $(this).attr('data-save');
    let $card = $('#' + cardId);
    let image = $card.find('img').attr('src');
    let stoneName = $card.find('h3').text();
    let description = $card.find('p').text();
    newObject.image = image;
    newObject.stoneName = stoneName;
    newObject.description = description;
    savedItems = JSON.parse(localStorage.getItem('storage'));
    savedItems.push(newObject);
    $savedItemsTotal.text(savedItems.length)
    saveToLocalStorage(savedItems);
  }

  /* Opening (displaying) of the modal dailogue box when the save item button is clicked. This dialogue box then informs the user of the current items in storage */
  $saveButton.on('click', function () {
    $openSavedModal.css('display', 'flex');
  });

  /* Closing of the modal if the "Okay" button in the modal content box is clicked */
  $closeSavedModal.on('click', function () {
    $openSavedModal.css('display', 'none');
  });

  /* Closing of the modal if anywhere outside the modal content box is clicked */
  /* Ref: https://stackoverflow.com/questions/37573608/how-to-make-modal-close-on-click-outside. Used as a reference to close a modal by clicking outside of the modal box */
  $('body').click(function (event) {
    if ($(event.target).closest($openSavedModal).length !== 0) {
      $openSavedModal.hide();
    }
  });

  /* Hide the saved items unless the "Show / Hide Saved Items" button is clicked. This is the default. */
  $savedItemsDiv.hide();

  /* Show the saved items if the "Show / Hide Saved Items" button is clicked */
  $showHideSavedButton.on('click', function () {
    $savedItemsDiv.toggle();
  });

  /* Chained jQuery commands to fadeOut and in the external links on the stone-selection.html page below the stone cards */
  $externalLinks
    .mouseenter(function () {
      $(this).fadeOut(4000);
    })
    .mouseleave(function () {
      $(this).fadeIn(1000);
    });

  // jQuery animation of article blocks on landing page.
  $windowSelector.scroll(function () {
    $animationElement.animate({ opacity: '1' }, 6000, 'linear');
  });

  /* Like / unlike toggle button on the stone-selection.html page*/
  $likeUnlikeButton.on('click', function () {
    let id = $(this).attr('data-like');
    $('#' + id).toggleClass('transparent');
  });

  /* Dropdown menu animation when clicking*/
  $dropdownMenu.on('click', function () {
    $('.dropdown').fadeToggle(1000);
  });
});
