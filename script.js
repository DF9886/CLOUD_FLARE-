const input = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const chat = document.querySelector(".chat");

// Функция добавления сообщения на экран
function addMessage(text, type) {
    const message = document.createElement("div");
    message.style.width = "100%";
    message.style.maxWidth = "800px";
    message.style.margin = "0 auto 18px";
    message.style.display = "flex";
    message.style.justifyContent = type === "user" ? "flex-end" : "flex-start";

    const bubble = document.createElement("div");
    bubble.textContent = text;
    bubble.style.maxWidth = "80%";
    bubble.style.padding = "12px 16px";
    bubble.style.borderRadius = "18px";
    bubble.style.fontSize = "16px";
    bubble.style.lineHeight = "1.5";

    if (type === "user") {
        bubble.style.background = "#222";
        bubble.style.color = "#fff";
    } else {
        bubble.style.background = "#f1f1f1";
        bubble.style.color = "#222";
    }

    message.appendChild(bubble);
    chat.appendChild(message);
    chat.scrollTop = chat.scrollHeight; // Прокрутка вниз
}

// Функция отправки сообщения
async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user"); // Показываем сообщение пользователя
    input.value = ""; // Очищаем поле ввода

    // Показываем, что бот "печатает"
    addMessage("Печатает...", "ai");

    try {
        // Отправляем запрос на твой Cloudflare Worker
        const response = await fetch('https://houndlerii.huyguybbb.workers.dev', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text })
        });

        const data = await response.json();

        // Удаляем сообщение "Печатает..."
        chat.removeChild(chat.lastChild);

        if (data.reply) {
            addMessage(data.reply, "ai");
        } else if (data.error) {
            addMessage("Ошибка: " + data.error, "ai");
        } else {
            addMessage("Не удалось получить ответ.", "ai");
        }

    } catch (error) {
        chat.removeChild(chat.lastChild);
        addMessage("Ошибка сети: проверьте соединение.", "ai");
    }
}

// Обработчики событий
sendButton.addEventListener("click", sendMessage);
input.addEventListener("keydown", function(event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
});