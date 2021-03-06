# YelpCamp

> A Node.js web application project from the Udemy course - [The Web Developer Bootcamp by Colt Steele](https://www.udemy.com/the-web-developer-bootcamp/)

## Live Demo

To see the app in action, go to [https://young-caverns-33557.herokuapp.com/](https://young-caverns-33557.herokuapp.com/)

## Features

* Authentication:
  
  * User login with username and password

* Authorization:

  * One cannot manage campgrounds and view user profile without being authenticated

  * One cannot edit or delete campgrounds and comments created by other users

  * Admin can manage all campgrounds and comments

* Manage campgrounds with basic functionalities:

  * Create, edit and delete campgrounds and comments

  * Upload campground photos
  
* Flash messages responding to users' interaction with the app

* Responsive web design
 
## Getting Started

### Clone or download this repository

```sh
git clone https://github.com/AbdullahMuhammed5/yelp-camp.git
```

### Install dependencies

```sh
npm install
```

or

```sh
yarn install
```

### Comments in code

Some comments in the source code are course notes and therefore might not seem necessary from a developer's point of view.

## Built with

### Front-end

* [ejs](http://ejs.co/)
* [Bootstrap](https://getbootstrap.com/docs/3.3/)

### Back-end

* [express](https://expressjs.com/)
* [mongoDB](https://www.mongodb.com/)
* [mongoose](http://mongoosejs.com/)
* [async](http://caolan.github.io/async/)
* [crypto](https://nodejs.org/api/crypto.html#crypto_crypto)
* [passport](http://www.passportjs.org/)
* [passport-local](https://github.com/jaredhanson/passport-local#passport-local)
* [express-session](https://github.com/expressjs/session#express-session)
* [method-override](https://github.com/expressjs/method-override#method-override)
* [moment](https://momentjs.com/)
* [connect-flash](https://github.com/jaredhanson/connect-flash#connect-flash)

### Platforms

* [Heroku](https://www.heroku.com/)
* [Github](https://github.com/)
## License

#### [MIT](./LICENSE)
