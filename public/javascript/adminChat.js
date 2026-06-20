// ✅ listen for live updates
socket.on("updateUserList", (usersList) => {

    console.log("Live users:", usersList);

    renderUsers(usersList);

    // update count
    const count = document.querySelector(".userCount");
    if (count) {
        count.innerText = usersList.length + " Users";
    }
});

let selectedUser = null;

function renderUsers(users) {

    const container = document.querySelector(".userList");
    container.innerHTML = "";

    users.forEach(user => {

        const div = document.createElement("div");
        div.className = "userItem";

        const initial = user.name.charAt(0);

        div.innerHTML = `
            <div class="avatar">${initial}</div>
            <div class="userText">
                <div class="userName">${user.name}</div>
                <div class="lastMsg">Click to start chat</div>
            </div>
        `;

        div.onclick = () => selectUser(user, div);

        container.appendChild(div);
    });
}


function selectUser(user, element) {

    selectedUser = user;

    // ✅ JOIN USER ROOM
    const roomId = "chat_" + user.name;
    socket.emit("joinRoom", roomId);

    // ✅ SWITCH VIEW
    document.getElementById("userListView").classList.remove("activeView");
    document.getElementById("chatView").classList.add("activeView");

    document.getElementById("chatUserName").innerText = user.name;

    document.getElementById("chatBox").innerHTML = "";
}

function sendAdminMessage() {

    const input = document.getElementById("messageInput");
    const message = input.value.trim();

    if (!message) return;

    let roomId;

    if (userId === "Admin") {
        if (!selectedUser) {
            alert("Select a user");
            return;
        }
        roomId = "chat_" + selectedUser.name;
    } else {
        roomId = "chat_" + userId;
    }

    socket.emit("sendMessage", {
        roomId: roomId,
        sender: userId,
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





