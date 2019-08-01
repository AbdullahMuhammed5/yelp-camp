const express = require('express')
const router = express.Router()
const Campground = require('../models/campground')


// INDEX - Show all Campgrounds
router.get('/', (req, res)=>{
	Campground.find({}, (err, AllCampgrounds)=>{
		if(err) throw err;
		res.render('campgrounds/index', {campgrounds: AllCampgrounds, currentUser: req.user})
	})
})

// NEW - Form page to add new Campground
router.get('/new', isLoggedIn, (req, res)=>{
	res.render('campgrounds/new')
})

// CREATE - Add new Campground
router.post('/', isLoggedIn, (req, res)=>{
	// get data form form request and add it to campgrounds array
	var newCampground = { 
		name: req.body.name,
		image: req.body.image, 
		description: req.body.description,
		author: {
			id: req.user._id,
			username: req.user.username
		} 
	}
	
	Campground.create(newCampground, (err, res)=>{
		if(err) throw err;
		console.log(res);
	})
	// redirect to campgrounds page
	res.redirect('/campgrounds')
})

// SHOW - Show Details for Selected Campground
router.get('/:id', (req, res)=>{
	// const selected = Campground.find(req.params.id);
	Campground.findById(req.params.id).populate("comments").exec((err, result)=>{
		if(err) throw err;
		res.render('campgrounds/show', {campground: result})
	})
})

// Middlewares
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next()
	}
	res.redirect('/login')
}

module.exports = router
