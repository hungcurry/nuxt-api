var express = require('express');
var router = express.Router();
const KvData = require("../Json/Banner.json");
// ===================
// ... get ...
// ===================
// http://127.0.0.1:3000/api/banners
router.get('/banners', function(req, res, next) {
  res.status(200);
  res.send({
    success : true,
    data :KvData,
  })
  res.end();
});
// ===================
// ... post ...
// ===================
router.post('/banners', function(req, res, next) {
  const banner = req.body;
  KvData.push({
    id : new Date().getTime(),
    ...banner,
  })

  res.status(200);
  res.send({
    success : true,
    data :KvData,
  })
  res.end();
});
// ===================
// ... patch ...
// ===================
router.patch('/banners', function(req, res, next) {
  console.log(req);
  const id = req.body.id;
  const quantity = req.body.quantity;
  KvData.forEach((banner , key)=> {
    if ( banner.id == id){
      banner.quantity = quantity;
    }
  })

  res.status(200);
  res.send({
    success : true,
    data :KvData,
  })
  res.end();
});
// ===================
// ... delete ...
// ===================
// http://127.0.0.1:3000/api/banners/:id
router.delete('/banners/:id', function(req, res, next) {
  const id = req.params.id;
  KvData.forEach((banner , key)=> {
    if ( banner.id == id){
      KvData.splice(key , 1)
    }
  })
  res.status(200);
  res.send({
    success : true,
    data :KvData,
  })
  res.end();
});
router.delete('/banners', function(req, res, next) {
  KvData.length = 0;
  res.status(200);
  res.send({
    success : true,
    data :KvData,
  })
  res.end();
});
module.exports = router;
