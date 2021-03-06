var Campground = require('../models/campground')
var Comment = require('../models/comment')

// all middleware goes here

module.exports = {
    isCommentOwner: function(req, res, next){
        if(req.isAuthenticated()){
            Comment.findById(req.params.comId, (err, result)=>{
                if(err) throw err;
                // is user own the campground?
                if(result.author.id.equals(req.user._id)){
                    next()
                } else{ // not then redirect
                    req.flash('error', "You don't have permission to proceed!!")
                    res.redirect('back')
                }
            })
        } else{ // not then redirect 
            req.flash('error', "You need to be logged in first!")
            res.redirect('back')
        }
    },
    isCampgroundOwner: function(req, res, next){
        if(req.isAuthenticated()){
            Campground.findById(req.params.id, (err, result)=>{
                if(err) throw err;
                // is user own the campground?
                if(result.author.id.equals(req.user._id)){
                    next()
                } else{ // not then redirect
                    req.flash('error', "You don't have permission to proceed!!")
                    res.redirect('back')
                }
            })
        } else{ // not then redirect 
            req.flash('error', "You need to be logged in first!")
            res.redirect('back')
        }
    },
    isLoggedIn: function(req, res, next){
        if(req.isAuthenticated()){
            return next()
        }
        req.flash("error", "Please Login first!")
        res.redirect('/login')
    }
}