const squirrel = document.getElementById("squirrel");
const squirrelBubble = document.getElementById("squirrel-bubble");

function squirrelSays(text) {
  squirrelBubble.textContent = text;
  squirrel.classList.remove("hidden");
}

function saveName() {
  const name = nameInput.value.trim();
  localStorage.setItem("mindbloom-name", name);
  savedMessage.textContent = "Saved ✓";

  if (name !== "") {
    squirrelSays("Hi, " + name + "! 🌰 Nice to meet you.");
  }
}

// Clicking the Save button
saveButton.addEventListener("click", saveName);

// Pressing Enter inside the name box
nameInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    saveName();
  }
});