var mongoose = require('mongoose'),
    assert = require('assert');

var Promotions = require('./models/promotions');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");

    // create a new dish
    Promotions.create({
        name: 'Weekend Grand Buffet',
        description: 'Featuring . . .',
        image: 'images/buffet.png',
        category: 'mains',
        price: '$19.99'
    }, function (err, promotion) {
        if (err) throw err;
        console.log('Promotion created!');
        console.log(promotion);
        console.log('Promotion Price: ' + promotion.price.toFixed(2) / 100);

        var id = promotion._id;

        // get all the promotion
        setTimeout(function () {
            Promotions.findByIdAndUpdate(id, {
                    $set: {
                        description: 'Updated Featuring . . .',
                        label: 'Hot'
                    }
                }, {
                    new: true
                })
                .exec(function (err, promotion) {
                    if (err) throw err;
                    console.log('Updated Promotion!');
                    console.log(promotion);
                    console.log('Promotion Price: ' + promotion.price.toFixed(2) / 100);
                
                    db.collection('promotions').drop(function () {
                            db.close();
                    });                
               });
        }, 3000);
    });
});