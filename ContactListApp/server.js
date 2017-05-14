var express = require('express'); // Import the express module for server functions
var app = express(); // Use functions and commands withing the express module.
var mongojs = require('mongojs');
var db = mongojs('contactlist',['contactlist']);
var bodyParser = require('body-parser'); // Used by the server to parse the request.

app.use(express.static(__dirname + "/public")); // Tells application that all static files (html, javascript and so) are located in this folder.
app.use(bodyParser.json()); 

// Get data from the database.
app.get('/contactList', function(req, res){ // Tell the server to listen to the 'get' request
    console.log("Request received");

    db.contactlist.find(function(err, result){

        if(err){
            console.log('An error occured on database fetch.');
        }
        if(result){
            console.log(result);
            res.json(result);        
        }
    }
    )   
});

// Insert data into the database.
app.post('/contactList',function(req, res){
    console.log(req.body); // Install module body-parser to parse the request body on the server.
    db.contactlist.insert(req.body, function(err, result){
      if(err){
            console.log('An error occured on database insert.');
        }
        if(result){
            console.log(result);
            res.json(result);        
        }
    })
});

//Delete contact from the database.
app.delete('/contactList/:id',function(req, res){
    var id = req.params.id;
    console.log("Server Remove Id",id);
    db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, result){
        if(err){
            console.log('An error occured on database delete');
        }
        if(result){
            console.log(result);
            res.json(result);        
        }
    });
});

//Get single contact in the database.
app.get('/contactList/:id',function(req, res){
    var id = req.params.id;
    
    db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, result){
        if(err){
            console.log('An error occured on database get for a single record.');
        }
        if(result){
            console.log(result);
            res.json(result);        
        }
    });   
});

app.put('/contactList/:id',function(req, res){
    var id = req.params.id;
    
    db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
        update: {$set: {name: req.body.name, email: req.body.email, phone: req.body.phone}}, // Make the modifications to the record document
        new : true}, function (err, result) { // Set " new : true" to send the updated document back in response.
            if(err){
            console.log('An error occured on while updating a single record in the database.');
            }
            if(result){
                console.log(result);
                res.json(result);        
                }            
        });
});   



// Test server
// app.get('/',function(req,res){  // Forward slash Points to index page
//         res.send("Hellow world from server.js");
// });

app.listen(3000);
console.log("Server running on port 3000");