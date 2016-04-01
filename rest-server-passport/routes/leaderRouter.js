var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Leadership = require('../models/leadership');
    
    var leaderRouter = express.Router();

    leaderRouter.use(bodyParser.json());

    leaderRouter.route('/')

    .get(function(req,res,next){
        //res.end('Will send all the leaders to you!');
        Leadership.find({}, function (err, leaders) {
            if (err) throw err;
            res.json(leaders);
        });            
    })

    .post(function(req, res, next){
        //res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);    
        Leadership.create(req.body, function (err, leader) {
            if (err) throw err;
            console.log('Leader created!');
            var id = leader._id;

            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Added the leader with id: ' + id);
        });         
    })

    .delete(function(req, res, next){
        //res.end('Deleting all leaders');
        Leadership.remove({}, function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });         
    });

    leaderRouter.route('/:leaderId')

    .get(function(req,res,next){
        //res.end('Will send details of the leader: ' + req.params.leaderId +' to you!');
        Leadership.findById(req.params.leaderId, function (err, leader) {
            if (err) throw err;
            res.json(leader);
        });          
    })

    .put(function(req, res, next){
        /*res.write('Updating the leader: ' + req.params.leaderId + '\n');
        res.end('Will update the leader: ' + req.body.name + 
                ' with details: ' + req.body.description);*/
        Leadership.findByIdAndUpdate(req.params.leaderId, 
            {$set: req.body}, 
            {new: true}, 
            function (err, leader) {
                if (err) throw err;
                res.json(leader);
            }
        );          
    })

    .delete(function(req, res, next){
        //res.end('Deleting leader: ' + req.params.leaderId);
        Leadership.findByIdAndRemove(req.params.leaderId, 
            function (err, resp) {        
                if (err) throw err;
                res.json(resp);
            });             
    });

    module.exports = leaderRouter;
    
