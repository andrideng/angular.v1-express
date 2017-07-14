var db = require('../config/dbconnection');

var Place = {
    
    getAllPlaces:function(callback){
        return db.query("Select * from place",callback);
    },
    addPlace:function(Place,callback){
        return db.query("Insert into place values(?,?,?,?,?)",[Place.id,Place.name,Place.lat,Place.lng,Place.address],callback);
    },
    deletePlace:function(id,callback){
        return db.query("delete from place where Id=?",[id],callback);
    }

};
module.exports = Place;