//------------ Light/Dark colour scheme changer (all pages) -----------

function changeColourScheme() {
    const body = document.body;
    const leftcolumn = document.getElementById("leftcolumn");
    const rightcolumn = document.getElementById("rightcolumn");
    const notesContent = document.getElementById("foo");
    body.classList.toggle("body-dark");
    leftcolumn.classList.toggle("card-dark");
    rightcolumn.classList.toggle("card-dark");
    notesContent.classList.toggle("notesContent-dark");

  }

//---------- Edit/Save Recipe components (for editRecipe page) -----------
  
// add new input box to ingredient or instruction
function addInputBox(boxName) {
  let newBox = document.createElement('div');
  newBox.classList.add('item-list');

  let closeButton = '<a href="javascript:void(0)" onclick="this.parentNode.remove();"><div>X</div></a>';

  if (boxName==='ingredient') {
    newBox.innerHTML = `
        <input type="text" name="${boxName}[]">
        ${closeButton}
      `;
  } else if (boxName==='instruction') {
    newBox.innerHTML = `
        <textarea name="${boxName}[]"></textarea>
        ${closeButton}
      `;
  }

  let container = document.getElementById(boxName+'-group');
  container.appendChild(newBox);
}

// submit recipe form
const recipeForm = document.getElementById('submit-recipe-form');
function submitRecipeForm() {
  recipeForm.submit();
}

// submit image form
const imageForm = document.getElementById('submit-image-form');
const recipeImageInput = document.getElementById('recipeImageInput');
async function submitImageForm() {
  if (recipeImageInput.files.length === 0) {
      alert('Please select an image.');
  } else {
    const imageFormData = new FormData(imageForm);
    console.log(imageFormData);
    const response = await fetch('/recipe/upload-image', {
      method: 'POST',
      body: imageFormData
    });

    const result = await response.json();

    if (result) {
      recipeImageInput.disabled = true;
      document.getElementById('upload-image-btn').remove();
      alert (result.message);
    }
  }
}

//----------  Loading notes modal (for personalRecipe page) ----------

//source: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal 

// Get the modal
var modal = document.getElementById("notesModal");
        
// Get the button that opens the modal
var btn = document.getElementById("notesButton");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}