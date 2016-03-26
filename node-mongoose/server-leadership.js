var mongoose = require('mongoose'),
    assert = require('assert');

var Leadership = require('./models/leadership');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");

    // create a new dish
    Leadership.create({
        name: 'Peter Pan',
        description: 'Our CEO, Peter, . . ',
        image: 'images/alberto.png',
        designation: 'Chief Epicurious Officer',
        abbr: 'CEO'
    }, function (err, leadership) {
        if (err) throw err;
        console.log('Leadership created!');
        console.log(leadership);

        var id = leadership._id;

        // get all the promotion
        setTimeout(function () {
            Leadership.findByIdAndUpdate(id, {
                    $set: {
                        description: 'Our CEO, Peter, . . Updated'
                    }
                }, {
                    new: true
                })
                .exec(function (err, leadership) {
                    if (err) throw err;
                    console.log('Updated Leadership!');
                    console.log(leadership);
                
                    db.collection('leaderships').drop(function () {
                            db.close();
                    });                
               });
        }, 3000);
    });
});