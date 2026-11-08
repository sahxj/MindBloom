
console.log("MindBloom voice.js loaded!");

const recordBtn = document.getElementById("record-btn");
const stopBtn = document.getElementById("stop-btn");
const preview = document.getElementById("voice-preview");
const statusText = document.getElementById("recording-status");
const messageText = document.getElementById("voice-message");
const saveVoiceBtn = document.getElementById("save-voice-btn");

let recorder;
let chunks = [];
let stream;
let recordedAudio = null;
let previewURL = null;

// OPEN DATABASE
function openVoiceDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("MindBloomVoiceNotes", 1);

        request.onupgradeneeded = event => {
            const db = event.target.result;

            if (!db.objectStoreNames.contains("recordings")) {
                db.createObjectStore("recordings", {
                    keyPath: "id",
                    autoIncrement: true
                });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

// SAVE AUDIO AND RETURN ITS ID
async function saveVoiceNote(audio) {
    const db = await openVoiceDatabase();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction("recordings", "readwrite");
        const store = transaction.objectStore("recordings");
        const request = store.add({
            audio: audio,
            date: new Date().toLocaleString()
        });

        let savedId;

        request.onsuccess = () => {
            savedId = request.result;
        };

        transaction.oncomplete = () => {
            db.close();
            resolve(savedId);
        };

        transaction.onerror = () => {
            db.close();
            reject(transaction.error);
        };
    });
}

// GET AUDIO FOR A SAVED REFLECTION
async function getVoiceNoteBlob(id) {
    const db = await openVoiceDatabase();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction("recordings", "readonly");
        const request = transaction.objectStore("recordings").get(id);

        request.onsuccess = () => {
            const result = request.result;
            db.close();
            resolve(result ? result.audio : null);
        };

        request.onerror = () => {
            db.close();
            reject(request.error);
        };
    });
}

// START RECORDING
recordBtn.addEventListener("click", async () => {
    try {
        statusText.textContent = "Connecting to microphone...";
        messageText.textContent = "";

        if (!navigator.mediaDevices?.getUserMedia) {
            throw new Error(
                "Microphone unavailable. Check that you're using HTTPS or localhost."
            );
        }

        stream = await navigator.mediaDevices.getUserMedia({
            audio: true
        });

        chunks = [];
        recordedAudio = null;
        saveVoiceBtn.disabled = true;

        recorder = new MediaRecorder(stream);

        recorder.ondataavailable = event => {
            if (event.data.size > 0) {
                chunks.push(event.data);
            }
        };

        recorder.onstop = () => {
            recordedAudio = new Blob(chunks, {
                type: recorder.mimeType || "audio/webm"
            });

            stream.getTracks().forEach(track => track.stop());
            stream = null;

            if (!recordedAudio.size) {
                messageText.textContent = "No audio was captured.";
                return;
            }

            if (previewURL) {
                URL.revokeObjectURL(previewURL);
            }

            previewURL = URL.createObjectURL(recordedAudio);
            preview.src = previewURL;
            preview.hidden = false;

            saveVoiceBtn.disabled = false;
            statusText.textContent = "Recording complete!";
            messageText.textContent = "Preview your recording, then save it.";
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

        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            stream = null;
        }

        recordBtn.disabled = false;
        stopBtn.disabled = true;
    }
});

// STOP RECORDING
stopBtn.addEventListener("click", () => {
    if (recorder && recorder.state === "recording") {
        recorder.stop();
        recordBtn.disabled = false;
        stopBtn.disabled = true;
    }
});

// SAVE INTO SAVED REFLECTIONS
saveVoiceBtn.addEventListener("click", async () => {
    if (!recordedAudio) {
        messageText.textContent = "Record something before saving.";
        return;
    }

    try {
        saveVoiceBtn.disabled = true;
        messageText.textContent = "Saving voice note...";

        const audioId = await saveVoiceNote(recordedAudio);

        const entries = JSON.parse(
            localStorage.getItem("journalEntries") || "[]"
        );

        entries.unshift({
            text: "",
            date: new Date().toLocaleString(),
            audioId: audioId,
            type: "voice"
        });

        localStorage.setItem("journalEntries", JSON.stringify(entries));

        // UPDATE JOURNAL STATS
        const progressData = JSON.parse(
            localStorage.getItem("mindbloom-progress") || "{}"
        );

        if (!progressData.stats) {
            progressData.stats = {
                breaths: 0,
                journals: 0,
                moods: 0,
                music: 0
            };
        }

        progressData.stats.journals = (progressData.stats.journals || 0) + 1;

        localStorage.setItem(
            "mindbloom-progress",
            JSON.stringify(progressData)
        );

        // WATER THE TREE
        let buckets = parseInt(
            localStorage.getItem("mindbloom_buckets_logged") || "0",
            10
        );

        buckets += 1;

        localStorage.setItem("mindbloom_buckets_logged", buckets);
        localStorage.setItem("showWaterDrops", "true");

        // UPDATE ACHIEVEMENTS
        if (typeof checkAchievements === "function") {
            checkAchievements();
        }

        // Update the saved reflections count
        updateSavedCount();

        messageText.textContent = "Voice note saved to your reflections! 🌱";
        statusText.textContent = "Your voice note is saved!";

        recordedAudio = null;
        preview.pause();
        preview.removeAttribute("src");
        preview.hidden = true;

        if (previewURL) {
            URL.revokeObjectURL(previewURL);
            previewURL = null;
        }

    } catch (error) {
        console.error("Voice note save failed:", error);
        messageText.textContent = "Could not save your voice note.";
        saveVoiceBtn.disabled = false;
    }
});
