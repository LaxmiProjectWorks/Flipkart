var express = require("express");
var router = express.Router();
var { MongoClient } = require("mongodb");
const multer = require("multer");

// ✅ Mongo client
var client = new MongoClient("mongodb://localhost:27017/");

// ✅ Multer config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/newProductUploadImages"); // make sure folder exists
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

// ✅ Auto incrementing ID function
async function getNextSequence(db, name) {
    const result = await db.collection("counters").findOneAndUpdate(
        { _id: name },
        { $inc: { sequence_value: 1 } },
        { returnDocument: "after", upsert: true }
    );

    console.log("Counter result:", result);

    return result.sequence_value;
}

router.post("/addProducts", upload.single("image"), async (req, res) => {

    try {
        await client.connect();
        var db = client.db("flipkart");

        const newId = await getNextSequence(db, "productId");

        const productData = {
            id: newId,
            title: req.body.title,

            price: parseInt(req.body.price),

            category: (req.body.category).toLowerCase(),

            description: req.body.description,

            //change imagePath → image
            image: req.file ? `http://localhost:3000/newProductUploadImages/${req.file.filename}` : null,

            rating: {
                rate: parseInt(req.body.rating),   
                count: 0   
            }
        };
console.log("Printing filename: ",req.file.filename);
        const result = await db.collection("product_details").insertOne(productData);

        if (result.acknowledged) {
            res.send("Success");
        } else {
            res.send("Fail");
        }

    } catch (err) {
        console.error(err);
        res.status(500).send("Error inserting product");
    }
});

module.exports = router;
