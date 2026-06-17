const socket = io();

function sendMessage() {
    const messageInput = document.getElementById("messageInput");
    const message = messageInput.value;

    socket.emit("sendMessage", {
        sender: "customer",
        message: message
    });

    messageInput.value = "";
}

// Receive messages
socket.on("receiveMessage", (data) => {
    const chatBox = document.getElementById("chatBox");

    const div = document.createElement("div");
    div.innerText = data.sender + ": " + data.message;

    chatBox.appendChild(div);
});