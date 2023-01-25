
const Users = require('../models/users');
const express = require('express');
const ejs = require('ejs');
const passport = require('passport');
const connectEnsureLogin = require('connect-ensure-login');

const router = require("express").Router();
router.use(express.urlencoded({extended:true}))

const log_middleware = passport.authenticate("local",{
    failureRedirect:"/login",
    successRedirect: '/admin'
        })

router.get("/account",  (req,resp)=>{
    resp.render("index")
    })

router.get("/register",  (req,resp)=>{
        resp.render("register")
    
        })

router.get("/login", (req,resp)=>{
    resp.render("login")
})




router.post("/login",log_middleware, (req,resp)=>{
    resp.send("logged in")
})

router.get('/admin', connectEnsureLogin.ensureLoggedIn(), (req, res) =>
  res.render('dashboard', { title: 'Dashboard Page' })
);

router.post("/register", async (req,resp)=>{
    resp.send(req.body)
    const user = await Users.findOne({username:req.body.username})
    if (user) return resp.status(400).send("user already exist")

    const newuser = Users.create(req.body);
    resp.status(201).send(newuser)
})


router.get("/logout", function(req,resp, next){
    req.logout(function(err){
        if (err){
            return next(err);
        }
        resp.redirect("/")
    })
})

module.exports = router;
