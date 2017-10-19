$(document).ready(function(){
    
    // Function to trigger custom input field only when custom value selected in form
    $( "#goalSelect" ).on('change', function() {
        console.log(this.value);
        if(this.value == "custom"){
            $("#customGoal").show();
        }
        else{
            $("#customGoal").hide();
        }
      });
    
    // Function to trigger add activity form toggle 
    $(".addActivity").click(function(){
        $(this).next(".addActivityDiv").toggle();
    });   

});
    