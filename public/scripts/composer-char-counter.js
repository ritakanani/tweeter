$("document").ready(function () {

  $("#tweet-text").on("input", () => {
    
    const textArea = $("#tweet-text");
    const tweetText = textArea.val().length;    

    const count = 140 - tweetText;    
    console.log(count);

    // const charCounter = textArea.siblings(" .button-counter").find(" .counter").html(count);  OR
    const charCounter = $(".new-tweet-counter").html(count); 
    if (count < 0) {
      $(".new-tweet-counter").css("color", "red");      
    } 
  });  // close ready event
  
});   // close on event