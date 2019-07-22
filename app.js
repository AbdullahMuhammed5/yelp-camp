var express = require('express')
	app = express();

var port = process.env.PORT || 3000;

app.set('view engine', 'ejs')

app.get('/', (req, res)=>{
	res.render('landing')
})

app.get('/campgrounds', (req, res)=>{
	const campgrounds = [
		{ name: 'Salamon Greek', image: 'https://pixabay.com/get/54e6d0434957a514f6da8c7dda793f7f1636dfe2564c704c732c7cdd9244c05f_340.jpg'},
		{ name: 'Sante Catrine', image: 'https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c732c7cdd9244c05f_340.jpg'},
		{ name: 'El Rayan Vally', image: 'https://pixabay.com/get/57e2d54b4852ad14f6da8c7dda793f7f1636dfe2564c704c732c7cdd9244c05f_340.jpg'},
		{ name: 'Mountian Goat\'s Rest' , image: 'https://pixabay.com/get/57e8d1454b56ae14f6da8c7dda793f7f1636dfe2564c704c732c7cdd9244c05f_340.jpg'},
	]
	res.render('campgrounds', {campgrounds: campgrounds})
})

app.listen(port, ()=>{
	console.log('Server has started')
})