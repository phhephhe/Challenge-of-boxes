// const centerDiv = document.querySelector('.center-div');

// function generateBox() {
//     const width = 50 + Math.floor(Math.random() * 200);
//     const height = 50 + Math.floor(Math.random() * 200);
//     let x = Math.floor(Math.random() * (1000 - width));
//     let y = Math.floor(Math.random() * (1000 - height));
  
//     const boxes = document.querySelectorAll('.box');
//     let overlap = false;
  
//     boxes.forEach(box => {
//       const boxLeft = parseInt(box.style.left);
//       const boxTop = parseInt(box.style.top);
//       const boxWidth = parseInt(box.style.width);
//       const boxHeight = parseInt(box.style.height);
  
//       if (x < boxLeft + boxWidth &&
//           x + width > boxLeft &&
//           y < boxTop + boxHeight &&
//           y + height > boxTop) {
//         overlap = true;
//       }
//     });
  
//     if (!overlap) {
//       const box = document.createElement('div');
//       box.classList.add('box');
//       box.style.width = width + 'px';
//       box.style.height = height + 'px';
//       box.style.left = x + 'px';
//       box.style.top = y + 'px';
  
//       centerDiv.appendChild(box);
//     } else {
//       let hasSpace = false;
//       for (let i = 0; i <= 1000 - width; i += 10) {
//         for (let j = 0; j <= 1000 - height; j += 10) {
//           overlap = false;
  
//           boxes.forEach(box => {
//             const boxLeft = parseInt(box.style.left);
//             const boxTop = parseInt(box.style.top);
//             const boxWidth = parseInt(box.style.width);
//             const boxHeight = parseInt(box.style.height);
  
//             if (i < boxLeft + boxWidth &&
//                 i + width > boxLeft &&
//                 j < boxTop + boxHeight &&
//                 j + height > boxTop) {
//               overlap = true;
//             }
//           });
  
//           if (!overlap) {
//             hasSpace = true;
//             x = i;
//             y = j;
//             break;
//           }
//         }
//         if (hasSpace) {
//           break;
//         }
//       }
//       if (!hasSpace) {
//         alert("Free space was not found!");
//       } else {
//         const box = document.createElement('div');
//         box.classList.add('box');
//         box.style.width = width + 'px';
//         box.style.height = height + 'px';
//         box.style.left = x + 'px';
//         box.style.top = y + 'px';
  
//         centerDiv.appendChild(box);
//       }
//     }
//   }

//   const addBtn = document.querySelector('.add-btn');
//   addBtn.addEventListener('click', generateBox)

//   function clearDiv() {
//     const centerDiv = document.querySelector('.center-div');
//     while (centerDiv.firstChild) {
//       centerDiv.removeChild(centerDiv.firstChild);
//     }
//   }
  
//   const clearButton = document.querySelector('.clear-button');
//   clearButton.addEventListener('click', clearDiv);
  

//   const removeBtn = document.querySelector('.remove-btn');
//   removeBtn.addEventListener('click', () => {
//     if (centerDiv.children.length > 0) {
//       centerDiv.removeChild(centerDiv.lastChild);
//     } else {
//       alert("No boxes to remove");
//     }
//   })

const container = document.querySelector(".container");
const addButton = document.querySelector("#add-button");

addButton.addEventListener("click", generateBox);

function generateBox() {
  // Generate random width and height for the box
  const width = 50 + Math.floor(Math.random() * 200);
  const height = 50 + Math.floor(Math.random() * 200);

  // Generate random left and top positions for the box
  let left = Math.floor(Math.random() * (container.offsetWidth - width));
  let top = Math.floor(Math.random() * (container.offsetHeight - height));

  // Check for overlap with existing boxes
  let isOverlapping = false;
  const boxes = document.querySelectorAll(".box");
  for (const box of boxes) {
    if (checkOverlap(left, top, width, height, box)) {
      isOverlapping = true;
      break;
    }
  }

  // If there's no overlap, create the box
  if (!isOverlapping) {
    const box = document.createElement("div");
    box.classList.add("box");
    box.style.width = `${width}px`;
    box.style.height = `${height}px`;
    box.style.left = `${left}px`;
    box.style.top = `${top}px`;
    container.appendChild(box);
    return;
  }

  // If there's overlap, check for any free spaces
  for (let i = 0; i < container.offsetWidth - width; i++) {
    for (let j = 0; j < container.offsetHeight - height; j++) {
      isOverlapping = false;
      for (const box of boxes) {
        if (checkOverlap(i, j, width, height, box)) {
          isOverlapping = true;
          break;
        }
      }
      if (!isOverlapping) {
        const box = document.createElement("div");
        box.classList.add("box");
        box.style.width = `${width}px`;
        box.style.height = `${height}px`;
        box.style.left = `${i}px`;
        box.style.top = `${j}px`;
        container.appendChild(box);
        return;
      }
    }
  }

  // If there's no free space, show an alert message
  alert("No more free space in the container.");
}

function checkOverlap(left1, top1, width1, height1, box2) {
  const left2 = parseInt(box2.style.left);
  const top2 = parseInt(box2.style.top);
  const width2 = box2.offsetWidth;
  const height2 = box2.offsetHeight;
  return (
    left1 < left2 + width2 &&
    left1 + width1 > left2 &&
    top1 < top2 + height2 &&
    top1 + height1 > top2
  );
}
