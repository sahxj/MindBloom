
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");
const chatFeed = document.getElementById("chat-feed");

let conversation = [];
let isWaiting = false;

function addMessage(text, sender) {
    const row = document.createElement("div");
    row.className = `message-row ${sender}`;

    if (sender === "bot") {
        const squirrel = document.createElement("img");
        squirrel.src = "squirrel.png";
        squirrel.alt = "Squirrel mascot";
        squirrel.className = "bot-squirrel";
        row.appendChild(squirrel);
    }

    const bubble = document.createElement("div");
    bubble.className = `bubble ${sender}-bubble`;
    bubble.textContent = text;

    row.appendChild(bubble);
    chatFeed.appendChild(row);

    chatFeed.scrollTop = chatFeed.scrollHeight;

    return row;
}

async function handleSendMessage() {
    const message = chatInput.value.trim();

    if (!message || isWaiting) return;

    isWaiting = true;
    sendBtn.disabled = true;

    chatInput.value = "";

    addMessage(message, "user");

    conversation.push({
        role: "user",
        text: message
    });

    const loadingRow = addMessage("Squirrel is thinking...", "bot");

    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                messages: conversation
            })
        });

        const responseText = await response.text();

        console.log("Server status:", response.status);
        console.log("Server response:", responseText);

        let data;

        try {
            data = JSON.parse(responseText);
        } catch {
            throw new Error("Server returned: " + responseText);
        }

        if (!response.ok) {
            throw new Error(data.error || "Something went wrong.");
        }

        loadingRow.querySelector(".bot-bubble").textContent = data.reply;

        conversation.push({
            role: "model",
            text: data.reply
        });

    } catch (error) {
        console.error(error);

        loadingRow.querySelector(".bot-bubble").textContent =
            error.message || "Sorry, I couldn't respond. Please try again.";

    } finally {
        isWaiting = false;
        sendBtn.disabled = false;
        chatInput.focus();
        chatFeed.scrollTop = chatFeed.scrollHeight;
    }
}

sendBtn.addEventListener("click", handleSendMessage);

chatInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        handleSendMessage();
    }
});
