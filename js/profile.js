
const squirrel = document.getElementById("squirrel");
const squirrelBubble = document.getElementById("squirrel-bubble");

function squirrelSays(text) {
    if (!squirrel || !squirrelBubble) return;

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

// SAVE BUTTON
saveButton.addEventListener("click", saveName);

// ENTER KEY
nameInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        saveName();
    }
});

// SHOW PROFILE/SQUIRREL WHEN HOMEPAGE LOADS
document.addEventListener("DOMContentLoaded", function () {
    const savedName = localStorage.getItem("mindbloom-name");

    if (savedName) {
        nameInput.value = savedName;
        squirrelSays("Welcome back, " + savedName + "! 🌰");
    } else {
        squirrelSays("Hi there! 🌱 What's your name?");
    }
});
