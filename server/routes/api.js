var express = require('express');
var router = express.Router();
var Place = require('../models/Place');

router.get('/',function(req,res,next){
    res.json({"message": "etobee-technical-test"});
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