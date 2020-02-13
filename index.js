const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Product = require('./model/product')
const app = express()

//using body parse for parsing request body 
app.use(bodyParser.urlencoded({ extended: false }))
//connecting to datbase 
async function connect(){
    const db = await mongoose.connect('mongodb://localhost:27017/nodejs') 
    
}

connect();
//definiing api endpoints 

//insert new product in database 
app.post('/add',function(req,res){
    let product = new Product();
    product.productName = req.body.productName
    product.productPrice = req.body.productPrice
    product.productDescription = req.body.productDescription
    product.productImage = req.body.productImage
    product.productCategory = req.body.productCategory

    product.save(function(err){
        if(err) console.log(err)
        return res.json({_id:product._id , "message":"product saved"})
    })

})

//edit a product in database 

app.put('/edit/:id',async function(req,res){
    let id = req.params.id
    let p = await Product.findOne({"_id":id});
    p.productName = req.body.productName;
    p.productPrice = req.body.productPrice;
    p.productDescription = req.body.productDescription;
    p.productImage = req.body.productImage;

    p.save(function(err){
        if(err) console.log(err);
        res.json({p})
    })
 
    
})

//delete a product 

app.delete('/delete/:id',async function(req,res){
    let id = req.params.id
    try{
        await Product.findOneAndDelete({"_id":id})
        res.json({"Message":"Product Deleted"})
    }catch(err){
        console.log(err)
    }
    
    
})

app.get('/all',async function(req,res){
    let Data = await Product.find({})
    res.json(Data)
})


// Maximum and minimum filter price
app.post('/filter',async function(req,res){
    let Data = await Product.find({productPrice:{$lte:req.body.max,$gte:req.body.min}})
    res.json(Data)
})

app.get('/findById/:id',async function(req,res){
    let Data = await Product.find({"_id":req.params.id})
    res.json(Data)
})


app.get('/findByCat/:cat',async function(req,res){
    let Data = await Product.find({"productCategory":req.params.cat})
    res.json(Data)
});









app.listen(3000,function(){console.log('server started listening at port 5000')})





