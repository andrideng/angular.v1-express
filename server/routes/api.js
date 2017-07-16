var express = require('express');
var router = express.Router();
var Place = require('../models/Place');
var curl = require('curlrequest');
var env = require('dotenv').config().parsed;

// 'https://maps.googleapis.com/maps/api/directions/json?key=AIzaSyDtP6A3_Jqg40EnmdzFARTtq35ihreFOqQ&mode=driving&origin=-6.1351784466311,106.81328773498535&destination=-6.2002291,106.78538679999997'

router.get('/',function(req,res,next){

    res.json({"message": "etobee-technical-test"});
});

router.get('/routing/:url',function(req,res, next) {
    var static = 'https://maps.googleapis.com/maps/api/directions/json?key='+process.env.GAPI+'&mode=driving&';
    
    var url = static+req.params.url;
    curl.request({url:url}, function (err, data) {
        dat = JSON.parse(data).routes[0].overview_polyline.points;
    })

    res.json(dat);

});


router.get('/places',function(req,res,next){

    // retrive all places in db
    Place.getAllPlaces(function(err,rows){
        if(err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }

    });

});


router.post('/places',function(req,res,next){
    // add new places in db
    Place.addPlace(req.body,function(err,count){

        if(err) {
            res.json(err);
        }
        else{
            res.json(req.body); //or return count for 1 &amp;amp;amp; 0
        }
    });
});

router.delete('/places/:id',function(req,res,next){
    // remove in db
    Place.deletePlace(req.params.id,function(err,count){

        if(err) {
            res.json(err);
        }
        else {
            res.json(count);
        }

    });
});

module.exports=router;