var mongoose = require("mongoose"),
    Campground = require('./models/campgrounds'),
    Comment = require('./models/comments');


var seedData = [
    {
        name: "Sante Catrine",
        image: "https://cdn-1.sportsden.ie/media/wysiwyg/menu_blocks/camping_menu/Camping.jpg",
        description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."
    },
    {
        name: "El rayan VAlly",
        image: "https://www.nps.gov/mora/planyourvisit/images/OhanaCampground2016_CMeleedy_01_web.jpeg?maxwidth=1200&maxheight=1200&autorotate=false",
        description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."
    },
    {
        name: "Canyon Floor",
        image: "https://agbmedia.blob.core.windows.net/media/2018/02/camping.jpg",
        description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."
    },
    {
        name: "Matrooh desert",
        image: "https://www.nationalparks.nsw.gov.au/-/media/npws/images/parks/munmorah-state-conservation-area/background/freemans-campground-background.jpg",
        description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."
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
                Comment.create({
                    text: "this place is great with a fantastic view.",
                    author: "abdullah"
                }, (err, comment)=>{
                    if (err) throw err;
                    AddedCampgrounds.comments.push(comment);
                    AddedCampgrounds.save();
                    console.log("Comment is Add!!")
                })
            })
        });
    })

    // remove all comments
    Comment.deleteMany({}, (err)=>{
        if (err) throw err;
        console.log('Comments removed!!')
    })

    // add a few commendts

}

module.exports = seedDB;

