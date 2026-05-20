// var express = require("express");
// var router = express.Router();
// var {MongoClient}=require("mongodb");
// var client= new MongoClient("mongodb://localhost:27017/");

// const multer = require("multer");

// // ✅ Multer config here
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "newProductUploadImages/");
//     },
//     filename: function (req, file, cb) {
//         const uniqueName = Date.now() + "-" + file.originalname;
//         cb(null, uniqueName);
//     }
// });

// const upload = multer({ storage: storage });


// const db = req.app.locals.db; // assuming you stored DB connection here

// const newId = await getNextSequence(db, "productId");


// //✅ Route with multer
// router.post("/addProduct", upload.single("image"),async (req, res) => {

//     const productData = {
//         id:newId,
//         title: req.body.title,
//         price: req.body.price,
//         category: req.body.category,
//         rating: req.body.rating,
//         description: req.body.description,
//         imagePath: req.file.path
//     };

//     newProductsInsertionIntoDB(productData).then((result)=>{
        
//     })
// });

// async function newProductsInsertionIntoDB(productData){
//     await client.connect();

//     const newId = await getNextSequence(db, "productId");
//     productData.id=newId;
//     var db= client.db("flipkart");
//     var collection= db.collection("product_details");
//     var result= await collection.insertOne(productData);
//     console.log("newProductsInsertionIntoDB response: ",result);
// }


// async function getNextSequence(db, name) {
//     const result = await db.collection("counters").findOneAndUpdate(
//         { _id: name },
//         { $inc: { sequence_value: 1 } },
//         { returnDocument: "after" }
//     );

//     return result.value.sequence_value;
// }


// module.exports = router;


//Co-pilot code
var express = require("express");
var router = express.Router();
var { MongoClient } = require("mongodb");

const multer = require("multer");

// ✅ Mongo client
var client = new MongoClient("mongodb://localhost:27017/");

// ✅ Multer config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "newProductUploadImages/"); // make sure folder exists
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

// ✅ Auto increment function
async function getNextSequence(db, name) {
    const result = await db.collection("counters").findOneAndUpdate(
        { _id: name },
        { $inc: { sequence_value: 1 } },
        { returnDocument: "after", upsert: true }
    );

    console.log("Counter result:", result);

    return result.sequence_value;
}



// ✅ Route
router.post("/addProducts", upload.single("image"), async (req, res) => {

    try {
        await client.connect();
        var db = client.db("flipkart");

        const newId = await getNextSequence(db, "productId");

        const productData = {
            id: newId,
            title: req.body.title,

            // ✅ convert to number
            price: parseInt(req.body.price),

            category: (req.body.category).toLowerCase(),

            description: req.body.description,

            // ✅ FIX: change imagePath → image
            image: req.file ? `http://localhost:3000/${req.file.path}` : null,

            // ✅ FIX: proper rating structure
            rating: {
                rate: parseInt(req.body.rating),   // number
                count: 0   // default value
            }
        };

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
