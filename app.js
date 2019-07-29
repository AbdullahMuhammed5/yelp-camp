var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	Campground = require('./models/campgrounds'),
	Comment = require('./models/comments'),
	seedDB = require("./seeds");


var port = process.env.PORT || 3000;

// seedDB();

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res)=>{
	res.render('landing')
})


// use mongodb and mongoose
mongoose.connect('mongodb://localhost/yelp-camp', {useNewUrlParser: true})

// Routes

// INDEX - Show all Campgrounds
app.get('/campgrounds', (req, res)=>{
	var AllCampgrounds;
	Campground.find({}, (err, AllCampgrounds)=>{
		if(err) throw err;
		res.render('campgrounds/index', {campgrounds: AllCampgrounds})
	})
})

// NEW - Form page to add new Campground
app.get('/campgrounds/new', (req, res)=>{
	res.render('campgrounds/new')
})

// CREATE - Add new Campground
app.post('/campgrounds', (req, res)=>{
	// get data form form request and add it to campgrounds array
	var newCampground = { 
		name: req.body.name,
		image: req.body.image, 
		description: req.body.description 
	}
	
	Campground.create(newCampground, (err, res)=>{
		if(err) throw err;
		console.log(res);
	})
	// redirect to campgrounds page
	res.redirect('/campgrounds')
})

// SHOW - Show Details for Selected Campground
app.get('/campgrounds/:id', (req, res)=>{
	// const selected = Campground.find(req.params.id);
	Campground.findById(req.params.id).populate("comments").exec((err, result)=>{
		if(err) throw err;
		console.log(result)
		res.render('campgrounds/show', {campground: result})
	})
})

// =================
// COMMENTS ROUTES
// =================

app.get('/campgrounds/:id/comments/new', (req, res)=>{
	Campground.findById({_id: req.params.id}, (err, campground)=>{
		if(err) throw err;
		res.render('comments/new', {campground: campground})
	})
})

app.post('/campgrounds/:id/comments', (req, res)=>{
	// lookup campgraound by id
	Campground.findById(req.params.id, (err, campground)=>{
		if(err) throw err;
		
		// create new comment
		Comment.create(req.body.comment, (err, comment)=>{
			if(err) throw err;
			// connect new commnet to the campground
			campground.comments.push(comment)
			campground.save()
			// redirect to the campground page
			res.redirect('/campgrounds/' + campground._id)
		})
	})
})

app.listen(port, ()=>{
	console.log('Server has started')
})	