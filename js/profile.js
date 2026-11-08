const nameInput = document.getElementById("profile-name");
const saveButton = document.getElementById("profile-save");
const savedMessage = document.getElementById("profile-saved");
const squirrel = document.getElementById("squirrel");
const squirrelBubble = document.getElementById("squirrel-bubble");
const avatar = document.getElementById("avatar");
const avatarInput = document.getElementById("avatarInput");

// ----- name -----
nameInput.value = localStorage.getItem("mindbloom-name") || "";

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

saveButton.addEventListener("click", saveName);

nameInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    saveName();
  }
});

// ----- profile picture -----
avatar.src = localStorage.getItem("avatar") || "icons/default_profile.png";

avatarInput.addEventListener("change", function () {
  const file = avatarInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function () {
    const img = new Image();
    img.onload = function () {
      const size = 200;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");

      const min = Math.min(img.width, img.height);
      const sx = (img.width - min) / 2;
      const sy = (img.height - min) / 2;
      ctx.drawImage(img, sx, sy, min, min, 0, 0, size, size);

      const dataUrl = canvas.toDataURL("image/png");
      localStorage.setItem("avatar", dataUrl);
      avatar.src = dataUrl;
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
});