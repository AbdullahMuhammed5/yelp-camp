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
			console.log(err)
			return res.render('register')
		}
		passport.authenticate('local')(req, res, ()=>{
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

})

// logout
router.get('/logout', (req, res)=>{
	req.logOut()
	res.redirect('/campgrounds')
})

// Middlewares
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next()
	}
	res.redirect('/login')
}

module.exports = router