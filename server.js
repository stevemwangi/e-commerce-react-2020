const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const shortid = require('shortid');

const app = express();   
app.use(bodyParser.json());
/** Database connection */

const dbURI = "mongodb+srv://krifin:test1234@cluster0.p1cpd.mongodb.net/react-shopping-cart"; 

// const port = process.env.PORT || 5000;

mongoose.connect(dbURI, {
    useNewUrlParser:true, 
    useCreateIndex: true,
    useUnifiedTopology: true
}).then((result) => console.log('Connected'))
    .catch((err) => console.log('An error connecting'))

/** Product Model */
const Product = mongoose.model("products", 
    new mongoose.Schema({
    _id : {type: String, default: shortid.generate },
    title: String,
    description: String,
    image: String,
    price: Number,
    availableSizes: [String]
}))

app.get("/api/products", async (req, res)=> {
    const products = await Product.find({}); 
    res.send(products);
});

app.post("/api/products", async(req, res)=> {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.send(savedProduct);
});

app.delete("/api/products/:id", async(req, res)=>{
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.send(deletedProduct);
});



const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Serve at http://localhost:5000"));

