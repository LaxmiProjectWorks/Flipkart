var express = require('express');
var router = express.Router();
var { MongoClient } = require("mongodb");
var client = new MongoClient("mongodb://localhost:27017/");

router.get("/getAllChatUsers", async (req, res) => {

    const db = client.db("flipkart");

    const users = await db.collection("chat_messages").aggregate([
        {
            $match: {
                senderId: { $ne: "admin@gmail.com" }
            }
        },
        {
            $sort: { _id: -1 }   // ✅ FIX HERE ✅
        },
        {
            $group: {
                _id: "$senderId",
                name: { $first: "$senderName" },
                emailID: { $first: "$senderId" },
                lastMessage: { $first: "$message" }
            }
        }
    ]).toArray();


    res.send(users);

});

module.exports = router;