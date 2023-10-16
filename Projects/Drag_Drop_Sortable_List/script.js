let currentElement = "";
let list = document.getElementById("list");
let initialX = 0,
  initialY = 0;

// Function to detect touch devices
const isTouchDevice = () => {
  try {
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
};

// Function to create list items
const creator = (count) => {
  for (let i = 1; i <= count; i++) {
    list.innerHTML += `<li class="list-item" data-value="${i}">Item-${i} </li>`;
  }
};

// Function to get the position of an item by its data-value attribute
const getPosition = (value) => {
  let elementIndex;
  let listItems = document.querySelectorAll(".list-item");
  listItems.forEach((element, index) => {
    let elementValue = element.getAttribute("data-value");
    if (value == elementValue) {
      elementIndex = index;
    }
  });
  return elementIndex;
};

// Function to handle drag start event
function dragStart(e) {
  initialX = isTouchDevice() ? e.touches[0].clientX : e.clientX;
  initialY = isTouchDevice() ? e.touches[0].clientY : e.clientY;
  currentElement = e.target;
}

// Function to handle drag over event
function dragOver(e) {
  e.preventDefault();
}

// Function to handle drop event
const drop = (e) => {
  e.preventDefault();
  let newX = isTouchDevice() ? e.touches[0].clientX : e.clientX;
  let newY = isTouchDevice() ? e.touches[0].clientY : e.clientY;

  let targetElement = document.elementFromPoint(newX, newY);
  let currentValue = currentElement.getAttribute("data-value");
  let targetValue = targetElement.getAttribute("data-value");

  let [currentPosition, targetPosition] = [
    getPosition(currentValue),
    getPosition(targetValue),
  ];
  initialX = newX;
  initialY = newY;

  try {
    if (currentPosition < targetPosition) {
      targetElement.insertAdjacentElement("afterend", currentElement);
    } else {
      targetElement.insertAdjacentElement("beforebegin", currentElement);
    }
  } catch (err) {}
};

// Execute code when the window loads
window.onload = async () => {
  currentElement = "";
  list.innerHTML = "";
  await creator(5);

  let listItems = document.querySelectorAll(".list-item");
  listItems.forEach((element) => {
    element.draggable = true;
    element.addEventListener("dragstart", dragStart, false);
    element.addEventListener("dragover", dragOver, false);
    element.addEventListener("drop", drop, false);
    element.addEventListener("touchstart", dragStart, false);
    element.addEventListener("touchmove", drop, false);
  });
};

// 1. Smooth Animation during Drag and Drop
list.addEventListener("dragover", (e) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
});

// 2. Custom Callback on Item Drop
list.addEventListener("drop", (e) => {
  e.preventDefault();
  // Perform a custom action when an item is dropped, e.g., update a database or trigger an event.
  console.log("Item dropped!");
});

// 3. Visual Feedback on Reordering
list.addEventListener("dragenter", (e) => {
  // Add a visual indicator to show where the item will be placed on drop.
  e.target.classList.add("drag-over");
});

list.addEventListener("dragleave", (e) => {
  // Remove the visual indicator when the dragged item leaves the target.
  e.target.classList.remove("drag-over");
});

// 4. Accessibility (ARIA attributes and Keyboard Navigation)
list.setAttribute("aria-dropeffect", "move");

// Enhance keyboard navigation for accessibility
listItems.forEach((element) => {
  element.setAttribute("tabindex", "0");
});
