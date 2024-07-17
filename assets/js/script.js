// grab all elements from the DOM elements
const moodBoardEl = document.querySelector("#mood-board");
const addImageBtn = document.querySelector("#add-image");
const addTextBtn = document.querySelector("#add-text");
const imageUrlInput = document.querySelector("#image-url");
const textInput = document.querySelector("#text-input");
const clearBtn = document.querySelector("#clear-all");

//we need to keep track of the elements that are added to the board and their positions
let tempStorageObject = {
  images: [],
  text: [],
};

// keep track of element being dragged
let currentElement = null;

clearBtn.addEventListener("click", function () {
  localStorage.clear();
  window.location.reload();
});
