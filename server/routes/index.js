router.get('*',function(req,res,next){
    res.json({"message": "API is ready in /api"});
});
