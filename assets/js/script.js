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
// ? Function to update local storage. This function will be called after a new element is added to the mood board and the tempStorageObject is updated.

function updateLocalStorage() {
  localStorage.setItem("moodBoardData", JSON.stringify(tempStorageObject));
}
// ? Function to load from local storage. This function will be called on page load.

function loadFromLocalStorage() {
  const storedData = JSON.parse(localStorage.getItem("moodBoardData"));
  if (storedData) {
    tempStorageObject = storedData;
  }
}
tempStorageObject.text.forEach((text) => {
  const img = document.createElement("img");
  img.src = image.url;
  img.style.left = image.left;
  img.style.top = image.top;
  img.classList.add("draggable");
  moodBoardEl.appendChild(img);
});
