const express= require("express");
const router= express.Router();
var { MongoClient } = require("mongodb");
var client = new MongoClient("mongodb://localhost:27017");

router.post("/getChatHistoryFromDB", async (req, res) => {

    const { roomId } = req.body;

    const db = client.db("flipkart");
    const collection = db.collection("chat_messages");

    const messages = await collection
        .find({ roomId })
        .sort({ timestamp: 1 })
        .toArray();

    res.send(messages);
});

module.exports=router;