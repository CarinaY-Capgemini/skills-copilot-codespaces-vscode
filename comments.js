// Create Web Server
// Create a web server that listens on port 8080. When you visit http://localhost:8080, it should display a form that contains a text area and a submit button. When you type a comment in the text area and click the submit button, it should post the comment to the server. The server should store the comment in a global array. When you visit http://localhost:8080/comments, it should display all the comments that have been posted so far.

var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');

var comments = [];

var server = http.createServer(function(req, res) {
  var urlParts = url.parse(req.url);
  if (urlParts.pathname === '/comments') {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    res.write('<html><body>');
    comments.forEach(function(comment) {
      res.write('<p>' + comment + '</p>');
    });
    res.write('<form method="POST" action="/comment"><textarea name="comment"></textarea><input type="submit"></form>');
    res.write('</body></html>');
    res.end();
  } else if (urlParts.pathname === '/comment') {
    var requestBody = '';
    req.on('data', function(data) {
      requestBody += data;
    });
    req.on('end', function() {
      var formData = querystring.parse(requestBody);
      comments.push(formData.comment);
      res.writeHead(302, {
        'Location': '/comments'
      });
      res.end();
    });
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/html'
    });
    res.write('<html><body><h1>Not Found</h1></body></html>');
    res.end();
  }
});

server.listen(8080);

// Path: comments.html
// Create HTML File
// Create an HTML file that contains a form with a text area and a submit button. When you type a comment in the text area and click the submit button, it should post the comment to the server. The server should store the comment in a global array. When you visit http://localhost:8080/comments, it should display all the comments that have been posted so far.

<!DOCTYPE html>
<html>
  <body>
    <form method="POST" action="http://localhost: