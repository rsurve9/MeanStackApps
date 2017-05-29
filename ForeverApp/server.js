//Node.js has a built-in module called HTTP, which allows Node.js to transfer data over the Hyper Text Transfer Protocol (HTTP)
var http = require('http'); 

var server = http.createServer(function(request, response){
 if(request.url == '/'){
     response.setHeader('Content-Type','text/html');
     response.end('<strong> This is Forever module example </string>');
 }
});      

server.listen(3000,function(){
    console.log("Listening on port number 3000");
});

// Used for running a node server app forever!
// npm install forever -g 
// Do not use nodemon.
// Start server using command -->  forever start server.js (do not use command: node server )
// List processes managed by forever using --> forver list

// Even when you kill your node process using proces id, the forever package
// restarts the server.  

// Forever restarts your app when it crashes or stops for some reason

// While shutting down a server use --
// To stop the app : forever stop server.js 
// To stop all apps managed by forever : forever stopall

// To start app automatically on server restart, go to the bootfile and 
// put the command: forever start <folderPathToProject>/server.js