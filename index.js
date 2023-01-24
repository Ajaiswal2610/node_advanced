
const express = require('express');
const dbconnect = require("./config");
dbconnect();
const Product = require('./products');
const app = express();
app.use(express.json());

// ------------------- Listing all the products -------------------------------
app.get("/", async (req, resp) => {
    let data = await Product.find();
    resp.send(data);
})

// --------------Searching a particular product -----------------------
app.get("/products/:_id", async (req, resp) => {
    let data = await Product.find(req.params);
    resp.send(data);
})

//  ------------------------Adding a new product ------------------------------->

app.post("/admin", async (req, resp) => {
    let data = new Product(req.body);
    console.log(data)
    console.log(req.body)
    let result = await data.save();
    resp.send(result);
});


// <----------------------------Updating a new product --------------------------------->

app.put("/admin/:_id", async (req,resp)=>{
    let data = await Product.updateOne(
        req.params,
        {$set:req.body}
    );
    resp.send(data);
})

// <-------------------------------- Deleting a new product --------------------------------->

app.delete("admin/delete/:_id",async (req,resp)=>{
    // resp.send(req.params)
    let data = await Product.deleteOne(req.params);
    //  req.params is iteself a dictionary {_id:uruourotiu}
    resp.send(data);

})






app.get('/search/:key', async (req,resp)=>{
    let data = await Product.find(
        //  finding for the multiple field 
        {"$or":[
            {"name":{$regex:req.params.key}},
            {"brand":{$regex:req.params.key}},
            {"Categoy":{$regex:req.params.key}}
        ]
    }
    )
    resp.send(data)
})






app.listen(3000);

