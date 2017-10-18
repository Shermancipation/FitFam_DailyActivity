$(document).ready(function(){
    
    $( "#goalSelect" ).on('change', function() {
        console.log(this.value);
        if(this.value == "custom"){
            $("#customGoal").show();
        }
        else{
            $("#customGoal").hide();
        }
      });
    
    $("#addActivity").click(function(){
        $("#addActivityDiv").toggle();
    });   

});
    