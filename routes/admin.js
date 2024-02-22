var express = require('express');
var router = express.Router();
var pool=require('./pool')
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

/* GET home page. */
router.get('/adminlogin', function(req, res, next) {
  try{
    var data=JSON.parse(localStorage.getItem("ADMIN"))
    if(data==null)
     res.render('loginpage',{message:''})
    else
   
    res.render('dashboard',{data:data});
   }
catch(e)
   {
    res.render('loginpage',{message:''})
   } 
   res.render('loginpage',{message:''})
   
});


router.post('/check_admin_login',function(req,res,next){
  pool.query("select * from admins  where (mobileno=? or emailid=?) and password=?",[req.body.emailid,req.body.emailid,req.body.password],function(error,result){
    if(error)
    {console.log(error)
      res.render('loginpage',{message:'Server Error: Pls Contact To Admin'})
    }
    else
    {
      
      if(result.length==1)
     { localStorage.setItem("ADMIN",JSON.stringify(result[0]))
      res.render('dashboard',{data:result[0]}
      )}
     else
     {
      res.render('loginpage',{message:'Invalid/Mobileno/Email/Password'})
     }

    
    }

  });
});
 
router.get('/adminlogout',function(req,res,next){
  localStorage.clear()
  res.render('loginpage',{message:''})
});

module.exports = router;
