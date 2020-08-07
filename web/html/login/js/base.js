


window.onload=function(){
    $('.header1 label,.p-forget').click(function(){
       var id = $(this).attr('atm')
       if(id==1){
         $('.fromtwo').hide().siblings().show()
         $(this).css('border-bottom','2px solid #8CEEFA').siblings().css('border','0')
       }else if(id==3){
           $('.fromone').hide().siblings().show()
           $('.te-label').css('border-bottom','2px solid #8CEEFA').siblings().css('border','0')
       }
       else{
           $('.fromone').hide().siblings().show()
           $(this).css('border-bottom','2px solid #8CEEFA').siblings().css('border','0')
       }
      
    })
       $('.hidimg').click(function(){
             var idimg = $(this).attr('atm');
        
             if(idimg=='hid'){
               $(this).siblings('input').attr('type','text')
               $(this).hide().siblings().show()
              
             }else{
               $(this).siblings('input').attr('type','password')
               $(this).hide().siblings().show()
             }
       })
     $(".deinput").on("input  propertychange",function(){
   　　　console.log('111',$(this).val());
       if($(this).val()==''){
           $('.delete').hide()
       }else{
           $('.delete').show()
       }
    })
    $('.delete').click(function(){
       $(".deinput").val('')
       $('.delete').hide()
   })
   }
   