var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	localStrategy = require('passport-local'),
	Campground = require('./models/campgrounds'),
	Comment = require('./models/comments'),
	User = require('./models/user')
	seedDB = require("./seeds");


var port = process.env.PORT || 3000;

// seedDB();

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + "/public"));
app.get('/', (req, res)=>{
	res.render('landing')
})


// use mongodb and mongoose
mongoose.connect('mongodb://localhost/yelp-camp', {useNewUrlParser: true})


// Passport Configuration
app.use(require('express-session')({
	secret: "Text For hashing the password",
	resave: false,
	saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next)=>{
	res.locals.currentUser = req.user
	next()
})

// Routes

// =================
// CAMPGROUND ROUTES
// =================

// INDEX - Show all Campgrounds
app.get('/campgrounds', (req, res)=>{
	Campground.find({}, (err, AllCampgrounds)=>{
		if(err) throw err;
		res.render('campgrounds/index', {campgrounds: AllCampgrounds, currentUser: req.user})
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
		res.render('campgrounds/show', {campground: result})
	})
})

// =================
// COMMENTS ROUTES
// =================

app.get('/campgrounds/:id/comments/new', isLoggedIn, (req, res)=>{
	Campground.findById({_id: req.params.id}, (err, campground)=>{
		if(err) throw err;
		res.render('comments/new', {campground: campground})
	})
})

app.post('/campgrounds/:id/comments', isLoggedIn, (req, res)=>{
	// lookup campgraound by id
	Campground.findById(req.params.id, (err, campground)=>{
		if(err) throw err;
		console.log(req.body.comment)
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

// =================
// AUTHENTICATION ROUTES
// =================

// register
app.get('/register', (req, res)=>{
	res.render('register')
})
app.post('/register', (req, res)=>{
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
app.get('/login', (req, res)=>{
	res.render('login')
})
app.post('/login', passport.authenticate('local', {
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}), (req, res)=>{

})

// logout
app.get('/logout', (req, res)=>{
	req.logOut()
	res.redirect('/campgrounds')
})

// Middlewares
function isLoggedIn(req, res, next){
	if(req.isAuthenticated	()){
		return next()
	}
	res.redirect('/login')
}
app.listen(port, ()=>{
	console.log('Server has started')
})	