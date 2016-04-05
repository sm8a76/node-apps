var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Promotions = require('../models/promotions');
var Verify    = require('./verify');

    
var promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.get(Verify.verifyOrdinaryUser, function(req,res,next){
    //res.end('Will send all the promotions to you!');
    Promotions.find({}, function (err, promotions) {
        if (err) throw err;
        res.json(promotions);
    });        
})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
    //res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);    
    Promotions.create(req.body, function (err, promotion) {
        if (err) throw err;
        console.log('Promotion created!');
        var id = promotion._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the promotion with id: ' + id);
    });           
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
        //res.end('Deleting all promotions');
    Promotions.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });         
});

promoRouter.route('/:promotionId')
.get(Verify.verifyOrdinaryUser, function(req,res,next){
    //res.end('Will send details of the promotion: ' + req.params.promotionId +' to you!');
    Promotions.findById(req.params.promotionId, function (err, promotion) {
        if (err) throw err;
        res.json(promotion);
    });           
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
    //res.write('Updating the promotion: ' + req.params.promotionId + '\n');
    /*res.end('Will update the promotion: ' + req.body.name + 
            ' with details: ' + req.body.description);*/
    Promotions.findByIdAndUpdate(req.params.promotionId, 
        {$set: req.body}, 
        {new: true}, 
        function (err, promotion) {
            if (err) throw err;
            res.json(promotion);
        }
    );         
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
    //res.end('Deleting promotion: ' + req.params.promotionId);
    Promotions.findByIdAndRemove(req.params.promotionId, 
        function (err, resp) {        
            if (err) throw err;
            res.json(resp);
        });        
});

module.exports = promoRouter;
    
