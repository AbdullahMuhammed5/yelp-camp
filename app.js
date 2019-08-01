var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	localStrategy = require('passport-local'),
	Campground = require('./models/campground'),
	Comment = require('./models/comment'),
	User = require('./models/user')
	seedDB = require("./seeds");

var authRoutes = require('./routes/auth'),
	campgroundRoutes = require('./routes/campgrounds'),
	commentRoutes = require('./routes/comments')

var port = process.env.PORT || 3000;

// seedDB();

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + "/public"));

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

// Middlewares
app.use((req, res, next)=>{
	res.locals.currentUser = req.user
	next()
})

// Routes
app.use(authRoutes)
app.use("/campgrounds/:id/comments", commentRoutes)
app.use("/campgrounds", campgroundRoutes)

app.listen(port, ()=>{
	console.log('Server has started')
})	