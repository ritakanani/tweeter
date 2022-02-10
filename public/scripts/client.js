// Preventing XSS with Escaping: 
// An XSS attack is a type of code injection: user input is mistakenly interpreted as malicious program code. In order to prevent this type of code injection, secure input handling is needed.
const escapeText = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


const createTweetElement = function (tweet) {

  const content = escapeText(tweet.content.text);
  const $tweet = $(`
    <section class="tweets-container"> 
    <article class="tweet"> 
      <header class="tweet-header">
      <div class="tweet-header-left">
        <div class="tweet-header-avatar">
          <img src=${tweet.user.avatars}> 
        </div>
        <p class="tweet-header-username">${tweet.user.name}</p>
      </div>
      <p class="tweet-header-right">${tweet.user.handle}</p>            
      </header>
  
      <main class="tweet-content">
        <p>${content}</p>
      </main>
  
      <footer class="tweet-footer">
        <p class="tweet-footer-timestamp">${timeago.format(tweet.created_at)}</p>
        <div class="tweet-footer-icons">
          <i class="fas fa-flag"></i>
          <i class="fas fa-crop-alt"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
    </article>
    </section>
     `);

  $('#tweets-container').prepend($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
}

const renderTweets = function (data) {
  // loops through tweets
  for (let tweet of data) {
    // calls createTweetElement for each tweet
    createTweetElement(tweet);
    // takes return value and appends it to the tweets container
  }
}
// renderTweets(tweetData);

const loadTweets = function () {
  $.ajax({
    url: "http://localhost:8080/tweets",
    method: "GET"
  })
    .then((results) => {
      console.log("results", results);
      $('#tweets-container').empty();
      // for (let result of results) {
      renderTweets(results);
      // }
    })
    .catch((err) => {
      console.log(err);
    });
}


$(document).ready(function () {
  $(".message").hide();
  $("#tweet-form").submit(function (event) {

    event.preventDefault();

    let $textcount = $("#tweet-text").val().length;
    if ($textcount === 0) {
      $(".message").find("p").text("");
      $(".message").find("p").text("Can't post empty tweet");
      return $(".message").slideDown(1000).show().delay(5000).slideUp(2000);
    }
    if ($textcount > 140) {
      $(".message").find("p").text("");
      $(".message").find("p").text("Tweet too long! maximum character exceeded limit.");
      return $(".message").slideDown(1000).show().delay(5000).slideUp(2000);
    }

    // serialize get data of current content from form
    // Serialize the form data and send it to the server as a query string
    let data = $(this).serialize();

    // receive the request of data 
    $.ajax({
      url: "http://localhost:8080/tweets",
      method: "POST",
      data: data
    })
      .done((results) => {
        $("#tweet-text").val('');
        loadTweets();
        console.log(results);
      })
      .fail((err) => {
        console.log(err);
      });
  });
  loadTweets();

}); 