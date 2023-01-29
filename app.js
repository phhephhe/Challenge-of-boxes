// create box
const centerDiv = document.querySelector('.center-div');

function generateBox() {
    const width = 50 + Math.floor(Math.random() * 200);
    const height = 50 + Math.floor(Math.random() * 200);
    let x = Math.floor(Math.random() * (1000 - width));
    let y = Math.floor(Math.random() * (1000 - height));
  
    const boxes = document.querySelectorAll('.box');
    let overlap = false;
  
    boxes.forEach(box => {
      const boxLeft = parseInt(box.style.left);
      const boxTop = parseInt(box.style.top);
      const boxWidth = parseInt(box.style.width);
      const boxHeight = parseInt(box.style.height);
  
      if (x < boxLeft + boxWidth &&
          x + width > boxLeft &&
          y < boxTop + boxHeight &&
          y + height > boxTop) {
        overlap = true;
      }
    });
  
    if (!overlap) {
      const box = document.createElement('div');
      box.classList.add('box');
      box.style.width = width + 'px';
      box.style.height = height + 'px';
      box.style.left = x + 'px';
      box.style.top = y + 'px';
  
      centerDiv.appendChild(box);
    } else {
      let hasSpace = false;
      for (let i = 0; i <= 1000 - width; i += 10) {
        for (let j = 0; j <= 1000 - height; j += 10) {
          overlap = false;
  
          boxes.forEach(box => {
            const boxLeft = parseInt(box.style.left);
            const boxTop = parseInt(box.style.top);
            const boxWidth = parseInt(box.style.width);
            const boxHeight = parseInt(box.style.height);
  
            if (i < boxLeft + boxWidth &&
                i + width > boxLeft &&
                j < boxTop + boxHeight &&
                j + height > boxTop) {
              overlap = true;
            }
          });
  
          if (!overlap) {
            hasSpace = true;
            x = i;
            y = j;
            break;
          }
        }
        if (hasSpace) {
          break;
        }
      }
      if (!hasSpace) {
        alert("Free space was not found!");
      } else {
        const box = document.createElement('div');
        box.classList.add('box');
        box.style.width = width + 'px';
        box.style.height = height + 'px';
        box.style.left = x + 'px';
        box.style.top = y + 'px';
  
        centerDiv.appendChild(box);
      }
    }
  }

  const addBtn = document.querySelector('.add-btn');
  addBtn.addEventListener('click', generateBox)

  function clearDiv() {
    const centerDiv = document.querySelector('.center-div');
    while (centerDiv.firstChild) {
      centerDiv.removeChild(centerDiv.firstChild);
    }
  }
  
  const clearButton = document.querySelector('.clear-button');
  clearButton.addEventListener('click', clearDiv);
  

  const removeBtn = document.querySelector('.remove-btn');
  removeBtn.addEventListener('click', () => {
    if (centerDiv.children.length > 0) {
      centerDiv.removeChild(centerDiv.lastChild);
    } else {
      alert("No boxes to remove");
    }
  })


  // move box


let selectedBox = null;

centerDiv.addEventListener('click', (event) => {
  if (event.target.classList.contains('box')) {
    if (selectedBox) {
      selectedBox.style.backgroundColor = 'yellow';
    }
    selectedBox = event.target;
    selectedBox.style.backgroundColor = 'red';
  }
});

document.addEventListener('keydown', (event) => {
  if (!selectedBox) {
    return;
  }
  const boxes = document.querySelectorAll('.box');
  const currentLeft = parseInt(selectedBox.style.left);
  const currentTop = parseInt(selectedBox.style.top);
  const width = parseInt(selectedBox.style.width);
  const height = parseInt(selectedBox.style.height);
  let newLeft = currentLeft;
  let newTop = currentTop;
  let canMove = true;
  switch (event.key) {
    case 'ArrowUp':
      newTop = currentTop - 10;
      if (newTop < 0) {
        newTop = 0;
      }
      break;
    case 'ArrowDown':
      newTop = currentTop + 10;
      if (newTop + height > 1000) {
        newTop = 1000 - height;
      }
      break;
    case 'ArrowLeft':
      newLeft = currentLeft - 10;
      if (newLeft < 0) {
        newLeft = 0;
      }
      break;
    case 'ArrowRight':
      newLeft = currentLeft + 10;
      if (newLeft + width > 1000) {
        newLeft = 1000 - width;
      }
      break;
    default:
      return;
  }
  boxes.forEach(box => {
    if (box !== selectedBox) {
      const boxLeft = parseInt(box.style.left);
      const boxTop = parseInt(box.style.top);
      const boxWidth = parseInt(box.style.width);
      const boxHeight = parseInt(box.style.height);
      if (newLeft < boxLeft + boxWidth &&
          newLeft + width > boxLeft &&
          newTop < boxTop + boxHeight &&
          newTop + height > boxTop) {
        canMove = false;
      }
    }
  });
  if (canMove) {
    selectedBox.style.left = newLeft + 'px';
    selectedBox.style.top = newTop + 'px';
  }
});

