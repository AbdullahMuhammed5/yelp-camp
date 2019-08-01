const express = require('express')
const router = express.Router({mergeParams: true})
const Campground = require('../models/campgrounds')
const Comment = require('../models/comments')

// Route to new comment form page
router.get('/new', isLoggedIn, (req, res)=>{
	Campground.findById({_id: req.params.id}, (err, campground)=>{
		if(err) throw err;
		res.render('comments/new', {campground: campground})
	})
})

// Store new comment
router.post('/', isLoggedIn, (req, res)=>{
	// lookup campgraound by id
	Campground.findById(req.params.id, (err, campground)=>{
		if(err) throw err;
		// create new comment
		Comment.create(req.body.comment, (err, comment)=>{
			if(err) throw err;
			// get current user data and add it to comment
			comment.author.id = req.user._id
			comment.author.username = req.user.username
			comment.save()
			// connect new commnet to the campground
			campground.comments.push(comment)
			campground.save()
			// redirect to the campground page
			res.redirect('/campgrounds/' + campground._id)
		})
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
