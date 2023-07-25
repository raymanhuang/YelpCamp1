
const mongoose = require('mongoose');
const Campground = require('../models/campground')
const axios = require('axios')
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers');
main()
    .then(() => console.log("database connected"))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

async function seedImg(){
    try{
        const resp = await axios.get('https://api.unsplash.com/photos/random',{
         params: {
             client_id: 'x_XoumpY_L0saZBO_Vi2NmIh7iVE39__HNu7j4nihW0',
             collections: 1114848,
         }
        })
        console.log(resp)
        return resp.data.urls.small;
    }catch(e){
        console.log(e);
    }
}

const sample = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}
const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 15; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: await seedImg(),
            description: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto maiores voluptatibus unde temporibus, velit\n' +
                '    harum vitae nesciunt eum, alias quaerat vel, impedit itaque optio ratione tempore. Quam assumenda debitis error.',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})