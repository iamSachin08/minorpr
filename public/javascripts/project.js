$(document).ready(function(){
    $.get('/category/fetch_all_category',function(data){
        //alert(JSON.stringify(data.result))
        data.result.map((item)=>{

           // alert(item.categoryname)
          // console.log("dataaaaa",data)

           $('#categoryid').append($('<option>').text(item.categoryname).val(item.categoryid))
          


        })

    })

 $('#categoryid').change(function(){

    $.get('/category/fetch_all_types',{categoryid:$('#categoryid').val()},function(data){

        $('#typeid').empty()
        $('#typeid').append($('<option>').text('Type'))
      
        data.result.map((item)=>{

           $('#typeid').append($('<option>').text(item.typename).val(item.typeid))
          


        })

    })

})

$('#typeid').change(function(){

    $.get('/category/fetch_all_brands',{typeid:$('#typeid').val()},function(data){

        $('#brandid').empty()
        $('#brandid').append($('<option>').text('Brand'))
      
        data.result.map((item)=>{

           $('#brandid').append($('<option>').text(item.brandname).val(item.brandid))
          


        })

    })

})


$('#picture').change(function(e){
    $('#productimage').attr('src',URL.createObjectURL(e.currentTarget.files[0]))

})



})