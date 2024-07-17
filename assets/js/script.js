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
// Paint the stored text on mood board
tempStorageObject.text.forEach((text) => {
  const textDiv = document.createElement("div");
  textDiv.textContent = text.text;
  textDiv.style.left = text.left;
  textDiv.style.top = text.top;
  textDiv.classList.add("text-item");
  moodBoardEl.appendChild(textDiv);
});
//  ? We create an event listener for the image URL input field. This will create an image element and attach it to the mood board with the URL provided by the user.

addImageBtn.addEventListener("click", function () {
  const imageUrl = imageUrlInput.ariaValueMax;
  if (imageUrl) {
    const img = document.createElement("img");
    img.src = imageUrl;
    img.classList.add("draggable");
    document.body.appendChild(img);
  }

  // ? We set the current element to the img element so that we can update the position of the element when the mouse is moved.
  currentElement = img;

  attachMouseListeners();
});

// ? We create an event listener for the text input field. This will create a div element and attach it to the mood board with the text provided by the user.
addTextBtn.addEventListener("click", function () {
  const text = textInput.value;
  if (text) {
    const textDiv = document.createElement("div");
    textDiv.classList.add("text-item", "draggable");
    textDiv.textContent = text;
    document.body.appendChild(textDiv);

    currentElement = textDiv;

    attachMouseListeners();
  }
});
function attachMouseListeners() {
  document.addEventListener("mousemove", mouseMoveHandler);
  moodBoardEl.addEventListener("click", placeElementClickHandler);
}
// ? This is the event handler for the mouse move event. This will be called whenever the mouse is moved on the screen.
// ? We check if the current element is set. If it is set, we update the position of the element to the mouse position.
function mouseMoveHandler(event) {
  if (currentElement) {
    currentElement.style.left = event.clientX + "px";
    currentElement.style.top = event.clientY + "px";
  }
}

function placeElementClickHandler(event) {
  if (currentElement) {
    const moodBoardRect = moodBoardEl.getBoundingClientRect();

    const left = `${event.clientX - moodBoardRect.left}px}`;
    const top = `${event.clientY - moodBoardRect.top}px`;

    currentElement.style.left = left;
    currentElement.style.top = top;

    moodBoardEl.appendChild(currentElement);

    if (currentElement.tagName === "IMG") {
      tempStorageObject.images.push({
        text: currentElement.textContent,
        left: left,
        top: top,
      });
    } else {
      tempStorageObject.text.push({
        text: currentElement.textContent,
        left: left,
        top: top,
      });
    }
    updateLocalStorage();

    currentElement = null;

    imageUrlInput.value = "";
    textInput.value = "";

    document.removeEventListener("mousemove", mouseMoveHandler);
  }
}
window.onload = loadFromLocalStorage;
