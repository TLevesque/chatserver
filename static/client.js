'use strict';

//Button send message:
$(document).ready(function () {
  $('#send').click(function () {
    const msg = {
      author: 'User',
      content: $('#inputText').val(),
      date: Date.now()
    };
    $('#inputText').val('');
    renderMsg(msg);
    postMsg(msg);
  });

  $.ajax({
    method: 'GET',
    url: '/messages',
    success: function (msgsArr) {
      msgsArr.forEach(function (msg) {
        renderMsg(msg);
      });
    },
    error: function(err) {
      console.log(err);
      return;
    },
  });
});

function postMsg(msg) {
  $.ajax({
    method: 'POST',
    url: '/messages',
    data: JSON.stringify(msg),
    success: function (msgsArr) {
      console.log('saved');
    },
    contentType: 'application/json',
    error: function (err) {
      console.log(err);
    },
  });
}

function renderMsg (msg) {
  const $msgHtml = $('<h3 class="msg">').append(msg.content);
  $('#messagesArea').append($msgHtml);
}

//  Get Response (Quotes)
//   function get() {
//     $.ajax({
//       method: "GET",
//       dataType: "jsonp",
//       url: "http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=parseQuote",
//     });
//   }
//
// //{"quoteText":"Тот", "quoteAuthor":"", "senderName":"", "senderLink":"", "quoteLink":"http://forism"}
// function parseQuote(msg) {
//     var response = $('<h3 class="api">').append(msg.quoteText);
//   $('#messagesArea').append(response);
//   return;
// }
