var mongoose = require("mongoose"),
    Campground = require('./models/campgrounds'),
    Comment = require('./models/comments');


var seedData = [
    {
        name: "Sante Catrine",
        image: "https://cdn-1.sportsden.ie/media/wysiwyg/menu_blocks/camping_menu/Camping.jpg",
        description: "This is a description for this awesome campground, take a look on our profile and contact us."
    },
    {
        name: "El rayan VAlly",
        image: "https://www.nps.gov/mora/planyourvisit/images/OhanaCampground2016_CMeleedy_01_web.jpeg?maxwidth=1200&maxheight=1200&autorotate=false",
        description: "This is a description for this awesome campground, take a look on our profile and contact us."
    },
    {
        name: "Canyon Floor",
        image: "https://agbmedia.blob.core.windows.net/media/2018/02/camping.jpg",
        description: "This is a description for this awesome campground, take a look on our profile and contact us."
    },
    {
        name: "Matrooh desert",
        image: "https://www.nationalparks.nsw.gov.au/-/media/npws/images/parks/munmorah-state-conservation-area/background/freemans-campground-background.jpg",
        description: "This is a description for this awesome campground, take a look on our profile and contact us."
    },
]
function seedDB(){
    // Remove all compgrounds
    Campground.deleteMany({}, (err)=>{
        if (err) throw err;
        console.log('Campgrounds removed!!')
        // add new Campgrounds
        seedData.forEach(campground => {
            Campground.create(campground, (err, AddedCampgrounds)=>{
                if (err) throw err;
                console.log("Campground Add with name "+ AddedCampgrounds.name)
                // console.log(AddedCampgrounds)
                Comment.create({
                    text: "this place is great with a fantastic view.",
                    auther: "abdullah"
                }, (err, comment)=>{
                    if (err) throw err;
                    AddedCampgrounds.comments.push(comment);
                    AddedCampgrounds.save();
                    console.log("Comment is Add!!")
                })
            })
        });
    })

    // add a few commendts

}

module.exports = seedDB;

