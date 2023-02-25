var express = require('express');
var router = express.Router();
const KvData = require("../Json/Banner.json");
const CartData = require("../Json/Cart.json");
const ProductData = require("../Json/Product.json");
const ProductDetailData = require("../Json/ProductDetail.json");
const SwiperData = require("../Json/Swiper.json");
const CatData = require("../Json/Cats.json");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// ============================= KvData ========================================
// ... get ...
// ===================
// http://127.0.0.1:5000/api/banners
router.get('/carousel', function(req, res, next) {
  res.status(200);
  res.send({
    success : true,
    data :KvData,
  })
  res.end();
});
// ============================= ProductData ===================================
// ... get ...
// ===================
router.get('/products', function(req, res, next) {
  res.status(200);
  res.send({
    success : true,
    data :ProductData,
  })
  res.end();
});
// ============================= ProductDetailData =============================
// ... get ...
// ===================
router.get('/detail-product', function(req, res, next) {
  res.status(200);
  res.send({
    success : true,
    data :ProductDetailData,
  })
  res.end();
});
// ============================= ProductDetailData =============================
// ... get ...
// ===================
router.get('/swiper', function(req, res, next) {
  res.status(200);
  res.send({
    success : true,
    data :SwiperData,
  })
  res.end();
});
// ============================= ProductDetailData =============================
// ... get ...
// ===================
router.get('/cats', function(req, res, next) {
  res.status(200);
  res.send({
    success : true,
    data :CatData,
  })
  res.end();
});
// ============================= CartData ======================================
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
  const idAry = [];
  CartData.forEach(function (item) {
    idAry.push(Number(item.id));
  });
  const isKey = idAry.includes(Number(cart.id));
  if(!isKey) {
    console.log(`新增`);
    CartData.push({
      orderId: '2PpFq' + Date.now(),
      ...cart,
    })
    res.status(200);
    res.send({
      success : true,
      data :CartData,
    })
  }else {
    let content ="產品 已經在購物車內";
    res.status(403);
    res.send({
      data :content,
    })
  }
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
router.delete('/carts/delete/:id', function(req, res, next) {
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
router.delete('/carts/delete', function(req, res, next) {
  CartData.length = 0;
  res.status(200);
  res.send({
    success : true,
    data :CartData,
  })
  res.end();
});
module.exports = router;
