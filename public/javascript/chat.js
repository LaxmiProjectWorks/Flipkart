const socket = io();

let userId = "";
let userEmail = "";   
let roomId = "";

socket.on("connect", () => {

    console.log("Socket connected:", socket.id);

    if (userEmail) {

        socket.emit("userOnline", {
            id: userEmail,
            name: userId,
            emailID: userEmail
        });

        const room = "chat_" + userEmail;

        socket.emit("joinRoom", room);

        console.log("Rejoined room:", room);
    }
});

if (!socket.hasReceiveListener) {

    socket.on("receiveMessage", (data) => {

        const chatBox = document.getElementById("chatBox");
        if (!chatBox) {
            console.warn("chatBox not ready");
            return;
        }

        console.log("Message received:", data);

        const div = document.createElement("div");

        if (data.senderId === userEmail) {
            div.classList.add("myMessage");
        } else {
            div.classList.add("otherMessage");
        }

        div.innerText = data.message;
        chatBox.appendChild(div);

        chatBox.scrollTop = chatBox.scrollHeight;
    });

    socket.hasReceiveListener = true;   
}

function getLoggedinUserName() {

    axios.post("/getLoggedinUsername/getUserName")
        .then(function (response) {

            if (response.data.name === "invalidUser") return;

            userId = response.data.name;
            userEmail = response.data.emailID;

            console.log("User fetched:", userId, userEmail);

            if (!socket.connected) {
                socket.connect();
            }

            setTimeout(() => {

                console.log("Emitting userOnline NOW");

                socket.emit("userOnline", {
                    id: userEmail,
                    name: userId,
                    emailID: userEmail
                });
               
                roomId = "chat_" + userEmail;
                socket.emit("joinRoom", roomId);
                loadChatHistory(roomId);

                console.log("Joined own room:", roomId);

            }, 200);
        });
}

function sendUserMessage() {
    const messageInput = document.getElementById("messageInput");
    if (!messageInput) return;

    const message = messageInput.value.trim();
    if (!message) return;

    let sendRoom;

    if (userEmail === "admin@gmail.com") {

        if (!selectedUser) {
            alert("Select a user");
            return;
        }

        sendRoom = "chat_" + selectedUser.emailID;   

    } else {

        sendRoom = "chat_" + userEmail;   
    }

    socket.emit("sendMessage", {
        roomId: sendRoom,
        senderId: userEmail,             
        senderName: userId,              
        receiverId: selectedUser ? selectedUser.emailID : "admin",
        message: message
    });

    messageInput.value = "";
}

function loadChatHistory(roomId) {

    axios.post("/getChatHistory/getChatHistoryFromDB", { roomId })
        .then((response) => {

            const chatBox = document.getElementById("chatBox");
            if (!chatBox) return;

            chatBox.innerHTML = ""; // clear old

            response.data.forEach(msg => {

                const div = document.createElement("div");

                if (msg.senderId === userEmail) {
                    div.classList.add("myMessage");
                } else {
                    div.classList.add("otherMessage");
                }

                div.innerText = msg.message;
                chatBox.appendChild(div);
            });

            chatBox.scrollTop = chatBox.scrollHeight;

        });
}
