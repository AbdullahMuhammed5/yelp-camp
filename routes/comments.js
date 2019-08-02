const express = require('express')
const router = express.Router({mergeParams: true})
const Campground = require('../models/campground')
const Comment = require('../models/comment')
const middelwares = require('../middleware')

// Route to new comment form page
router.get('/new', middelwares.isLoggedIn, (req, res)=>{
	Campground.findById({_id: req.params.id}, (err, campground)=>{
		if(err) throw err;
		res.render('comments/new', {campground: campground})
	})
})
// Store new comment
router.post('/', middelwares.isLoggedIn, (req, res)=>{
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
			req.flash('success', "Comment added Successfully!")
			// redirect to the campground page
			res.redirect('/campgrounds/' + campground._id)
		})
	})
})
// EDIT - Route to edit page for campground
router.get('/:comId/edit', middelwares.isCommentOwner, (req, res)=>{
	Comment.findById(req.params.comId, (err, result)=>{
		res.render("comments/edit", {comment: result, campgroundID: req.params.id})
	})
})
// UPDATE - Update campground
router.put('/:comId', middelwares.isCommentOwner, (req, res)=>{
	Comment.findByIdAndUpdate(req.params.comId, req.body.comment, (err, updatedComment)=>{
		if(err) throw err
		req.flash('success', "Comment updated Successfully!")
		res.redirect('/campgrounds/'+req.params.id)
	})
})
// DESTROY - Route to Delete campground
router.delete('/:comId', middelwares.isCommentOwner , (req, res)=>{
	Comment.findByIdAndDelete(req.params.comId, (err, result)=>{
		if(err) throw err;
		req.flash('success', "Comment deleted Successfully!")
		res.redirect('/campgrounds/'+req.params.id)
	})
})

module.exports = router
