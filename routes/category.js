var express = require('express');
var router = express.Router();
var pool=require('./pool');


router.get('/fetch_all_category', function(req, res, next) {
    pool.query("Select * from category",function(error,result){
        if (error)
        {
            console.log(error)
            res.status(500).json({result:[],message:'Server error:issue in database'})
        }
        else
        {
            res.status(200).json({result:result,message:'Success'})
        }
    
    })
 
});


router.get('/fetch_all_types', function(req, res, next) {
    pool.query("Select * from producttype where categoryid=?",[req.query.categoryid],function(error,result){
        if (error)
        {
            
            res.status(500).json({result:[],message:'Server error:issue in database'})
        }
        else
        {
            res.status(200).json({result:result,message:'Success'})
        }
    
    })
 
});

router.get('/fetch_all_brands', function(req, res, next) {
    pool.query("Select * from brand where typeid=?",[req.query.typeid],function(error,result){
        if (error)
        {
            
            res.status(500).json({result:[],message:'Server error:issue in database'})
        }
        else
        {
            res.status(200).json({result:result,message:'Success'})
        }
    
    })
 
});


module.exports = router;
