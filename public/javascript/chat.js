const socket = io();

let userId = "";
let roomId = "";

// ✅ ✅ ADD THIS HERE ✅ ✅
socket.on("connect", () => {
    console.log("Socket connected/reconnected:", socket.id);

    if (userId) {
        socket.emit("userOnline", {
            id: userId,
            name: userId
        });
    }
});

// ✅ existing listener
socket.off("receiveMessage");

socket.on("receiveMessage", (data) => {
    const chatBox = document.getElementById("chatBox");

    if (!chatBox) return;

    const div = document.createElement("div");

    if (data.sender === userId) {
        div.classList.add("myMessage");
    } else {
        div.classList.add("otherMessage");
    }

    div.innerText = data.message;
    chatBox.appendChild(div);

    chatBox.scrollTop = chatBox.scrollHeight;
});

// function getLoggedinUserName() {
//     axios.post("/getLoggedinUsername/getUserName")
//         .then(function (response) {

//             if (!socket.connected) {
//                 socket.connect();   // ✅ reconnect socket
//             }

//             console.log("Socket connected?", socket.connected);
//             if (!response.data || !response.data.username) {
//                 console.error("Invalid response from server");
//                 return;
//             }

//             userId = response.data.username;

//             // ✅ Defensive check
//             if (userId === "invalidUser") {
//                 alert("Session expired. Please login again.");
//                 return;
//             }

//             console.log("User:", userId);


//             // ✅ ✅ ✅ ADD THIS HERE (VERY IMPORTANT)
//             socket.emit("userOnline", {
//                 id: userId,
//                 name: userId
//             });
//             // ✅ ✅ ✅ END


//             if (userId === "Admin") {
//                 // admin will NOT use prompt anymore
//                 console.log("Admin ready to receive chats");
//             } else {
//                 // ✅ USER always connects to own room
//                 roomId = "chat_" + userId;

//                 socket.emit("joinRoom", roomId);
//             }

//         })
//         .catch(err => {
//             console.error("Error fetching username:", err);
//         });
// }

function getLoggedinUserName() {
    axios.post("/getLoggedinUsername/getUserName")
        .then(function (response) {

            userId = response.data.username;

            if (userId === "invalidUser") return;

            console.log("User:", userId);

            // ✅ reconnect if needed
            if (!socket.connected) {
                socket.connect();
            }

            // ✅ notify server
            socket.emit("userOnline", {
                id: userId,
                name: userId
            });

            // ✅ ✅ IMPORTANT: JOIN ROOM AGAIN
            if (userId !== "Admin") {
                roomId = "chat_" + userId;
                socket.emit("joinRoom", roomId);
            }

        });
}



function sendUserMessage() {
    const messageInput = document.getElementById("messageInput");
    if (!messageInput) return;

    const message = messageInput.value.trim();
    if (!message) return;

    let sendRoom;

    if (userId === "Admin") {
        if (!selectedUser) {
            alert("Select a user");
            return;
        }
        sendRoom = "chat_" + selectedUser.name;
    } else {
        sendRoom = "chat_" + userId;
    }

    socket.emit("sendMessage", {
        roomId: sendRoom,
        sender: userId,
        message: message
    });

    messageInput.value = "";
}

// // ✅ Receive messages
// socket.on("receiveMessage", (data) => {
//     const chatBox = document.getElementById("chatBox");

//     const div = document.createElement("div");

//     // ✅ Identify message type
//     if (data.sender === userId) {
//         div.classList.add("myMessage");
//     } else {
//         div.classList.add("otherMessage");
//     }

//     div.innerText = data.message;

//     chatBox.appendChild(div);

//     // ✅ Auto scroll
//     chatBox.scrollTop = chatBox.scrollHeight;
// });
