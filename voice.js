
console.log("MindBloom voice.js loaded!");

const recordBtn = document.getElementById("record-btn");
const stopBtn = document.getElementById("stop-btn");
const preview = document.getElementById("voice-preview");
const statusText = document.getElementById("recording-status");
const messageText = document.getElementById("voice-message");

console.log("Record button:", recordBtn);

let recorder;
let chunks = [];
let stream;

recordBtn.addEventListener("click", async () => {
    console.log("Record button clicked!");

    try {
        statusText.textContent = "Connecting to microphone...";

        stream = await navigator.mediaDevices.getUserMedia({
            audio: true
        });

        console.log("Microphone connected!");

        chunks = [];

        recorder = new MediaRecorder(stream);

        recorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                chunks.push(event.data);
            }
        };

        recorder.onstop = () => {
            const audio = new Blob(chunks, {
                type: recorder.mimeType
            });

            console.log("Audio size:", audio.size);

            if (audio.size === 0) {
                messageText.textContent = "No audio was captured.";
                return;
            }

            preview.src = URL.createObjectURL(audio);
            preview.hidden = false;

            statusText.textContent = "Recording complete!";
            messageText.textContent = "Your recording is ready.";

            stream.getTracks().forEach(track => track.stop());
        };

        recorder.start(250);

        recordBtn.disabled = true;
        stopBtn.disabled = false;

        statusText.textContent = "Recording...";
        messageText.textContent = "Microphone is active!";

    } catch (error) {
        console.error(error);

        statusText.textContent = "Recording failed.";
        messageText.textContent = error.message;
    }
});

stopBtn.addEventListener("click", () => {
    if (recorder && recorder.state === "recording") {
        recorder.stop();

        recordBtn.disabled = false;
        stopBtn.disabled = true;
    }
});
