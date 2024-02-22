var express = require('express');
var router = express.Router();
var pool=require('./pool')
var upload=require('./multer')
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

/* GET home page. */
router.get('/productsinterface', function(req, res, next) {
  try{
      var data=JSON.parse(localStorage.getItem("ADMIN"))
      if(data==null)
       res.render('loginpage',{message:''})
      else
      res.render('productinterface',{message:''});
     }
  catch(e)
     {
      res.render('loginpage',{message:''})
     } 
});



router.post('/submit_products', upload.single('picture'),function(req,res){

  console.log("BODY",req.body)
  console.log("FILE",req.file)
  pool.query("insert into products(categoryid, typeid, brandid, productname, description, price, offerprice, stock, gst, status, gift, picture)values(?,?,?,?,?,?,?,?,?,?,?,?)",[req.body.categoryid,req.body.typeid,req.body.brandid,req.body.productname,req.body.description,req.body.price,req.body.offerprice,req.body.stock,req.body.gst,req.body.status,req.body.gift+"",req.file.filename],function(error,result){
    if(error)
    {
      console.log(error)
      res.render("productinterface",{message:'Server error:Failed to submit record'})

    }
    else
    {
      console.log(result)
      res.render("productinterface",{message:'Record Submitted Successfully'})
    }

  })
})

router.get('/displayallproducts', function(req, res, next) {
  try{
    var data=JSON.parse(localStorage.getItem("ADMIN"))
    if(data==null)
    { res.render('loginpage',{message:''})}
    else
    {

  pool.query("select P.*,(select C.categoryname from category C where C.categoryid= P.categoryid) as categoryname,(select T.typename from producttype T where T.typeid=P.typeid) as typename,(select B.brandname from brand B where B.brandid=P.brandid) as brandname from products P",function(error,result){
    if(error)
    {
      res.render('displayallproducts',{data:[],status:false,message:'Server Error: Pls Contact to Server Admin...'});
    }
    else
    { console.log("output",result)
       if (result.length==0)
       {
        res.render('displayallproducts',{data:[],message:'No Record Found.....',status:false})
       }
       else
       {
        res.render('displayallproducts',{data:result,message:'Success',status:true})
       }
    }
  })
}
  }
  catch(e)
  {
    res.render('loginpage',{message:''})
  }
 
});

router.get('/display_product_by_id', function(req, res, next) {
  pool.query("select P.*,(select C.categoryname from category C where C.categoryid= P.categoryid) as categoryname,(select T.typename from producttype T where T.typeid=P.typeid) as typename,(select B.brandname from brand B where B.brandid=P.brandid) as brandname from products P where P.productid=?",[req.query.productid],function(error,result){
    if(error)
    {
      res.render('displayproductbyid',{data:[],status:false,message:'Server Error: Pls Contact to Server Admin...'});
    }
    else
   
       {
        res.render('displayproductbyid',{data:result[0],message:'No Record Found.....',status:false})
       }
    
  })
 
});

router.post('/edit_delete_product',function(req,res,next){
  var btn=req.body.btn
  if(btn=="Edit")
  {
  pool.query("update products set categoryid=?, typeid=?, brandid=?, productname=?, description=?, price=?, offerprice=?, stock=?, gst=?, status=?, gift=? where productid=?",[req.body.categoryid,req.body.typeid,req.body.brandid,req.body.productname,req.body.description,req.body.price,req.body.offerprice,req.body.stock,req.body.gst,req.body.status,req.body.gift+"",req.body.productid],function(error,result){
    if(error)
    {
      res.redirect('/products/displayallproducts')
    }
    else
    {
      res.redirect('/products/displayallproducts')
    }

  })
}
else
{
  pool.query("delete from products where productid=? ",[req.body.productid],function(error,result){
    if(error)
    {
      res.redirect('/products/displayallproducts')
    }
    else
    {
      res.redirect('/products/displayallproducts')
    }
  })
}
});


router.get('/show_picture',function(req,res,next){

  res.render('showpicture',{data:req.query})

})

router.post('/edit_picture',upload.single('picture'),function(req,res,next){

  pool.query("update products set picture=? where productid=?",[req.file.filename,req.body.productid],function(error,result){

    if(error)
    {
      res.redirect('/products/displayallproducts')
    }
    else
    {
      res.redirect('/products/displayallproducts') 
    }
  })

})

module.exports = router;