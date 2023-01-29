const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,

});



const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array =>
    array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    // const c = new Campground({ title: 'purple field' });
    // await c.save();
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '63c8f1dc94af1b3d6d1ac7c3',
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/800x0/?camp',
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe molestiae odit cum dolores nesciunt deleniti laborum aliquid vitae? Corporis vel sequi itaque, illum commodi sunt eligendi reiciendis sit ab explicabo.",
            price

        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})