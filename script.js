const input = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const chat = document.querySelector(".chat");

async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    const userDiv = document.createElement("div");
    userDiv.textContent = text;
    userDiv.style.textAlign = "right";
    userDiv.style.margin = "10px";
    chat.appendChild(userDiv);
    input.value = "";

    try {
        const response = await fetch("https://houndlerii.huyguybbb.workers.dev", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: text })
        });
        
        const rawText = await response.text();
        
        const botDiv = document.createElement("div");
        botDiv.style.textAlign = "left";
        botDiv.style.margin = "10px";
        botDiv.style.color = "red";
        botDiv.textContent = "Ответ сервера: " + rawText;
        chat.appendChild(botDiv);
        
    } catch (e) {
        const errDiv = document.createElement("div");
        errDiv.textContent = "Ошибка сети: " + e.message;
        chat.appendChild(errDiv);
    }
}

sendButton.addEventListener("click", sendMessage);
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
});