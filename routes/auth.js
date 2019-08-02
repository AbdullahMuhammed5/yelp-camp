const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')

// Root Route
router.get('/', (req, res)=>{
	res.render('landing')
})

// register
router.get('/register', (req, res)=>{
	res.render('register')
})
router.post('/register', (req, res)=>{
	var newUser = new User({username: req.body.username})
	User.register(newUser, req.body.password, (err, user)=>{
		if(err){
			req.flash('error', err.message)
			return res.render('register')
		}
		passport.authenticate('local')(req, res, ()=>{
			req.flash("success", "Registered Succssefully.\n Congratulations, Now You are part of our App.!")
			res.redirect('/campgrounds')
		})
	})
})

// Login
router.get('/login', (req, res)=>{
	res.render('login')
})
router.post('/login', passport.authenticate('local', {
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
    }), (req, res)=>{
	req.flash("success", "Welcome back.!")
})

// logout
router.get('/logout', (req, res)=>{
	req.logOut()
	req.flash("success", "You Logged out Successfully.!")
	res.redirect('/campgrounds')
})

module.exports = router