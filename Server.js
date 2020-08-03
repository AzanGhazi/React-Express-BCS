var express = require('express');
var cors = require('cors');
var app = express();
var db = require("./db.js");
var bodyParser = require('body-parser');
// import used libraries 


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

HTTP_PORT = 4000
app.use(cors()); //Used CORS to receive post requests from react client. 
app.listen(HTTP_PORT, ()=> console.log('server running on port '+ HTTP_PORT))
//Created Basic Express server with node.js. 


app.post('/sort', (req, res, next) => { //Receive post request from react client. 
    var errors =[]; 
    if(!req.body.message){ // Check for message body with required fields message and type. 
        errors.push("No message body")
    } else {
        
        var arrData = [];
        var msg = req.body.message; 
        var msgType = req.body.type;
        console.log(msg); 

        db.run('INSERT INTO Message(message_data,message_type) Values(?,?)', msg, msgType , (err)=> {if (err){ console.log("Message not added")}
        console.log('A new Message row has been inserted');}); //Save message to DB
        var arr = msg.split(","); 
        for (let i=1; i<arr.length; i++){ //Used insertion sort to capture screenshots of each step. Type information was used to select between number evaluation and word evaluations. 
            let j = i-1; 
            let temp = arr[i];
            if(msgType == "numbers") {
                while(j >=0 && parseInt(arr[j]) > parseInt(temp)){
                    arr[j+1] = arr[j];
                    j--
                }
                arr[j+1] = temp; 
            } else{
                while(j >=0 && arr[j] > temp){
                    arr[j+1] = arr[j];
                    j--
                }
                arr[j+1] = temp; 
            }

            
            let save = arr.join(); 
            arrData.push(save); 
            db.run('INSERT INTO Step(step_id, step_data, message_data) Values(?,?,?)',i,save, msg, (err)=> {if (err){}});
            console.log('Step '+i+ ' row has been inserted'); //Saved each step to database 
            
        }
        
        var resJson = {"message":"Ok", "Type":"Post", "Steps":arrData};
        res.json(resJson);//created an array of each step and returned it to the client as a part of a JSON object. 
    }
    
    
});







    
