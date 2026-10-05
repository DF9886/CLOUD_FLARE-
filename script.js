const input = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const chat = document.querySelector(".chat");

function sendMessage() {
    const message = input.value.trim();

    if (!message) {
        return;
    }

    const welcome = document.querySelector(".welcome");

    if (welcome) {
        welcome.remove();
    }

    const messageElement = document.createElement("div");

    messageElement.style.maxWidth = "800px";
    messageElement.style.width = "100%";
    messageElement.style.padding = "20px";

    messageElement.innerHTML = `
        <strong>Вы:</strong>
        <p>${message}</p>
    `;

    chat.appendChild(messageElement);

    input.value = "";
}

sendButton.addEventListener("click", sendMessage);

input.addEventListener("keydown", function(event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
});