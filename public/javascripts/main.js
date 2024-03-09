
let maxScreenMode = 2;

//------------ Light/Dark colour scheme changer (all pages) -----------

// -- Old color changing code --
// const body = document.body;
// const leftcolumn = document.getElementById("leftcolumn");
// const rightcolumn = document.getElementById("rightcolumn");
// const notesContent = document.getElementById("foo");
// body.classList.toggle("body-dark");
// leftcolumn.classList.toggle("card-dark");
// rightcolumn.classList.toggle("card-dark");
// notesContent.classList.toggle("notesContent-dark");
// -- End of old color changing code --

function changeColourScheme(scheme=0) {
  const body = document.body;
  const leftcolumn = document.getElementById("leftcolumn");
  const rightcolumn = document.getElementById("rightcolumn");
  const notesContent = document.getElementById("foo");

  if (scheme==0) {
    body.style.backgroundColor = "#ffffff";
    body.style.color = "#070707";
    leftcolumn.style.backgroundColor = "#f5f3f4";
    leftcolumn.style.color = "#070707";
    rightcolumn.style.backgroundColor = "#f5f3f4";
    rightcolumn.style.color = "#070707";
    notesContent.style.backgroundColor = "#f5f3f4";
    notesContent.style.color = "#070707";
  } else if (scheme==1) {
    body.style.backgroundColor = "#060709";
    body.style.color = "#ffffff";
    leftcolumn.style.backgroundColor = "#101a23";
    leftcolumn.style.color = "#ffffff";
    rightcolumn.style.backgroundColor = "#101a23";
    rightcolumn.style.color = "#ffffff";
    notesContent.style.backgroundColor = "#101a23";
    notesContent.style.color = "#ffffff";
  } else {
    // if the scheme value is something else, just in case bad thing happen
    body.style.backgroundColor = "#ffffff";
    body.style.color = "#070707";
    leftcolumn.style.backgroundColor = "#f5f3f4";
    leftcolumn.style.color = "#070707";
    rightcolumn.style.backgroundColor = "#f5f3f4";
    rightcolumn.style.color = "#070707";
    notesContent.style.backgroundColor = "#f5f3f4";
    notesContent.style.color = "#070707";
  }
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

// Prompt user for delete recipe confirmation
function promptBeforeDeleteRecipe(recipeId) {
  console.log( 'recipeid : '+recipeId);
  const promptDelete = window.confirm("Are you sure you want to delete the recipe?");
  if (promptDelete) {
    deleteRecipe(recipeId);
  }
}

// To delete recipe
async function deleteRecipe(recipeId) {
	try {
		const requestData = {"recipeId": recipeId};
		await fetch('/recipe/delete-recipe', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(requestData)
		});
		location.reload();
	} catch (error) {
		console.error('Error changing article status:', error);
	}
}

// submit image form
const imageForm = document.getElementById('submit-image-form');
const recipeImageInput = document.getElementById('recipeImageInput');
async function submitImageForm() {
  if (recipeImageInput.files.length === 0) {
      alert('Please select an image.');
  } else {
    const imageFormData = new FormData(imageForm);
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


// For Changing Screen Mode 
let changeScreenModeElement;
document.addEventListener('DOMContentLoaded', function() {
  changeScreenModeElement = document.getElementById('changeScreenMode');
  changeColourScheme(changeScreenModeElement.value);
});

async function changeScreenMode() {
	try {
    const newScreenMode = parseInt(changeScreenModeElement.value) + 1;
    let requestData={};

    if (newScreenMode >= maxScreenMode) {
      requestData = {screenMode: 0};
    } else {
      requestData = {screenMode: newScreenMode};
    }

		await fetch('/user/save-screen-mode', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(requestData)
		});
    location.reload();
  } catch (error) {
		console.error('Error saving screen mode to DB:', error);
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