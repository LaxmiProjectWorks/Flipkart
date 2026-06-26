const socket = io();

let userId = "";
let userEmail = "";
let roomId = "";

socket.on("connect", () => {

    console.log("Socket connected:", socket.id);

    if (userEmail && !socket.hasJoinedRoom) {

        socket.emit("userOnline", {
            id: userEmail,
            name: userId,
            emailID: userEmail
        });

        // const room = "chat_" + userEmail;

        // socket.emit("joinRoom", room);

        // console.log("Rejoined room:", room);


        socket.emit("joinRoom", "chat_" + userEmail);
        socket.hasJoinedRoom = true;

        console.log("Rejoined room once");

    }
});

let lastMessageKey = "";

if (!socket.hasReceiveListener) {

    socket.on("receiveMessage", (data) => {

        console.log("🔥 Incoming:", data);

        const chatBox = document.getElementById("chatBox");
        if (!chatBox) return;

        // ✅ ONLY SHOW CURRENT CHAT MESSAGES
        if (selectedUser) {

            const isCurrentChat =
                (data.senderId === selectedUser.emailID && userEmail === data.receiverId) ||
                (data.senderId === userEmail && data.receiverId === selectedUser.emailID);

            if (!isCurrentChat) return;
        }


        // ✅ DEDUPLICATION
        const messageKey = data.senderId + "_" + data.message;

        if (lastMessageKey === messageKey) {
            console.log("⚠️ Skipping duplicate");
            return;
        }

        lastMessageKey = messageKey;

        // ✅ RENDER MESSAGE
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
                if (!socket.hasJoinedRoom) {
                    socket.emit("joinRoom", roomId);
                    socket.hasJoinedRoom = true;
                }
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
