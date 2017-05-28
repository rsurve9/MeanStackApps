const fs = require('fs');
const path = require('path');
const async = require('async');

async.map(['package.json','package-clone.json'], function(name,callback){ // This function defines task for every file name in the array.

   fs.readFile(path.join(__dirname,name), 'utf-8',
     function(err,result){
        if (err){
            //return callback(err); // This internal callback function which tells there was an error while exection.
                                  
        }

// NOTE:
// If a task encounters an error, the best thing is to call the task 
// callback with the error object as the first argument.
// When a task calls back with an error, the final callback will be called immediately with the error object,
// and no more outstanding tasks will be initiated.

        try{
            var object = JSON.parse(result);
            callback(null, object.name); // This callback function tells that the task was completed.
        }
        catch(ex){
                //callback(err); 
        }
     });
},
function(err, results) { // This is the final callback.
    // results is now an array of stats for each file
    console.log(results);
});

 


