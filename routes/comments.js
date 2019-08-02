const express = require('express')
const router = express.Router({mergeParams: true})
const Campground = require('../models/campground')
const Comment = require('../models/comment')

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
// EDIT - Route to edit page for campground
router.get('/:comId/edit', isOwner, (req, res)=>{
	Comment.findById(req.params.comId, (err, result)=>{
		res.render("comments/edit", {comment: result, campgroundID: req.params.id})
	})
})
// UPDATE - Update campground
router.put('/:comId', isOwner, (req, res)=>{
	Comment.findByIdAndUpdate(req.params.comId, req.body.comment, (err, updatedComment)=>{
		if(err) throw err
		console.log(updatedComment)
		res.redirect('/campgrounds/'+req.params.id)
	})
})
// DESTROY - Route to Delete campground
router.delete('/:comId', isOwner, (req, res)=>{
	Comment.findByIdAndDelete(req.params.comId, (err, result)=>{
		if(err) throw err;
		console.log('Comment Deleted Successfully..!!')
		res.redirect('/campgrounds/'+req.params.id)
	})
})


// Middlewares
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next()
	}
	res.redirect('/login')
}

function isOwner(req, res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comId, (err, result)=>{
			if(err) throw err;
			// is user own the campground?
			if(result.author.id.equals(req.user._id)){
				next()
			} else{ // not then redirect
				res.redirect('back')
			}
		})
	} else{ // not then redirect 
		res.redirect('back')
	}
}

module.exports = router
