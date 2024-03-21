const express=require('express');
const passport=require('passport');
const { createUser, checkUser, login } = require('../Controller/Auth');
const router=express.Router();

router.post('/signup',createUser).post('/login',passport.authenticate('local'),login).
get('/check',passport.authenticate('jwt'), checkUser)

exports.router=router;