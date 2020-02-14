//definiing api endpoints
const router = require("express").Router();
//insert new product in database
router.post("/add", function(req, res) {
  let product = new Product();
  product.productName = req.body.productName;
  product.productPrice = req.body.productPrice;
  product.productDescription = req.body.productDescription;
  product.productImage = req.body.productImage;
  product.productCategory = req.body.productCategory;

  product.save(function(err) {
    if (err) console.log(err);
    return res.json({ _id: product._id, message: "product saved" });
  });
});

//edit a product in database

router.put("/edit/:id", async function(req, res) {
  let id = req.params.id;
  let p = await Product.findOne({ _id: id });
  p.productName = req.body.productName;
  p.productPrice = req.body.productPrice;
  p.productDescription = req.body.productDescription;
  p.productImage = req.body.productImage;

  p.save(function(err) {
    if (err) console.log(err);
    res.json({ p });
  });
});

//delete a product

router.delete("/delete/:id", async function(req, res) {
  let id = req.params.id;
  try {
    await Product.findOneAndDelete({ _id: id });
    res.json({ Message: "Product Deleted" });
  } catch (err) {
    console.log(err);
  }
});

router.get("/all", async function(req, res) {
  let Data = await Product.find({});
  res.json(Data);
});

// Maximum and minimum filter price
router.post("/filter", async function(req, res) {
  let Data = await Product.find({
    productPrice: { $lte: req.body.max, $gte: req.body.min }
  });
  res.json(Data);
});

router.get("/findById/:id", async function(req, res) {
  let Data = await Product.find({ _id: req.params.id });
  res.json(Data);
});

router.get("/findByCat/:cat", async function(req, res) {
  let Data = await Product.find({ productCategory: req.params.cat });
  res.json(Data);
});

module.exports = router;
