const express=require('express');
const { createBrand, fetchBrands } = require('../Controller/Brand');
const router=express.Router();

router.post('/',createBrand).get('/',fetchBrands)


exports.router=router;