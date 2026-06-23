let selectedUser = null;

// ✅ render users (IMPORTANT: use emailID)
function renderUsers(users) {

    const container = document.querySelector(".userList");
    container.innerHTML = "";

    users.forEach(user => {

        const div = document.createElement("div");
        div.className = "userItem";

        // ✅ FIX DATA MAPPING
        const email = user.emailID || user._id;
        const name = user.name || user.senderName;

        div.dataset.email = email;

        const initial = name.charAt(0);

        div.innerHTML = `
            <div class="avatar">${initial}</div>
            <div class="userText">
                <div class="userName">${name}</div>
                <div class="lastMsg">${user.lastMessage || "Click to start chat"}</div>
            </div>
        `;

        div.onclick = () => selectUser({ emailID: email, name: name });

        container.appendChild(div);
    });
}

function selectUser(user) {

    selectedUser = user;

    // ✅ ✅ USE EMAIL (CRITICAL FIX)
    const roomId = "chat_" + user.emailID;
    socket.emit("joinRoom", roomId);

    // ✅ LOAD HISTORY
    loadChatHistory(roomId);

    document.getElementById("userListView").classList.remove("activeView");
    document.getElementById("chatView").classList.add("activeView");

    document.getElementById("chatUserName").innerText = user.name;

    document.getElementById("chatBox").innerHTML = "";
}

function sendAdminMessage() {

    const input = document.getElementById("messageInput");
    const message = input.value.trim();

    if (!message) return;

    if (!selectedUser) {
        alert("Select a user");
        return;
    }

    // ✅ ✅ USE EMAIL HERE ALSO
    const roomId = "chat_" + selectedUser.emailID;

    socket.emit("sendMessage", {
        roomId: roomId,
        senderId: userEmail,   // ✅ FIXED
        senderName: userId,
        receiverId: selectedUser.emailID,
        message: message
    });

    input.value = "";
}
function fakeReply() {
    setTimeout(() => {
        const div = document.createElement("div");
        div.className = "otherMessage";
        div.innerText = "Reply from " + selectedUser.name;

        document.getElementById("chatBox").appendChild(div);
    }, 1000);
}

function goBack() {

    selectedUser = null;

    document.getElementById("chatView").classList.remove("activeView");
    document.getElementById("userListView").classList.add("activeView");
}
function initAdminChat() {

    console.log("✅ Admin chat initialized");

    loadAllChatUsers();  // ✅ ADD THIS

    socket.on("updateUserList", (onlineUsers) => {

    document.querySelectorAll(".userItem").forEach(item => {

        const email = item.dataset.email;

        const isOnline = onlineUsers.some(u => u.emailID === email);

        item.classList.toggle("online", isOnline);
    });
});
}

function loadAllChatUsers() {

    axios.get("/getAllChatUsersFromDB/getAllChatUsers")
        .then(res => {

            console.log("DB users:", res.data);

            renderUsers(res.data);  // ✅ SAME FUNCTION
        })
        .catch(err => console.log(err));
}

