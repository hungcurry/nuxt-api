var express = require('express');
var router = express.Router();
const KvData = require("../Json/Banner.json");
const CartData = require("../Json/Cart.json");
// ============================= KvData ===================================
// ... get ...
// ===================
// http://127.0.0.1:5000/api/banners
router.get('/banners', function(req, res, next) {
  res.status(200);
  res.send({
    success : true,
    data :KvData,
  })
  res.end();
});


// ============================= CartData ===================================
// ... get ...
// ===================
// http://127.0.0.1:5000/api/carts
router.get('/carts', function(req, res, next) {
  res.status(200);
  res.send({
    success : true,
    data :CartData,
  })
  res.end();
});
// ... post ...
// ===================
router.post('/carts', function(req, res, next) {
  const cart = req.body;
  console.log(cart);
  CartData.push({
    orderId: '2PpFq' + Date.now(),
    ...cart,
  })

  res.status(200);
  res.send({
    success : true,
    data :CartData,
  })
  res.end();
});
// ... patch ...
// ===================
router.patch('/carts', function(req, res, next) {
  const id = req.body.id;
  const quantity = req.body.quantity;
  CartData.forEach((cart , key)=> {
    if ( cart.id == id){
      cart.quantity = quantity;
    }
  })

  res.status(200);
  res.send({
    success : true,
    data :CartData,
  })
  res.end();
});
// ... delete ...
// ===================
// http://127.0.0.1:5000/api/banners/:id
router.delete('/carts/:id', function(req, res, next) {
  const id = req.params.id;
  console.log(`id` , id);
  CartData.forEach((cart , key)=> {
    if ( cart.orderId === id){
      CartData.splice(key , 1)
    }
  })
  res.status(200);
  res.send({
    success : true,
    data :CartData,
  })
  res.end();
});
router.delete('/carts', function(req, res, next) {
  CartData.length = 0;
  res.status(200);
  res.send({
    success : true,
    data :CartData,
  })
  res.end();
});
module.exports = router;
