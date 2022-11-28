var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	localStrategy = require('passport-local'),
	methodOverride = require('method-override'),
	User = require('./models/user'),
	flash = require('connect-flash'),
	seedDB = require("./seeds");

var authRoutes = require('./routes/auth'),
	campgroundRoutes = require('./routes/campgrounds'),
	commentRoutes = require('./routes/comments')

var port = process.env.PORT || 3000;

// seedDB();

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + "/public"));
app.use(flash());

const DB = process.env.DATABASE_URL.replace(
	'<password>',
	process.env.DB_PASSWORD
  ).replace(
	'<username>',
	process.env.DB_USER_NAME
  );

// use mongodb and mongoose
mongoose.connect(DB, {useNewUrlParser: true})
mongoose.set('useFindAndModify', false);

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

// Use method ovverride
app.use(methodOverride('_method'))

// Middlewares
app.use((req, res, next)=>{
	res.locals.currentUser = req.user
	res.locals.errorMsg = req.flash('error')
	res.locals.successMsg = req.flash('success')
	next()
})

// Routes
app.use(authRoutes)
app.use("/campgrounds/:id/comments", commentRoutes)
app.use("/campgrounds", campgroundRoutes)

app.listen(port, ()=>{
	console.log('Server has started')
})	