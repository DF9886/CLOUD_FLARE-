const input = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const chat = document.querySelector(".chat");

function addMessage(text, type) {
    const message = document.createElement("div");

    message.style.width = "100%";
    message.style.maxWidth = "800px";
    message.style.margin = "0 auto 18px";
    message.style.display = "flex";
    message.style.justifyContent =
        type === "user" ? "flex-end" : "flex-start";

    const bubble = document.createElement("div");

    bubble.textContent = text;

    bubble.style.maxWidth = "80%";
    bubble.style.padding = "12px 16px";
    bubble.style.borderRadius = "16px";
    bubble.style.lineHeight = "1.5";
    bubble.style.whiteSpace = "pre-wrap";

    if (type === "user") {
        bubble.style.background = "#222";
        bubble.style.color = "white";
        bubble.style.borderBottomRightRadius = "5px";
    } else {
        bubble.style.background = "#f1f1f1";
        bubble.style.color = "#222";
        bubble.style.borderBottomLeftRadius = "5px";
    }

    message.appendChild(bubble);
    chat.appendChild(message);

    chat.scrollTop = chat.scrollHeight;
}

function sendMessage() {
    const message = input.value.trim();

    if (!message) {
        return;
    }

    const welcome = document.querySelector(".welcome");

    if (welcome) {
        welcome.remove();
    }

    addMessage(message, "user");

    input.value = "";

    // Временно показываем ответ-заглушку.
    // Настоящий ИИ подключим позже через Cloudflare.
    setTimeout(function() {
        addMessage(
            "Я пока не подключён к настоящему ИИ. Следующим этапом мы подключим Cloudflare Worker и AI API.",
            "ai"
        );
    }, 500);
}

sendButton.addEventListener("click", sendMessage);

input.addEventListener("keydown", function(event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
});